import { Request, Response } from 'express';
import geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';
import PageVisit from '../models/PageVisit';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function countryNameFor(code: string): string {
  if (!code || code === 'XX') return 'Unknown';
  try {
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

function clientIp(req: Request): string {
  const ip = req.ip || req.socket.remoteAddress || '';
  return ip.replace('::ffff:', '');
}

export const trackVisit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { event } = req.body;

    if (event === 'update') {
      const { id, duration, scrollDepth } = req.body;
      if (!id) {
        res.status(400).json({ success: false, message: 'Missing id' });
        return;
      }
      await PageVisit.findByIdAndUpdate(id, {
        $max: { duration: Number(duration) || 0, scrollDepth: Number(scrollDepth) || 0 },
      });
      res.json({ success: true });
      return;
    }

    const { sessionId, path, referrer } = req.body;
    if (!sessionId || !path) {
      res.status(400).json({ success: false, message: 'Missing sessionId or path' });
      return;
    }

    const ip = clientIp(req);
    const geo = geoip.lookup(ip);
    const countryCode = geo?.country || 'XX';

    const uaString = req.headers['user-agent'] || '';
    const ua = UAParser(uaString);
    const rawDeviceType = ua.device.type;
    const device = rawDeviceType === 'mobile' ? 'mobile' : rawDeviceType === 'tablet' ? 'tablet' : 'desktop';

    const visit = await PageVisit.create({
      sessionId,
      path,
      referrer: referrer || '',
      country: countryNameFor(countryCode),
      countryCode,
      city: geo?.city || '',
      device,
      browser: ua.browser.name || 'Unknown',
      os: ua.os.name || 'Unknown',
    });

    res.status(201).json({ success: true, id: visit._id });
  } catch (error) {
    console.error('trackVisit error:', error);
    res.status(500).json({ success: false, message: 'Error tracking visit' });
  }
};

export const getAnalyticsSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const range = String(req.query.range || '7d');
    const days = range === '30d' ? 30 : range === '90d' ? 90 : range === 'all' ? 3650 : 7;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const match = { createdAt: { $gte: since } };

    const [
      totals,
      byCountry,
      byDevice,
      byPage,
      byBrowser,
      byDay,
    ] = await Promise.all([
      PageVisit.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            totalVisits: { $sum: 1 },
            uniqueSessions: { $addToSet: '$sessionId' },
            avgDuration: { $avg: '$duration' },
            avgScrollDepth: { $avg: '$scrollDepth' },
          },
        },
        { $project: { _id: 0, totalVisits: 1, uniqueVisitors: { $size: '$uniqueSessions' }, avgDuration: 1, avgScrollDepth: 1 } },
      ]),
      PageVisit.aggregate([
        { $match: match },
        { $group: { _id: { country: '$country', countryCode: '$countryCode' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { _id: 0, country: '$_id.country', countryCode: '$_id.countryCode', count: 1 } },
      ]),
      PageVisit.aggregate([
        { $match: match },
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $project: { _id: 0, device: '$_id', count: 1 } },
      ]),
      PageVisit.aggregate([
        { $match: match },
        { $group: { _id: '$path', count: { $sum: 1 }, avgDuration: { $avg: '$duration' } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { _id: 0, path: '$_id', count: 1, avgDuration: 1 } },
      ]),
      PageVisit.aggregate([
        { $match: match },
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
        { $project: { _id: 0, browser: '$_id', count: 1 } },
      ]),
      PageVisit.aggregate([
        { $match: match },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: '$_id', count: 1 } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        range,
        totalVisits: totals[0]?.totalVisits || 0,
        uniqueVisitors: totals[0]?.uniqueVisitors || 0,
        avgDuration: Math.round(totals[0]?.avgDuration || 0),
        avgScrollDepth: Math.round(totals[0]?.avgScrollDepth || 0),
        byCountry,
        byDevice,
        byPage,
        byBrowser,
        byDay,
      },
    });
  } catch (error) {
    console.error('getAnalyticsSummary error:', error);
    res.status(500).json({ success: false, message: 'Error fetching analytics' });
  }
};

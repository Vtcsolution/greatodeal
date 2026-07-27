// One-off migration: fix dead /solutions/*, /howwork, /services backlinks and
// two corrupted/duplicated backlink text strings across existing blog posts.
// Run once from backend/ on the server, where the real .env (MONGO_URI) lives:
//   node scripts/fixBacklinks.js
//
// Safe to re-run: edits set exact values by backlink _id, removals are no-ops
// once already removed.

require('dotenv').config();
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.model('Blog', BlogSchema, 'blogs');

// { postId, backlinkId, text?, url? } — text omitted when only the URL changes.
const edits = [
  // Cloud Computing Evolution
  { postId: '6913251e331e5705d2e3280e', backlinkId: '6913251e331e5705d2e3280f', url: 'https://greatodeal.com/' },
  { postId: '6913251e331e5705d2e3280e', backlinkId: '6913251e331e5705d2e32810', url: 'https://greatodeal.com/' },
  { postId: '6913251e331e5705d2e3280e', backlinkId: '6913251e331e5705d2e32811', url: 'https://greatodeal.com/' },
  { postId: '6913251e331e5705d2e3280e', backlinkId: '6913251e331e5705d2e32812', url: 'https://greatodeal.com/' },

  // How Software Works
  { postId: '6913223a331e5705d2e32765', backlinkId: '6913223a331e5705d2e32766', url: 'https://greatodeal.com/' },
  { postId: '6913223a331e5705d2e32765', backlinkId: '6913223a331e5705d2e32767', url: 'https://greatodeal.com/' },
  { postId: '6913223a331e5705d2e32765', backlinkId: '6913223a331e5705d2e32768', url: 'https://greatodeal.com/' },

  // Investment Technology Revolution -> fintech vertical
  { postId: '6913187a331e5705d2e3267d', backlinkId: '6913187a331e5705d2e3267e', url: 'https://greatodeal.com/industries/fintech' },
  { postId: '6913187a331e5705d2e3267d', backlinkId: '6913187a331e5705d2e3267f', url: 'https://greatodeal.com/industries/fintech' },
  { postId: '6913187a331e5705d2e3267d', backlinkId: '6913187a331e5705d2e32680', url: 'https://greatodeal.com/industries/fintech' },
  { postId: '6913187a331e5705d2e3267d', backlinkId: '6913187a331e5705d2e32681', url: 'https://greatodeal.com/industries/fintech' },

  // EdTech Revolution -> generic industries index (no education vertical exists)
  { postId: '69131666331e5705d2e325bd', backlinkId: '69131666331e5705d2e325be', url: 'https://greatodeal.com/industries' },
  { postId: '69131666331e5705d2e325bd', backlinkId: '69131666331e5705d2e325bf', url: 'https://greatodeal.com/industries' },
  { postId: '69131666331e5705d2e325bd', backlinkId: '69131666331e5705d2e325c0', url: 'https://greatodeal.com/industries' },
  { postId: '69131666331e5705d2e325bd', backlinkId: '69131666331e5705d2e325c1', url: 'https://greatodeal.com/industries' },

  // Digital Banking Revolution -> fintech vertical
  { postId: '69131300331e5705d2e325b7', backlinkId: '69131300331e5705d2e325b8', url: 'https://greatodeal.com/industries/fintech' },
  { postId: '69131300331e5705d2e325b7', backlinkId: '69131300331e5705d2e325b9', url: 'https://greatodeal.com/industries/fintech' },
  { postId: '69131300331e5705d2e325b7', backlinkId: '69131300331e5705d2e325ba', url: 'https://greatodeal.com/industries/fintech' },
  { postId: '69131300331e5705d2e325b7', backlinkId: '69131300331e5705d2e325bb', url: 'https://greatodeal.com/industries/fintech' },

  // Enterprise Cloud Strategy — includes corrupted entry #2 (text + url both mangled)
  { postId: '691309ac331e5705d2e32508', backlinkId: '691309ac331e5705d2e32509', url: 'https://greatodeal.com/' },
  { postId: '691309ac331e5705d2e32508', backlinkId: '691309ac331e5705d2e3250a', text: 'Cloud Cost Optimization Strategies', url: 'https://greatodeal.com/' },
  { postId: '691309ac331e5705d2e32508', backlinkId: '691309ac331e5705d2e3250b', url: 'https://greatodeal.com/' },
  { postId: '691309ac331e5705d2e32508', backlinkId: '691309ac331e5705d2e3250c', url: 'https://greatodeal.com/' },

  // Digital Transformation Strategy
  { postId: '69130800331e5705d2e32502', backlinkId: '69130800331e5705d2e32503', url: 'https://greatodeal.com/' },
  { postId: '69130800331e5705d2e32502', backlinkId: '69130800331e5705d2e32504', url: 'https://greatodeal.com/' },
  { postId: '69130800331e5705d2e32502', backlinkId: '69130800331e5705d2e32505', url: 'https://greatodeal.com/' },
  { postId: '69130800331e5705d2e32502', backlinkId: '69130800331e5705d2e32506', url: 'https://greatodeal.com/' },

  // Big Data Analytics
  { postId: '69130452331e5705d2e323d6', backlinkId: '69130452331e5705d2e323d7', url: 'https://greatodeal.com/' },
  { postId: '69130452331e5705d2e323d6', backlinkId: '69130452331e5705d2e323d8', url: 'https://greatodeal.com/' },
  { postId: '69130452331e5705d2e323d6', backlinkId: '69130452331e5705d2e323d9', url: 'https://greatodeal.com/' },
  { postId: '69130452331e5705d2e323d6', backlinkId: '69130452331e5705d2e323da', url: 'https://greatodeal.com/' },

  // Predictive Analytics
  { postId: '6912e97d331e5705d2e321a4', backlinkId: '6912e97d331e5705d2e321a5', url: 'https://greatodeal.com/' },
  { postId: '6912e97d331e5705d2e321a4', backlinkId: '6912e97d331e5705d2e321a6', url: 'https://greatodeal.com/' },
  { postId: '6912e97d331e5705d2e321a4', backlinkId: '6912e97d331e5705d2e321a7', url: 'https://greatodeal.com/' },

  // Enterprise Blockchain Solutions (industries link left as-is, not listed here)
  { postId: '6912e63c331e5705d2e320d4', backlinkId: '6912e63c331e5705d2e320d5', url: 'https://greatodeal.com/' },
  { postId: '6912e63c331e5705d2e320d4', backlinkId: '6912e63c331e5705d2e320d6', url: 'https://greatodeal.com/' },
  { postId: '6912e63c331e5705d2e320d4', backlinkId: '6912e63c331e5705d2e320d8', url: 'https://greatodeal.com/about' },
  { postId: '6912e63c331e5705d2e320d4', backlinkId: '6912e63c331e5705d2e320d9', url: 'https://greatodeal.com/' },

  // Revolutionizing User Experience — corrupted entry #1 (industries link left as-is)
  { postId: '6912d877331e5705d2e31e51', backlinkId: '6912d877331e5705d2e31e52', text: 'The Business Impact of AI-Powered Mobile Applications', url: 'https://greatodeal.com/' },
  { postId: '6912d877331e5705d2e31e51', backlinkId: '6912d877331e5705d2e31e53', url: 'https://greatodeal.com/' },
  { postId: '6912d877331e5705d2e31e51', backlinkId: '6912d877331e5705d2e31e54', url: 'https://greatodeal.com/' },
  { postId: '6912d877331e5705d2e31e51', backlinkId: '6912d877331e5705d2e31e56', url: 'https://greatodeal.com/' },

  // The Future of Business
  { postId: '6912cc74b1c1d4d56e68d5c1', backlinkId: '6912cc74b1c1d4d56e68d5c2', url: 'https://greatodeal.com/' },
  { postId: '6912cc74b1c1d4d56e68d5c1', backlinkId: '6912cc74b1c1d4d56e68d5c3', url: 'https://greatodeal.com/' },
  { postId: '6912cc74b1c1d4d56e68d5c1', backlinkId: '6912cc74b1c1d4d56e68d5c4', url: 'https://greatodeal.com/' },

  // Understanding AI and Automation
  { postId: '690d7921b1c1d4d56e68d4ab', backlinkId: '690d7921b1c1d4d56e68d4ac', url: 'https://greatodeal.com/' },
  { postId: '690d7921b1c1d4d56e68d4ab', backlinkId: '690d7921b1c1d4d56e68d4ad', url: 'https://greatodeal.com/' },
  { postId: '690d7921b1c1d4d56e68d4ab', backlinkId: '690d7921b1c1d4d56e68d4ae', url: 'https://greatodeal.com/' },
];

// UI/UX Design post: no current equivalent for any of these, remove entirely.
const removals = [
  { postId: '691323f5331e5705d2e32802', backlinkId: '691323f5331e5705d2e32803' },
  { postId: '691323f5331e5705d2e32802', backlinkId: '691323f5331e5705d2e32804' },
  { postId: '691323f5331e5705d2e32802', backlinkId: '691323f5331e5705d2e32805' },
  { postId: '691323f5331e5705d2e32802', backlinkId: '691323f5331e5705d2e32806' },
  { postId: '691323f5331e5705d2e32802', backlinkId: '691323f5331e5705d2e32807' },
];

async function run() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined in environment variables');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  let editCount = 0;
  for (const e of edits) {
    const setFields = { 'backlinks.$.url': e.url };
    if (e.text) setFields['backlinks.$.text'] = e.text;
    const res = await Blog.updateOne(
      { _id: e.postId, 'backlinks._id': e.backlinkId },
      { $set: setFields }
    );
    if (res.matchedCount === 0) console.warn('No match for', e.postId, e.backlinkId);
    else editCount++;
  }
  console.log(`Applied ${editCount}/${edits.length} edits`);

  let removeCount = 0;
  for (const r of removals) {
    const res = await Blog.updateOne(
      { _id: r.postId },
      { $pull: { backlinks: { _id: r.backlinkId } } }
    );
    if (res.modifiedCount > 0) removeCount++;
  }
  console.log(`Applied ${removeCount}/${removals.length} removals`);

  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => { console.error(err); process.exit(1); });

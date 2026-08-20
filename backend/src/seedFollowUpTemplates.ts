import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FollowUpTemplate from './models/FollowUpTemplate';

dotenv.config();

const templates = [
  // Cold leads — slower, low-pressure nurture sequence
  {
    leadStatus: 'cold',
    stage: 0,
    delayHours: 72, // 3 days after initial contact
    subject: 'Following up on your {{services}} inquiry',
    body:
      "Hi {{fullName}},\n\nJust checking in on your recent inquiry about {{services}}. Happy to answer any questions whenever you're ready.\n\nBest,\nGreatodeal Team",
  },
  {
    leadStatus: 'cold',
    stage: 1,
    delayHours: 96, // +4 days (7 total)
    subject: "Still interested in {{services}}?",
    body:
      "Hi {{fullName}},\n\nWanted to reconnect about {{services}}. If timing isn't right now, let us know and we'll follow up later.\n\nBest,\nGreatodeal Team",
  },
  {
    leadStatus: 'cold',
    stage: 2,
    delayHours: 168, // +7 days (14 total)
    subject: 'One last note about {{services}}',
    body:
      "Hi {{fullName}},\n\nThis will be our last check-in for now. If you'd like to explore {{services}} in the future, we're just an email away.\n\nBest,\nGreatodeal Team",
  },

  // Warm leads — moderate cadence
  {
    leadStatus: 'warm',
    stage: 0,
    delayHours: 24,
    subject: 'Quick follow-up on {{services}}',
    body:
      "Hi {{fullName}},\n\nThanks again for reaching out about {{services}}. Do you have 15 minutes this week for a quick call?\n\nBest,\nGreatodeal Team",
  },
  {
    leadStatus: 'warm',
    stage: 1,
    delayHours: 48,
    subject: 'Any questions about {{services}}?',
    body:
      "Hi {{fullName}},\n\nCircling back on {{services}} — happy to share more details or a proposal whenever convenient.\n\nBest,\nGreatodeal Team",
  },
  {
    leadStatus: 'warm',
    stage: 2,
    delayHours: 72,
    subject: "Let's finalize next steps for {{services}}",
    body:
      "Hi {{fullName}},\n\nWould love to move forward on {{services}}. Let me know a good time to connect.\n\nBest,\nGreatodeal Team",
  },

  // Urgent leads — fast, high-priority cadence
  {
    leadStatus: 'urgent',
    stage: 0,
    delayHours: 2,
    subject: 'Re: your urgent {{services}} request',
    body:
      "Hi {{fullName}},\n\nWe saw your request about {{services}} and want to help right away. Can we get on a quick call today?\n\nBest,\nGreatodeal Team",
  },
  {
    leadStatus: 'urgent',
    stage: 1,
    delayHours: 6,
    subject: 'Following up urgently on {{services}}',
    body:
      "Hi {{fullName}},\n\nFollowing up again given the urgency of {{services}}. Please let us know the best time to reach you.\n\nBest,\nGreatodeal Team",
  },
  {
    leadStatus: 'urgent',
    stage: 2,
    delayHours: 24,
    subject: 'Are you still available to discuss {{services}}?',
    body:
      "Hi {{fullName}},\n\nWe don't want to miss connecting on {{services}}. Reply anytime and we'll prioritize a response.\n\nBest,\nGreatodeal Team",
  },
];

async function seed() {
  const uri = process.env.MONGO_URI as string;
  if (!uri) { console.error('MONGO_URI not set'); process.exit(1); }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  for (const t of templates) {
    await FollowUpTemplate.findOneAndUpdate(
      { leadStatus: t.leadStatus, stage: t.stage },
      { ...t, active: true },
      { upsert: true, new: true }
    );
    console.log(`Upserted template: ${t.leadStatus} stage ${t.stage}`);
  }

  console.log('Follow-up templates seeded successfully!');
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });

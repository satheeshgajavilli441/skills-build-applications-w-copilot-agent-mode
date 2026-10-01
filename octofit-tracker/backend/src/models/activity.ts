import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    activityType: String,
    duration: Number,
    distance: Number,
    calories: Number,
    date: Date,
  },
  { collection: 'activities', strict: false },
);

export default model('Activity', activitySchema);
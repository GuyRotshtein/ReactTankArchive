import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 },
    image: { type: String, trim: true }
  },
  { _id: false }
);

const TankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    country: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1900, max: 2100 },
    weight: { type: String, required: true, trim: true },
    crew: { type: Number, required: true, min: 1, max: 15 },
    description: { type: String, required: true, trim: true, minlength: 10 },
    image: { type: String, trim: true },
    locations: { type: [LocationSchema], default: [] }
  },
  { timestamps: true }
);

export const Tank = mongoose.model('Tank', TankSchema);

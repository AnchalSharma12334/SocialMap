import mongoose, { Schema, Document } from 'mongoose';

export enum StudioType {
  DANCE = 'DANCE',
  MUSIC = 'MUSIC',
  ART = 'ART',
  // add more types as needed
}

interface Location {
  latitude: number;
  longitude: number;
}

export interface IStudio extends Document {
  name: string;
  type: StudioType;
  description: string;
  address: string;
  location: Location;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  images: string[];
  available: boolean;
  headCount: number;
}

const LocationSchema = new Schema<Location>(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

const StudioSchema: Schema = new Schema<IStudio>({
  name: { type: String, required: true },
  type: { type: String, enum: Object.values(StudioType), required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: false },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true },
  available: { type: Boolean, required: true },
  headCount: { type: Number, required: true }
});

export default mongoose.model<IStudio>('Studio', StudioSchema);

import { Schema, model } from 'mongoose';

const officeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  geo: {
    type: String,
    default: 'Point',
    coordinates: [Number], // [longitude, latitude]
    index: '2dsphere' // Create a geospatial index
  },  
  phone:String,
  hours:String
});

const Office = model('Office', officeSchema, 'Office');

export default Office;


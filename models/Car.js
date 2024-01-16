import { Schema, model as _model } from 'mongoose';

const carSchema = new Schema({
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  specs: {
    transmission: {
      type: String,
      required: true,
      enum: ['Automatic', 'Manual']
    },
    fuel_type: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric']
    },
    mileage_limit: {
      type: Number
    }
  },
  rental_details: {
    daily_rate: {
      type: Number,
      required: true
    },
    deposit: {
      type: Number,
      required: true
    }
  },
  image: {
    type: String,
    trim: true
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: 'Office'
  }

});

const Car = _model('Car', carSchema);

export default Car;

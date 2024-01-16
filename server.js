import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import carRoutes from './routes/carRoutes.js';
import officeRoutes from './routes/officeRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Connected to SeloCar Database'))
  .catch(err => console.error('Could not connect to database', err));

app.use('/api/cars', carRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import Office from '../models/Office.js';
import Car from '../models/Car.js';


export const getAllOffices = async (req, res) => {
  try {
    const offices = await Office.find();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) {
      return res.status(404).json({ message: 'Office not found' });
    }
    res.json(office);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOfficesNearLocation = async (req, res) => {
  // Assuming req.query.latitude and req.query.longitude are provided
  const { latitude, longitude } = req.query;
  try { 
    // Find offices near the provided location
    const officesNearLocation = await Office.find({
      // Implement the logic to find nearby offices, this is just a placeholder
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: 30000 // 30 km
        }
      }
    });
    res.json(officesNearLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCarsByOffice = async (req, res) => {
  try {
      const { officeId } = req.params;
      const cars = await Car.find({ office: officeId }).exec();
      res.json(cars);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


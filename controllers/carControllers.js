import Car from '../models/Car.js';

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            res.status(404).send('Car not found');
        } else {
            res.json(car);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

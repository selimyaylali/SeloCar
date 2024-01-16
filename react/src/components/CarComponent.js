import React from 'react';
import "../components/styles/CarComponent.scss";
import "../assets/cars/audi_a6.png"
import "../assets/cars/bmw_m4.png"
import "../assets/cars/fiat_egea.png"
import "../assets/cars/fordfocus.png"
import "../assets/cars/hyundai_i20.png"
import "../assets/cars/lamborghini_aventador.png"
import "../assets/cars/mercedes_gwagon.png"
import "../assets/cars/porsche_911.png"
import "../assets/cars/skoda_superb.png"
import "../assets/cars/tesla_model_s.png"
import "../assets/cars/volkswagen_polo.png"
import "../assets/cars/volvoxc90.png"

const CarComponent = ({ car }) => {

  const images = require.context('../assets/cars', true);
  
  const {
    make,
    model,
    year,
    specs: { transmission, fuel_type, mileage_limit },
    rental_details: { daily_rate, deposit },
  } = car;

  const imagePath = images(`./${car.image}`).default;


  return (
    <div className="car-card">
      <div className="car-header">
        <h2>{`${make} ${model} (${year})`}</h2>
        <p className="car-category">{`${transmission}, ${fuel_type}`}</p>
      </div>
      <img src={imagePath} alt={`${make} ${model}`} className="car-image" />
      <div className="car-details">
        <p>{`Deposit: ${deposit}`}</p>
        <p>{`Mileage limit: ${mileage_limit ? mileage_limit + ' km' : 'Unlimited'}`}</p>
        <p>{`Fuel Type: ${fuel_type}`}</p>
      </div>
      <div className="car-pricing">
        <p className="price">{`Daily Rate: ${daily_rate}`}</p>
      </div>
      <button className="btn-select-car">Select My Car</button>
    </div>
  );
};

export default CarComponent;

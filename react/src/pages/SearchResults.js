import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CarComponent from "../components/CarComponent"; // Import your Car component

const SearchResults = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const { officeId } = useParams();
  // Use location to access the state passed from the React Router
  const location = useLocation();
  const selectedOffice = location.state?.selectedOffice;

  useEffect(() => {
    // Function to fetch cars from the server
    const fetchCars = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          `http://localhost:3001/api/offices/${selectedOffice}/cars`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to fetch cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedOffice) {
      fetchCars();
    } else {
      setError("No office selected.");
      setLoading(false);
    }
  }, [selectedOffice]);

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="search-results-container">
      {cars.length > 0 ? (
        <div className="cars-list">
          {cars.map((car) => (
            <CarComponent key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div>No cars available for the selected office.</div>
      )}
    </div>
  );
};

export default SearchResults;

import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "../components/styles/OfficeMap.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2VsaW15YXlsYWxpIiwiYSI6ImNscjZ1NHkycTIwNDcya215ZW9xaXhxdXUifQ.KKvoNqIPywXkYDNFZRqXxw";

const OfficeMap = () => {
  const [office, setOffice] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/offices")
      .then((response) => {
        if (response.data.length > 0) {
          setOffice(response.data[0]); // Set only the first office
        } else {
          console.error("No offices found");
        }
      })
      .catch((error) => {
        console.error("Error fetching offices:", error);
      });
  }, []);

  useEffect(() => {
    if (!mapLoaded) {
      // Hardcoded coordinates
      const hardcodedCoordinates = [27.142826, 38.423734]; // Make sure the order is [lng, lat]

      // Initialize the map with hardcoded coordinates
      const initializedMap = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: hardcodedCoordinates, // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      // Add a marker to the map at the hardcoded coordinates
      new mapboxgl.Marker()
        .setLngLat(hardcodedCoordinates)
        .addTo(initializedMap);

      // After map is loaded, change mapLoaded to true
      initializedMap.on("load", () => {
        setMapLoaded(true);
      });
    }
  }, [mapLoaded]); // Depend on mapLoaded to ensure this effect only runs once
  return (
    <div className="office-map-container">
      <div className="office-details">
        <h1>Office Locations</h1>
        {office && (
          <div key={office._id}>
            <h2>{office.name}</h2>
            <p>
              {office.address.street}, {office.address.city},{" "}
              {office.address.state}, {office.address.zip}
            </p>
            <p>{office.phone}</p>
            <p>{office.hours}</p>
          </div>
        )}
      </div>
      <div id="map" style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
};

export default OfficeMap;

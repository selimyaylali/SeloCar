import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/SearchBar.scss";
import { ReactComponent as LocationIcon } from "../assets/location.svg";

const formatDate = (date) => {
  let d = new Date(date);
  let day = ("0" + d.getDate()).slice(-2);
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  let year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
const toISOFormat = (ddmmyyyy) => {
  const [day, month, year] = ddmmyyyy.split("/");
  return `${year}-${month}-${day}`;
};

const SearchBar = () => {
  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState("");
  const [pickupOffice, setPickupOffice] = useState("");
  const [returnOffice, setReturnOffice] = useState("");
  const [pickupDate, setPickupDate] = useState(() =>
    formatDate(new Date(new Date().setDate(new Date().getDate() + 1)))
  );

  const [returnDate, setReturnDate] = useState(() =>
    formatDate(new Date(new Date().setDate(new Date().getDate() + 4)))
  );

  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/offices")
      .then((response) => {
        setOffices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offices:", error);
      });
  }, []);

  const handleSelectCar = (e) => {
    e.preventDefault(); 
    if (pickupOffice) { 
      navigate(`/search-results/${pickupOffice}`); 
    } else {
      console.error('No pickup office ID defined');
    }
  };
  const handleLocation = () => {
    // Functionality to get user's location
    console.log("Location button clicked");
  };

  const handleDateFocus = (e) => {
    e.target.type = "date";
    e.target.value = toISOFormat(e.target.value);
  };
  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  const handleDateBlur = (e, setDate, defaultValue) => {
    if (e.target.value) {
      const formattedDate = formatDate(e.target.value);
      setDate(formattedDate);
    } else {
      setDate(defaultValue);
    }
    e.target.type = "text";
  };

  const generateTimes = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };

  const times = generateTimes();

  return (
    <form onSubmit={handleSelectCar} className="search-form">
      <div className="form-area">
        <div className="search-header">
          FIND YOUR BEST CAR RENTAL WITH SELOCAR
        </div>
        <div className="form-row-pickup">
          <div className="form-group">
            <select
              id="pickupOffice"
              className="form-control"
              value={pickupOffice}
              onChange={(e) => setPickupOffice(e.target.value)}
            >
              <option value="" disabled className="default-value">
                Select your pick-up office
              </option>
              {offices.map((office) => (
                <option key={office._id} value={office._id}>
                  {" "}
                  {office.name}
                </option>
              ))}
            </select>
          </div>
          <LocationIcon onClick={handleLocation} className="location-icon" />
          <div className="form-group">
            <input
              id="pickupDate"
              type="text"
              className="form-control"
              value={pickupDate}
              required
              onFocus={handleDateFocus}
              onBlur={(e) =>
                handleDateBlur(
                  e,
                  setPickupDate,
                  formatDate(
                    new Date(new Date().setDate(new Date().getDate() + 1))
                      .toISOString()
                      .substring(0, 10)
                  )
                )
              }
              onChange={(e) => handleDateChange(e, setPickupDate)}
            />
          </div>
          <div className="form-group">
            <select 
              id="pickupTime"
              className="form-control"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            >
              <option value="" disabled className="default-value">
                Select the pick-up time
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row-return">
          <div className="form-group">
            <select
              id="returnOffice"
              className="form-control"
              value={returnOffice}
              onChange={(e) => setReturnOffice(e.target.value)}
              required
            >
              <option value="" disabled className="default-value">
                Select your return office
              </option>
              {offices.map((office) => (
                <option key={office.id} value={office.id}>
                  {office.name}
                </option>
              ))}
            </select>
          </div>
          <LocationIcon
            className="location-icon"
            onClick={handleLocation}
          ></LocationIcon>
          <div className="form-group">
            <input
              id="returnDate"
              type="text"
              className="form-control"
              value={returnDate}
              required
              onFocus={handleDateFocus}
              onBlur={(e) =>
                handleDateBlur(
                  e,
                  setReturnDate,
                  formatDate(
                    new Date(new Date().setDate(new Date().getDate() + 4))
                      .toISOString()
                      .substring(0, 10)
                  )
                )
              }
              onChange={(e) => handleDateChange(e, setReturnDate)}
            />
          </div>
          <div className="form-group">
            <select
              id="returnTime"
              className="form-control"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              required
            >
              <option value="" disabled className="default-value">
                Select the return time
              </option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="search-button">
          SELECT MY CAR
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

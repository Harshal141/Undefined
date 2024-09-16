import React from 'react'
import { useState, useEffect } from 'react';
import { ThemeSel } from '../componenets/ThemeSel';
import Papa from 'papaparse';
import axios from 'axios';
import getAccessToken from '../services/Auth';
import configCreater from '../services/Helper';
import { Navbar } from '../componenets/Navbar';

export const Builder = () => {
  const [theme, setTheme] = useState(0);
  const [firstCity, setFirstCity] = useState('pune');
  const [secondCity, setSecondCity] = useState('mumbai');
  const [firstAirportCode, setFirstAirportCode] = useState('');
  const [secondAirportCode, setSecondAirportCode] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [exploreToggle, setExploreToggle] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [crowd, setCrowd] = useState(1);
  const [csvData, setCsvData] = useState([]);

  const findAirportCode = (term) => {
    return csvData.find((entry) =>
      Object.values(entry).some((field) => 
        field && field.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const fetchFlightOffers = async (firstAirportCode, secondAirportCode, startDate) => {
    const key = await getAccessToken();
    
    const getFlightsConfig = configCreater(`v2/shopping/flight-offers?originLocationCode=${firstAirportCode}&destinationLocationCode=${secondAirportCode}&departureDate=${startDate}&adults=${crowd}&nonStop=false&max=5`, key);
    const getHotelsConfig = configCreater(`v1/reference-data/locations/hotels/by-city?cityCode=${secondAirportCode}&radius=20&radiusUnit=KM&hotelSource=ALL`,key);

    try {
      const flights = await axios.request(getFlightsConfig);
      const hotels = await axios.request(getHotelsConfig);

      const topFive = hotels.data.data.slice(0, 5).map(hotel => hotel.hotelId).join(',');

      const getPriceConfig = configCreater(`v3/shopping/hotel-offers?hotelIds=${topFive}&adults=${crowd}&checkInDate=${startDate}&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`,key);

      const hotelPrice = await axios.request(getPriceConfig);

      console.log(hotelPrice.data);
      console.log(topFive)
    } catch (error) {
      console.error(error);
    }
  };

  const findAirportCodes = () => {
    const firstAirport = findAirportCode(firstCity);
    const secondAirport = findAirportCode(secondCity);

    if (!firstAirport) {
      alert("Please add a start location with airport nearby, so that we can plan the budget accordingly");
      return;
    }
    if (!secondAirport) {
      alert("Please add a destination location with airport nearby, so that we can plan the budget accordingly");
      return;
    }

    setFirstAirportCode(firstAirport.code);
    setSecondAirportCode(secondAirport.code);

    fetchFlightOffers(firstAirport.code, secondAirport.code, startDate);
  };

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/airports.csv');
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          setCsvData(result.data);
        },
        error: (error) => {
          console.error('Error parsing CSV: ', error);
        },
      });
    };

    fetchCSV();
  }, []);

  return (
    <div className="w-full">
    <Navbar/>
      <ThemeSel />
      <br />
      <div className="w-full p-4 flex flex-col items-center">
        <p className="text-[#5E6282] text-base">DESTINATION</p>

        <h1 className="text-4xl text-indigo-950">
          Just a few more details before we plan
        </h1>
      </div>
      <br />
      <form className="flex flex-wrap mb-10 max-w-[1200px] m-auto">
        <div className="max-w-md mx-auto my-2">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="start_location"
              id="start_location"
              className="block min-w-[300px] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={firstCity}
              onChange={(e) => setFirstCity(e.target.value)}
            />
            <label
              htmlFor="start_location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Location (City)
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="budget"
              id="budget"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <label
              htmlFor="budget"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Budget
            </label>
          </div>

          <div className="relative z-0 w-full mt-8 mb-5 group">
            <input
              id="default-datepicker"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Select date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        <div className="max-w-md mx-auto my-2">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="end_location"
              id="end_location"
              className="block min-w-[300px] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={secondCity}
              onChange={(e) => setSecondCity(e.target.value)}
            />
            <label
              htmlFor="end_location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Destination (City)
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="duration"
                id="duration"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <label
                htmlFor="duration"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Duration (Days)
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="crowd"
                id="crowd"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={crowd}
                required
                onChange={(e) => setCrowd(e.target.value)}
              />
              <label
                htmlFor="crowd"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                No of people
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="inline-flex items-center cursor-pointer w-full">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={exploreToggle}
                onChange={(e) => setExploreToggle(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Explore Location
              </span>
            </label>
          </div>
        </div>
      </form>

      <div className="max-w-md mx-auto my-2 flex justify-center">
        <button
          onClick={findAirportCodes}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Find Airport Codes
        </button>
      </div>
    </div>
  );
};

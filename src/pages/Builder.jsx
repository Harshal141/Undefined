import React from 'react'
import axios from 'axios';
import Papa from 'papaparse';
import Markdown from 'react-markdown';
import { useState, useEffect } from 'react';
import ThemeSel from '../componenets/ThemeSel';
import { Navbar } from '../componenets/Navbar';
import getAccessToken from '../services/Auth';
import configCreater from '../services/Helper';
import generateContent from '../services/Gemini';
import { Heading } from '../componenets/Heading';
import { Loader } from '../componenets/Loader';

export const Builder = () => {
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);

  const handleSelectionChange = (titles) => {
    setSelectedTitles(titles);
  };

  const [firstCity, setFirstCity] = useState('');
  const [secondCity, setSecondCity] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('1');
  const [exploreToggle, setExploreToggle] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [crowd, setCrowd] = useState(1);
  const [content, setContent] = useState('');
  const [loadIternary, setLoadIternary] = useState(false);

  const findAirportCode = (term) => {
    return csvData.find((entry) =>
      Object.values(entry).some((field) => 
        field && field.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const fetchFlightOffers = async (firstAirport, secondAirport, startDate) => {
    const key = await getAccessToken();
    const getFlightsConfig = configCreater(`v2/shopping/flight-offers?originLocationCode=${firstAirport.code}&destinationLocationCode=${secondAirport.code}&departureDate=${startDate}&adults=${crowd}&nonStop=false&max=5`, key);
    const getHotelsConfig = configCreater(`v1/reference-data/locations/hotels/by-city?cityCode=${secondAirport.code}&radius=20&radiusUnit=KM&hotelSource=ALL`,key);

    try {

      setLoadIternary("Fetching flight details");
      const flights = await axios.request(getFlightsConfig); // Get flight details

      setLoadIternary("Checking available hotels");
      const hotels = await axios.request(getHotelsConfig); // List of available hotels at destination

      const topFive = hotels.data.data.slice(0, 5).map(hotel => hotel.hotelId).join(',');

      const getPriceConfig = configCreater(`v3/shopping/hotel-offers?hotelIds=${topFive}&adults=${crowd}&checkInDate=${startDate}&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`,key);
      const getActivityConfig = configCreater(`v1/shopping/activities?latitude=${secondAirport.latitude}&longitude=${secondAirport.longitude}&radius=20&categories=SIGHTS,NIGHTLIFE,RESTAURANT,SHOPPING`,key);

      setLoadIternary("Comparing prices");
      const hotelPrice = await axios.request(getPriceConfig); // Get final price for the hotels
      
      setLoadIternary("Searching attractions and activities");
      const activity = await axios.request(getActivityConfig); // Things to explore at destination

      setLoadIternary("Generating AI planned Iternary");
      const prompt = `Generate a personalized travel itinerary for a trip to ${JSON.stringify(secondCity)} with a budget of ${budget} Rs. The traveler is interested in ${JSON.stringify(selectedTitles)}. They have the flight details ${JSON.stringify(flights.data.data)} and the accomadations is available at ${JSON.stringify(hotelPrice.data)}. Please provide a detailed itinerary with daily recommendations for ${duration} days, including these activities ${JSON.stringify(activity.data.data)} . The itinerary should be written in English. Give me the ouput in md format. Also give me the details of flights i should chose and the hotel we got the best deals from the gives list of flights and hotels.`;
      const content = await generateContent(prompt);

      // set content for visual
      setContent(content.data.candidates[0].content.parts[0].text)
      setLoadIternary(false);
      setStep(3);

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

    fetchFlightOffers(firstAirport, secondAirport, startDate);
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

  const renderStep = () =>{
    switch (step) {
      case 1:
        return (
          <div>
            <ThemeSel onSelectionChange={handleSelectionChange} />
            <br />
            <div className="max-w-md mx-auto my-2 flex justify-center">
              <button
                onClick={() => setStep(2)}
                className="px-7 py-4 text-xl text-center text-white bg-amber-500 rounded-xl shadow-2xl max-md:px-5"
              >
                Next
              </button>
            </div>
            <br />
          </div>
        );
      case 2:
        return (
          <form>
            <Heading header="DESTINATION" slogan="Just a few more details before we plan" />
            <br />
            <div className="flex flex-wrap mb-10 max-w-[1200px] m-auto">
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
            </div>
            <div className="max-w-md mx-auto my-2 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-7 py-4 text-xl text-center text-white bg-amber-500 rounded-xl shadow-2xl max-md:px-5"
              >
                Back
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  findAirportCodes();
                }}
                className="px-7 py-4 text-xl text-center text-white bg-amber-500 rounded-xl shadow-2xl max-md:px-5"
              >
                Submit
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          <div className="w-full p-4 m-5">
            <Heading header="ITERNARY" slogan="A Theme Planned Based On Your Liking" />
            <br />
            <br />
            <Markdown>{content}</Markdown>
          </div>
        );
    }
  }

  return (
    <div className="w-full max-w-[1280px] m-auto">
      <Navbar />
      {/* // Loading screen */}
      {loadIternary && (
        <div className="w-full h-full fixed top-0 left-0 bg-amber-500 flex justify-center align-middle z-50 ">
          <li className="flex items-center text-white text-xl font-semibold tracking-wide ">
            <Loader/>
            {loadIternary}
          </li>
        </div>
      )}
      {renderStep()}
    </div>
  );
};

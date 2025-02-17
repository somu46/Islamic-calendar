import React, { useEffect, useState, useMemo } from "react";
import Modal from "../Modal/Modal";
import { IoMdLocate } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { getCountry, getCountryCity } from "../../apiServices/apiServices";
import { useNavigate } from "react-router-dom";

const SetLocation = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [continents] = useState([
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Antarctica",
    "Europe",
    "Oceania",
  ]);
  const [selectContinents, setSelectContinents] = useState("");
  const [query, setQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Filtered data for countries and cities
  const filteredCountries = useMemo(
    () =>
      query
        ? countryData.filter((c) =>
            c.name.common.toLowerCase().includes(query.toLowerCase())
          )
        : countryData,
    [query, countryData]
  );

  const filteredCities = useMemo(
    () =>
      cityQuery
        ? cityData.filter((c) => c.toLowerCase().includes(cityQuery.toLowerCase()))
        : cityData,
    [cityQuery, cityData]
  );

  // Fetch countries by continent
  useEffect(() => {
    const fetchCountries = async () => {
      if (!selectContinents) return;

      try {
        const response = await getCountry(selectContinents);
        setCountryData(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching countries:", err.message,error);
        setError("Failed to load countries. Please try again.");
      }
    };
    fetchCountries();
  }, [selectContinents,error]);

  // Fetch cities by country
  useEffect(() => {
    const fetchCities = async () => {
      if (!country) return;

      setLoading(true);
      try {
        const response = await getCountryCity(country);
        setCityData(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching cities:", err.message);
        setError("Failed to load cities. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, [country]);

 
  
  // Load selected location from sessionStorage
  useEffect(() => {
    const storedLocation = sessionStorage.getItem("locationByPlace");
    // console.log("storedLocation", storedLocation);
    if (storedLocation) setSelectedLocation(storedLocation);
  }, []);

  // Set location and store in sessionStorage
  const handleClickSetSession = () => {
    if (country && city) {
      const location = `${country}, ${city}`;
      sessionStorage.setItem("country", country);
      sessionStorage.setItem("city", city);
      sessionStorage.setItem("locationByPlace", location);
      setSelectedLocation(location);
      setModalOpen(false);
      navigate("/");
      window.location.reload(); 
    }
  };

  // Reset location
  const handleReset = () => {
    sessionStorage.removeItem("country");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("locationByPlace");
    setCountry("");
    setCity("");
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Location Input */}
      <div
        className="relative w-full text-teal-500"
        onClick={() => setModalOpen(true)}
      >
        <input
          type="text"
          placeholder="Set your location"
          value={selectedLocation || query || ""}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-10 font-bold text-teal-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        />
        <IoMdLocate className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-teal-600" />
      </div>

      {/* Modal for Location Selection */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {!selectedLocation ? (
          <div className="text-black text-xl font-semibold">
            {/* Select Continent */}
            <div>
              <select
                value={selectContinents || ""}
                onChange={(e) => setSelectContinents(e.target.value)}
                className="text-lg text-gray-700 border-2 border-teal-700 shadow-md rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="" disabled>
                  Please select a continent
                </option>
                {continents.map((continent, index) => (
                  <option key={index} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
            </div>

            {/* Country Search */}
            {selectContinents && !country && (
              <div>
                <div className="relative w-full mt-4">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for countries..."
                    className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="mt-2 max-h-64 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <div
                        key={index}
                        className="py-2 border-b border-gray-300 cursor-pointer"
                        onClick={() => {
                          setCountry(country.name.common);
                          setQuery("");
                        }}
                      >
                        <div className="flex items-center p-1">
                          <img
                            src={country.flags.svg}
                            className="w-5 h-5 mr-3"
                            alt={country.flags.alt || "Flag"}
                          />
                          <p className="text-lg font-medium">
                            {country.name.common}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No matching countries found.</p>
                  )}
                </div>
              </div>
            )}

            {/* City Search */}
            {country && (
              <div>
                {loading ? (
                  <p className="text-center text-blue-600">Loading cities...</p>
                ) : (
                  <>
                    <div className="relative w-full mt-4">
                      <input
                        type="text"
                        value={cityQuery}
                        onChange={(e) => setCityQuery(e.target.value)}
                        placeholder="Search for cities..."
                        className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="mt-2 max-h-64 overflow-y-auto">
                      {filteredCities.length > 0 ? (
                        filteredCities.map((city, index) => (
                          <div
                            key={index}
                            className="py-2 border-b border-gray-300 cursor-pointer"
                            onClick={() => {
                              setCity(city);
                              setCityQuery("");
                            }}
                          >
                            <p className="text-lg font-medium">{city}</p>
                          </div>
                        ))
                      ) : (
                        <p>No matching cities found.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Set Location Button */}
            {country && city && (
              <div className="mt-4 mx-auto">
                <button
                  onClick={handleClickSetSession}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                  Set Location
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-lg font-bold text-teal-700">
              Your current location:
            </p>
            <p className="text-lg text-green-600 font-semibold">
              {selectedLocation}
            </p>
            <p
              className="text-lg text-blue-700 font-semibold mt-3 cursor-pointer"
              onClick={handleReset}
            >
              Reset Location
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SetLocation;

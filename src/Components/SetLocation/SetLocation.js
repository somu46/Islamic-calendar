import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { IoMdLocate } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { getCountry, getCountryCity } from "../../apiServices/apiServices";
import { useNavigate } from "react-router-dom";

const SetLocation = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [selectContinents, setSelectContinents] = useState("");
  const [query, setQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [country, setCountry] = useState("");
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const continents = ["Asia", "Africa", "North America", "South America", "Antarctica", "Europe", "Oceania"];

  const filteredCountries = query
    ? countryData.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : countryData;

  const filteredCities = cityQuery
    ? cityData.filter((city) =>
        city.toLowerCase().includes(cityQuery.toLowerCase())
      )
    : cityData;

  useEffect(() => {
    if (selectContinents) {
      const fetchCountry = async () => {
        try {
          const response = await getCountry(selectContinents);
          setCountryData(response.data);
        } catch (error) {
          console.error("Error fetching countries:", error.message);
        }
      };
      fetchCountry();
    }
  }, [selectContinents]);

  useEffect(() => {
    if (country) {
      const fetchCountryCities = async () => {
        setLoading(true);
        try {
          const response = await getCountryCity(country);
          setCityData(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchCountryCities();
    }
  }, [country]);

  const handleClickSetSession = () => {
    if (country && city) {
      const location = `${country}, ${city}`;
      sessionStorage.setItem("country", country);
      sessionStorage.setItem("city", city);
      sessionStorage.setItem("location", location);
      setSelectedLocation(location);
      setModalOpen(false);
      navigate("/");
    }
  };
  
  useEffect(() => {
    if (sessionStorage.getItem("location")) {
      setSelectedLocation(sessionStorage.getItem("location"));
    }
    
  }, [selectedLocation]);



  const handleCountryClick = (countryName) => {
    setCountry(countryName);
    setCity("");
    setQuery("");
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    setCityQuery("");
  };

  const handleReset = () => {
    sessionStorage.removeItem("country");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("location");
    setCountry("");
    setCity("");
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative w-full" onClick={() => setModalOpen(true)}>
        <input
          type="text"
          placeholder="Set your location"
          value={selectedLocation || ""}
          readOnly
          className="w-full p-3 pl-10 font-bold text-teal-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        />
        <IoMdLocate className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-teal-600" />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {!selectedLocation ? (
          <div className="text-black text-xl font-semibold">
            <div>
              <select
                value={selectContinents||" Select Continent"}
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

            {selectContinents && (
              <div>
                {!country && (
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
                            onClick={() => handleCountryClick(country.name.common)}
                          >
                            <div className="flex items-center p-1">
                              <img
                                src={country.flags.svg}
                                className="w-5 h-5 mr-3"
                                alt={country.flags.alt}
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
                                onClick={() => handleCityClick(city)}
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
            )}
          </div>
        ) : (
          <div>
            <p className="text-lg font-bold text-teal-700">Your current location:</p>
            <p className="text-lg text-green-600 font-semibold">{selectedLocation}</p>
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

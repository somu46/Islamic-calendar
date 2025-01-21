import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { IoMdLocate } from "react-icons/io";
import { getCountry, getCountryCity } from "../../apiServices/apiServices";
import { FaSearch } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false); // New loading state

  const continents = [
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Antarctica",
    "Europe",
    "Oceania",
  ];

  const filteredCountries = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCities = cityData.filter((city) =>
    city.toLowerCase().includes(cityQuery.toLowerCase())
  );

  useEffect(() => {
    if (selectContinents) {
      const fetchCountry = async () => {
        try {
          const response = await getCountry(selectContinents);
          setCountryData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCountry();
    }
  }, [selectContinents]);

  useEffect(() => {
    if (country) {
      const fetchCountryCities = async () => {
        setLoading(true); // Start loading
        try {
          const response = await getCountryCity(country);
          setCityData(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Stop loading
        }
      };
      fetchCountryCities();
    }
  }, [country]);

  useEffect(() => {
    if (country && city) {
      const location = `${country}, ${city}`;
      sessionStorage.setItem("country", country);
      sessionStorage.setItem("city", city);
      sessionStorage.setItem("location", location);
      const getLocation = sessionStorage.getItem("location");
      setSelectedLocation(getLocation);
    }
  }, [country, city]);

  useEffect(() => {
    const getLocation = sessionStorage.getItem("location");
    setSelectedLocation(getLocation);
  }, []);

  const handleCountryClick = (country) => {
    setCountry(country);
    setCity("");
    setQuery("");
  };

  const handleCityClick = (city) => {
    setCity(city);
    setModalOpen(false);
  };

  const handleReset = () => {
    sessionStorage.removeItem("country");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("location");
    setSelectedLocation(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <div
        className="relative w-full"
        onClick={() => setModalOpen(true)}
      >
        <input
          type="text"
          placeholder="Set your location"
          value={selectedLocation || ""}
          readOnly
          className="w-full p-3 pl-10 border-2 border-blue-500 font-bold text-teal-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        />
        <IoMdLocate className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-teal-600" />
      </div>

      {selectedLocation === null ? (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="text-black text-xl font-semibold">
            <div>
              <select
                id="continents"
                onChange={(e) => setSelectContinents(e.target.value)}
                className="text-lg text-gray-700 border-2 border-teal-700 shadow-md rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="" disabled selected className="text-teal-500">
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
                            <div className="flex flex-row items-center p-1">
                              <img
                                src={country.flags.svg}
                                className="size-5 mr-3"
                                alt={country.flags.alt}
                              />
                              <p className="text-lg font-medium">
                                {country.name.common}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Region: {country.region}
                            </p>
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
                    {loading ? ( // Loading indicator
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
              </div>
            )}
          </div>
        </Modal>
      ) : (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div>
            <span className="text-lg font-bold text-teal-700 m-1">
              Your current location is :
            </span>
            <span className="text-lg text-green-600 font-semibold mx-1">
              {selectedLocation}
            </span>
            <p className="text-lg text-red-500 font-semibold mt-3 text-center ">
              If wrong location?
            </p>
            <p
              className="text-lg text-blue-700 font-semibold m-1 text-center cursor-pointer"
              onClick={handleReset}
            >
              Click to reset
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SetLocation;

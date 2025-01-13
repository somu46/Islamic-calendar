import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import { IoMdLocate } from "react-icons/io";
import { getCountry } from "../../apiServices/apiServices";
import { FaSearch } from "react-icons/fa";

const SetLocation = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [selectContinats, setselectContinats] = useState("");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");

  const continents = [
    " ",
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Antarctica",
    "Europe",
    "Oceania",
  ];

  // Filtered countries based on query
  const filteredCountries = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (selectContinats) {
      const fetchCountry = async () => {
        try {
          const response = await getCountry(selectContinats);
          setCountryData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCountry();
    }
  }, [selectContinats]);

  useEffect(() => {
    if (country) {
      sessionStorage.setItem("country", country);
    }
  }, [country]);

  return (
    <div className="max-w-md mx-auto">
      {/* Search Box Trigger */}
      <div className="relative w-full" onClick={() => setModalOpen(true)}>
        <input
          type="text"
          placeholder="Set your location"
          className="w-60 p-2 border border-gray-300 font-bold text-teal-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          readOnly
        />
        <IoMdLocate className="absolute right-4 text-[1.6rem] font-bold top-1/2 transform -translate-y-1/2 text-teal-600" />
      </div>

      {/* Modal for Searching */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-black text-xl font-semibold">
          {/* Continent Selector */}
          <div>
            <label className="mx-3" htmlFor="continents">
              Choose a Continent:
            </label>
            <select
              id="continents"
              onChange={(e) => setselectContinats(e.target.value)}
              className="text-lg"
            >
              {continents.map((continent, index) => (
                <option key={index} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
        {selectContinats&&(
          <div>
              <div className="relative w-full mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for countries..."
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Search"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filtered Results */}
          <div className="mt-2 max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className="py-2 border-b border-gray-300 cursor-pointer"
                  onClick={() => setCountry(country.name.common)} // Capture selected country
                >
                  <p className="text-lg font-medium">{country.name.common}</p>
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
        </div>
      </Modal>
    </div>
  );
};

export default SetLocation;

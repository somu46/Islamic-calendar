import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import { IoMdLocate } from "react-icons/io";

const SetLocation = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Example service data (replace with actual data if available)
  const serviceData = [
    {
      title: "Popular Services",
      Path: "popular-services",
      serviceType: [
        {
          name: "Transport",
          options: [
            { name: "Bus" },
            { name: "Taxi" },
            { name: "Car Rentals" },
          ],
        },
        {
          name: "Housing",
          options: [{ name: "Apartments" }, { name: "Hotels" }],
        },
      ],
    },
  ];

  const filteredServicesData = serviceData
    .map((service) => ({
      ...service,
      serviceType: service.serviceType.filter((serviceType) =>
        serviceType.options.some((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
      ),
    }))
    .filter((service) => service.serviceType.length > 0);

  const handleNavigate = (title, path, serviceType) => {
    navigate(`/services/${path}`, {
      state: { serviceType, title },
    });
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Search Box Trigger */}
      <div className="relative w-full" onClick={() => setModalOpen(true)}>
        <input
          type="text"
          placeholder="Set your location "
          className="w-60 p-2 border border-gray-300 font-bold text-teal-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          readOnly
        />
        <IoMdLocate  className="absolute right-4 text-[1.6rem] font-bold top-1/2 transform -translate-y-1/2 text-teal-600" />
      </div>

      {/* Modal for Searching */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-full">
          {/* Search Input */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for services..."
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <IoMdLocate  className="absolute right-4 text-xl top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Search Results */}
          <div className="max-h-64 overflow-y-auto">
            {query && filteredServicesData.length > 0 ? (
              filteredServicesData.map((service, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <h2 className="font-semibold text-blue-600 text-lg">
                    {service.title}
                  </h2>
                  <ul>
                    {service.serviceType.map((serviceType, i) => (
                      <li key={i} className="mb-2">
                        <h3 className="font-medium">{serviceType.name}</h3>
                        <ul className="ml-4">
                          {serviceType.options.map((option, j) => (
                            <li key={j}>
                              <div
                                onClick={() =>
                                  handleNavigate(
                                    service.title,
                                    service.Path,
                                    service.serviceType
                                  )
                                }
                                className="cursor-pointer text-gray-700 hover:text-blue-600 p-2 rounded-md"
                              >
                                {option.name}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-red-600">No services found for "{query}".</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SetLocation;

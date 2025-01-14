import React, { useState } from "react";

function ZakatCalculator() {
  const [formData, setFormData] = useState({
    gold20: { grams: 0, price: 0 },
    gold22: { grams: 0, price: 0 },
    gold24: { grams: 0, price: 0 },
    silver: { grams: 0, price: 0 },
    cashInHand: 0,
    cashInBank: 0,
    businessCash: 0,
    rentalIncome: 0,
    propertyValue: 0,
    stocks: 0,
    debts: 0,
  });

  const [currentTab, setCurrentTab] = useState("Gold & Silver");
  const [zakatAmount, setZakatAmount] = useState(null);
  const nisab = 87.48; // Nisab in grams of gold
  const zakatRate = 0.025;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const calculateTotalWealth = () => {
    const goldValue =
      formData.gold20.grams * formData.gold20.price +
      formData.gold22.grams * formData.gold22.price +
      formData.gold24.grams * formData.gold24.price;
    const silverValue = formData.silver.grams * formData.silver.price;
    const cashValue =
      formData.cashInHand + formData.cashInBank + formData.businessCash;
    const propertyValue = formData.rentalIncome + formData.propertyValue;
    const stocksValue = formData.stocks;

    return (
      goldValue +
      silverValue +
      cashValue +
      propertyValue +
      stocksValue -
      formData.debts
    );
  };

  const calculateZakat = () => {
    const totalWealth = calculateTotalWealth();
    if (totalWealth >= nisab * formData.gold24.price) {
      return totalWealth * zakatRate;
    }
    return 0;
  };

  const handleNext = () => {
    if (currentTab === "Gold & Silver") {
      setCurrentTab("Cash & Property");
    } else if (currentTab === "Cash & Property") {
      setCurrentTab("Debts & Liabilities");
    } else if (currentTab === "Debts & Liabilities") {
      setCurrentTab("Summary");
    }
  };

  const handleCalculate = () => {
    setZakatAmount(calculateZakat());
    setCurrentTab("Summary");
  };

  return (
    <div className="p-4 sm:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Zakat Calculator</h1>
      <div className="flex flex-wrap justify-center mb-4">
        {["Gold & Silver", "Cash & Property", "Debts & Liabilities", "Summary"].map((tab) => (
          <button
            key={tab}
            className={`px-1 py-2 text-sm font-semibold border-b-2 sm:mx-1 my-1 w-[25%] sm:w-auto ${
              currentTab === tab
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-600"
            }`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {currentTab === "Gold & Silver" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Gold</h2>
            {["24", "22", "18"].map((k) => (
              <div key={k} className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <label className="w-full sm:w-24 font-semibold">{k} Carats</label>
                <input
                  type="number"
                  placeholder="Grams"
                  className="border rounded-md p-2 flex-1 w-full sm:w-auto mx-1"
                  onChange={(e) => handleInputChange(`gold${k}.grams`, e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price/10g"
                  className="border rounded-md p-2 flex-1 w-full sm:w-auto"
                  onChange={(e) => handleInputChange(`gold${k}.price`, e.target.value)}
                />
              </div>
            ))}
            <h2 className="text-xl font-bold mt-6 mb-4">Silver</h2>
            <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <input
                type="number"
                placeholder="Grams"
                className="border rounded-md p-2 flex-1 w-full sm:w-auto"
                onChange={(e) => handleInputChange("silver.grams", e.target.value)}
              />
              <input
                type="number"
                placeholder="Price/10g"
                className="border rounded-md p-2 flex-1 w-full sm:w-auto mx-1"
                onChange={(e) => handleInputChange("silver.price", e.target.value)}
              />
            </div>
          </div>
        )}

        {currentTab === "Cash & Property" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Cash</h2>
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block font-semibold">In Hand</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => handleInputChange("cashInHand", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold">In Bank Account</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => handleInputChange("cashInBank", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold">In Business</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => handleInputChange("businessCash", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold">Rental Income</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => handleInputChange("rentalIncome", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold">Property Value</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold">Stocks</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => handleInputChange("stocks", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {currentTab === "Debts & Liabilities" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Debts & Liabilities</h2>
            <div>
              <label className="block font-semibold">Outstanding Debts</label>
              <input
                type="number"
                placeholder="Value"
                className="border rounded-md p-2 w-full"
                onChange={(e) => handleInputChange("debts", e.target.value)}
              />
            </div>
          </div>
        )}

        {currentTab === "Summary" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left bg-gray-100">Category</th>
                  <th className="border border-gray-300 p-2 text-left bg-gray-100">Details</th>
                  <th className="border border-gray-300 p-2 text-right bg-gray-100">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {/* Gold & Silver Section */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold" rowSpan={4}>Gold & Silver</td>
                  <td className="border border-gray-300 p-2">Gold 20 Carat</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{(formData.gold20.grams * formData.gold20.price).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Gold 22 Carat</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{(formData.gold22.grams * formData.gold22.price).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Gold 24 Carat</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{(formData.gold24.grams * formData.gold24.price).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Silver</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{(formData.silver.grams * formData.silver.price).toFixed(2)}
                  </td>
                </tr>
                {/* Cash Section */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold" rowSpan={3}>Cash</td>
                  <td className="border border-gray-300 p-2">Cash in Hand</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.cashInHand.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Cash in Bank</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.cashInBank.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Cash in Business</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.businessCash.toFixed(2)}
                  </td>
                </tr>
                {/* Property Section */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold" rowSpan={2}>Property</td>
                  <td className="border border-gray-300 p-2">Rental Income</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.rentalIncome.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Property Value</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.propertyValue.toFixed(2)}
                  </td>
                </tr>
                {/* Stocks Section */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold">Stocks</td>
                  <td className="border border-gray-300 p-2">Total Stocks</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.stocks.toFixed(2)}
                  </td>
                </tr>
                {/* Debts Section */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold">Debts</td>
                  <td className="border border-gray-300 p-2">Total Liabilities</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{formData.debts.toFixed(2)}
                  </td>
                </tr>
                {/* Total Wealth */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold">Total Wealth</td>
                  <td className="border border-gray-300 p-2">Net Wealth after Debts</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{calculateTotalWealth().toFixed(2)}
                  </td>
                </tr>
                {/* Zakat Payable */}
                <tr>
                  <td className="border border-gray-300 p-2 font-bold">Zakat Payable</td>
                  <td className="border border-gray-300 p-2">2.5% of Total Wealth</td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹{zakatAmount !== null ? zakatAmount.toFixed(2) : "Click 'Calculate'"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        {currentTab !== "Gold & Silver" && (
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            onClick={() => setCurrentTab((prev) => {
              if (prev === "Cash & Property") return "Gold & Silver";
              if (prev === "Debts & Liabilities") return "Cash & Property";
              return "Summary";
            })}
          >
            Back
          </button>
        )}
        {currentTab !== "Summary" ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleCalculate}
          >
            Calculate Zakat
          </button>
        )}
      </div>
    </div>
  );
}

export default ZakatCalculator;

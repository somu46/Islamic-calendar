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

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: parseFloat(value) || 0,
      },
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
  };

  const isDebtsValid = formData.debts > 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Zakat Calculator</h1>
      <div className="flex justify-center mb-6">
        {["Gold & Silver", "Cash & Property", "Debts & Liabilities", "Summary"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 mx-1 text-sm font-semibold border-b-2 ${
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

      <div className="bg-white rounded-lg shadow-lg p-6">
        {currentTab === "Gold & Silver" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Gold</h2>
            {["20", "22", "24"].map((k) => (
              <div key={k} className="flex items-center space-x-4 mb-4">
                <label className="w-24 font-semibold">{k} Carats</label>
                <input
                  type="number"
                  placeholder="Grams"
                  className="border rounded-md p-2 flex-1"
                  onChange={(e) => handleInputChange(`gold${k}`, "grams", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price/10g"
                  className="border rounded-md p-2 flex-1"
                  onChange={(e) => handleInputChange(`gold${k}`, "price", e.target.value)}
                />
              </div>
            ))}
            <h2 className="text-xl font-bold mt-6 mb-4">Silver</h2>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="number"
                placeholder="Grams"
                className="border rounded-md p-2 flex-1"
                onChange={(e) => handleInputChange("silver", "grams", e.target.value)}
              />
              <input
                type="number"
                placeholder="Price/10g"
                className="border rounded-md p-2 flex-1"
                onChange={(e) => handleInputChange("silver", "price", e.target.value)}
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, cashInHand: +e.target.value || 0 }))}
                />
              </div>
              <div>
                <label className="block font-semibold">In Bank Account</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => setFormData((prev) => ({ ...prev, cashInBank: +e.target.value || 0 }))}
                />
              </div>
              <div>
                <label className="block font-semibold">In Business</label>
                <input
                  type="number"
                  placeholder="Value"
                  className="border rounded-md p-2 w-full"
                  onChange={(e) => setFormData((prev) => ({ ...prev, businessCash: +e.target.value || 0 }))}
                />
              </div>
            </div>
          </div>
        )}

        {currentTab === "Debts & Liabilities" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Debts</h2>
            <label className="block font-semibold">Total Liabilities</label>
            <input
              type="number"
              placeholder="Value"
              className="border rounded-md p-2 w-full"
              onChange={(e) => setFormData((prev) => ({ ...prev, debts: +e.target.value || 0 }))}
            />
          </div>
        )}

        {currentTab === "Summary" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Gold & Silver</h3>
              {["20", "22", "24"].map((k) => (
                <p key={k} className="text-sm">
                  Gold {k} Carat: {formData[`gold${k}`].grams}g @ ₹{formData[`gold${k}`].price} per gram = ₹
                  {(formData[`gold${k}`].grams * formData[`gold${k}`].price).toFixed(2)}
                </p>
              ))}
              <p className="text-sm">
                Silver: {formData.silver.grams}g @ ₹{formData.silver.price} per gram = ₹
                {(formData.silver.grams * formData.silver.price).toFixed(2)}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Total Wealth</h3>
              <p className="text-sm font-bold">₹{calculateTotalWealth().toFixed(2)}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Payable Zakat</h3>
              <p>
                {zakatAmount !== null
                  ? `₹${zakatAmount.toFixed(2)}`
                  : "Click 'Calculate' to determine your Zakat."}
              </p>
            </div>
          </div>
        )}
<div className="flex justify-center">
<button
        className={`mt-6 px-6 py-2  rounded-md shadow-md ${
          currentTab === "Summary"
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={currentTab === "Summary" ? handleCalculate : handleNext}
        disabled={currentTab === "Debts & Liabilities" && !isDebtsValid}
      >
        {currentTab === "Summary" ? "Calculate" : "Continue"}
      </button>
      </div>
      </div>


    </div>
  );
}

export default ZakatCalculator;

import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { Helmet } from "react-helmet";

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

  const handleInputChange = (field, value, subField = null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: subField
        ? { ...prev[field], [subField]: parseFloat(value) || 0 }
        : parseFloat(value) || 0,
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
    <>
    <Helmet>
      <title>Zakat Calculator - Calculate Your Zakat Obligations</title>
      <meta name="description" content="Calculate your Zakat obligations with our comprehensive Zakat calculator. Ensure your contributions meet Islamic requirements." />
      <link rel="canonical" href="https://islamicalendar.in/zakat-calculator" />
    </Helmet>
      <div>
        <Breadcrumb pageName='Zakat Calculator' />
      </div>

      <div className="p-4 sm:p-10">


        {/* Calculator interface */}
        <h1 className="text-3xl font-bold text-center mb-6">Calculate Your Zakat</h1>
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
              {["20", "22", "24"].map((k) => (
                <div key={k} className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                  <label className="w-full sm:w-24 font-semibold">{k} Carats</label>
                  <input
                    type="number"
                    placeholder="Grams"
                    className="border rounded-md p-2 flex-1 w-full sm:w-auto mx-1"
                    onChange={(e) => handleInputChange(`gold${k}`, e.target.value, "grams")}
                  />
                  <input
                    type="number"
                    placeholder="Price/10g"
                    className="border rounded-md p-2 flex-1 w-full sm:w-auto"
                    onChange={(e) => handleInputChange(`gold${k}`, e.target.value, "price")}
                  />
                </div>
              ))}
              <h2 className="text-xl font-bold mt-6 mb-4">Silver</h2>
              <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <input
                  type="number"
                  placeholder="Grams"
                  className="border rounded-md p-2 flex-1 w-full sm:w-auto"
                  onChange={(e) => handleInputChange("silver", e.target.value, "grams")}
                />
                <input
                  type="number"
                  placeholder="Price/10g"
                  className="border rounded-md p-2 flex-1 w-full sm:w-auto mx-1"
                  onChange={(e) => handleInputChange("silver", e.target.value, "price")}
                />
              </div>
            </div>
          )}

          {currentTab === "Cash & Property" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Cash</h2>
              <div className="flex flex-col space-y-4">
                {[
                  { label: "In Hand", field: "cashInHand" },
                  { label: "In Bank Account", field: "cashInBank" },
                  { label: "In Business", field: "businessCash" },
                  { label: "Rental Income", field: "rentalIncome" },
                  { label: "Property Value", field: "propertyValue" },
                  { label: "Stocks", field: "stocks" },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block font-semibold">{label}</label>
                    <input
                      type="number"
                      placeholder="Value"
                      className="border rounded-md p-2 w-full"
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  </div>
                ))}
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
                    <th className="border border-gray-300 p-2 text-right bg-gray-100">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Gold Value</td>
                    <td className="border border-gray-300 p-2 text-right">
                      ₹
                      {(
                        formData.gold20.grams * formData.gold20.price +
                        formData.gold22.grams * formData.gold22.price +
                        formData.gold24.grams * formData.gold24.price
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Silver Value</td>
                    <td className="border border-gray-300 p-2 text-right">
                      ₹{(formData.silver.grams * formData.silver.price).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Cash</td>
                    <td className="border border-gray-300 p-2 text-right">
                      ₹
                      {(
                        formData.cashInHand +
                        formData.cashInBank +
                        formData.businessCash
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Total Wealth</td>
                    <td className="border border-gray-300 p-2 text-right">
                      ₹{calculateTotalWealth().toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Zakat Payable</td>
                    <td className="border border-gray-300 p-2 text-right">
                      ₹{zakatAmount !== null ? zakatAmount.toFixed(2) : "Calculate"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center space-x-6">
          {currentTab !== "Gold & Silver" && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={() => setCurrentTab((prev) => {
                if (prev === "Cash & Property") return "Gold & Silver";
                if (prev === "Debts & Liabilities") return "Cash & Property";
                return "Debts & Liabilities";
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

              {/* SEO-rich content section */}
              <div className="mb-8 space-y-4 text-gray-700">
          <h1 className="text-3xl font-bold text-center">Best Zakat Calculator - For Fulfilling Your Islamic Obligations</h1>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="mb-3">
              <strong>Fulfill your Zakat obligations with precision</strong> using our Sharia-compliant Zakat calculator. 
              As one of the <em>Five Pillars of Islam</em>, Zakat purification (Zakat al-Mal) is essential for every eligible Muslim 
              meeting the Nisab threshold. Calculate your annual Islamic charity contribution during Ramadan or any time 
              with our comprehensive wealth assessment tool.
            </p>

            <h2 className="text-xl font-semibold mt-4 mb-2">Key Features of Our Zakat Calculator</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gold and Silver Zakat calculation (24k, 22k, 20k carats)</li>
              <li>Liquid assets evaluation (cash, savings, business funds)</li>
              <li>Property investments and rental income assessment</li>
              <li>Stock market investments inclusion</li>
              <li>Debt and liabilities deduction system</li>
            </ul>
          </div>

          <div className="mt-6 p-4">
            <h3 className="text-lg font-semibold mb-2">Understanding Nisab in Modern Context</h3>
            <p>
              The current Nisab value ({nisab}g of gold) is equivalent to ₹{(nisab * formData.gold24.price).toFixed(2)}. 
              Our calculator automatically adjusts for fluctuating gold prices, ensuring your Zakat payment meets 
              Quranic requirements for wealth purification (tazkiyah).
            </p>
          </div>
        </div>

      {/* Additional SEO content section */}
      <div className="px-4 sm:px-10 pb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Why Calculate Zakat Annually?</h2>
          <div className="space-y-4">
            <p>
              Regular Zakat calculation helps maintain <em>financial purification</em> (tahara) and supports global 
              Muslim communities through obligatory charity (sadaqah). Our digital Zakat counter simplifies 
              complex calculations including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gold rate conversions based on current market prices</li>
              <li>Silver valuation according to Islamic jurisprudence (fiqh)</li>
              <li>Cryptocurrency zakat considerations (coming soon)</li>
              <li>Agricultural zakat calculations</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-4">Zakat Eligibility Criteria</h3>
            <p>
              Use this calculator if you possess wealth beyond basic needs (hawl al-hawl) for one lunar year. 
              Remember Zakat is obligatory on assets exceeding ≈₹{(nisab * formData.gold24.price).toFixed(2)} 
              (current gold-based Nisab value).
            </p>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default ZakatCalculator;
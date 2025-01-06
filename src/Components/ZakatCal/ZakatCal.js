import React, { useState } from 'react';

const ZakatCalculator = () => {
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [zakatDue, setZakatDue] = useState(null);

  const calculateZakat = () => {
    const totalAssets = parseFloat(assets);
    const totalLiabilities = parseFloat(liabilities);

    if (isNaN(totalAssets) || isNaN(totalLiabilities)) {
      alert('Please enter valid numbers for assets and liabilities.');
      return;
    }

    // Zakat calculation (typically 2.5% of savings after liabilities)
    const savings = totalAssets - totalLiabilities;

    if (savings >= 0) {
      const zakat = savings * 0.025; // 2.5%
      setZakatDue(zakat.toFixed(2));
    } else {
      alert('Liabilities cannot exceed assets.');
    }
  };

  return (
    <div className="zakat-calculator border border-red-600 h-1/4 w-1/4 p-4 bg-gray-300 ">
      <h2 className='text-center'>Zakat Calculator</h2>
      <div>
        <label>
          Total Assets (in currency):
          <input
            type="number"
            value={assets}
            onChange={(e) => setAssets(e.target.value)}
            placeholder="Enter your assets"
          />
        </label>
      </div>
      <div>
        <label>
          Total Liabilities (in currency):
          <input
            type="number"
            value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)}
            placeholder="Enter your liabilities"
          />
        </label>
      </div>
      <button className='bg-red-500 p-1 rounded-md ' onClick={calculateZakat}>Calculate Zakat</button>

      {zakatDue !== null && (
        <div>
          <h3>Calculated Zakat: {zakatDue} currency</h3>
        </div>
      )}
    </div>
  );
};

export default ZakatCalculator;

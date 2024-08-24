import React, { useState } from 'react';
import axios from 'axios';

const PincodeLookup = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      setResult(null);
      return;
    }

    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data[0];

      if (data.Status === 'Error') {
        setError('Invalid Pincode. Please try again.');
        setResult(null);
      } else {
        setResult(data.PostOffice[0]);
        setError('');
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
      setResult(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLookup();
  };

  return (
    <div className="pincode-lookup-container">
      <h2>Pincode Lookup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter 6-digit Pincode"
          className="pincode-input"
        />
        <button type="submit" className="lookup-button">
          Lookup
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="pincode-details">
          <h3>Pincode Details:</h3>
          <p><strong>Post Office Name:</strong> {result.Name}</p>
          <p><strong>Pincode:</strong> {result.Pincode}</p>
          <p><strong>District:</strong> {result.District}</p>
          <p><strong>State:</strong> {result.State}</p>
        </div>
      )}
    </div>
  );
};

export default PincodeLookup;

import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = {
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1NDE5ODAyLCJpYXQiOjE3MTU0MTk1MDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlZDEyYzQ1LWMyNWUtNDJlZi04NjZjLWMyNjRkNTMwYzEwZCIsInN1YiI6ImRoaXZpbmxAZHJuZ3BpdC5hYy5pbiJ9LCJjb21wYW55TmFtZSI6Im5ncGl0IiwiY2xpZW50SUQiOiJiZWQxMmM0NS1jMjVlLTQyZWYtODY2Yy1jMjY0ZDUzMGMxMGQiLCJjbGllbnRTZWNyZXQiOiJ6VlpVRGFLSlVjbEhPWWl2Iiwib3duZXJOYW1lIjoiMjFDUzAyMyIsIm93bmVyRW1haWwiOiJkaGl2aW5sQGRybmdwaXQuYWMuaW4iLCJyb2xsTm8iOiIyMyJ9.kiphG_r_zO6DwPQdS1rDD8EApPr9jzLtFsk9eFgJVzI",
    "expires_in": 1715419802
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setResponse(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred while fetching data.");
      }
      setResponse(null);
    }
  };

  return (
    <div>
      <h2>Average Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number ID (p, f, e, r):
          <input
            type="text"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Numbers</button>
      </form>
      {response && (
        <div>
          <p>Previous Window State: {JSON.stringify(response.windowPrevState)}</p>
          <p>Current Window State: {JSON.stringify(response.windowCurrState)}</p>
          <p># Numbers: {response['#numbers']}</p>
          <p>Average: {response.avg}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};


export default AverageCalculator;

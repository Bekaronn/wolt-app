// myapp-frontend/src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const addRestaurant = () => {
    fetch('http://localhost:5000/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address, contact_number: contactNumber, rating })
    })
      .then(response => response.json())
      .then(() => {
        setRestaurants([...restaurants, { name, address, contact_number: contactNumber, rating }]);
        setName('');
        setAddress('');
        setContactNumber('');
        setRating('');
      });
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.address}
          </li>
        ))}
      </ul>
      <h2>Add a Restaurant</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
      <input value={contactNumber} onChange={e => setContactNumber(e.target.value)} placeholder="Contact Number" />
      <input value={rating} onChange={e => setRating(e.target.value)} placeholder="Rating" />
      <button onClick={addRestaurant}>Add</button>
    </div>
  );
}

export default App;
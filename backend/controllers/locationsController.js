// locationsController.js

const cities = ['New York', 'Los Angeles', 'San Francisco', 'Mumbai', 'Delhi', 'Bangalore']; // Example city list

exports.getLocations = (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
  res.json(filteredCities);
};

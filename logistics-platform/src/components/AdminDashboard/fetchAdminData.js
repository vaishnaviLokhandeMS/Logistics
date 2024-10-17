import axios from 'axios';

// Fetch Driver Activity Data
export const fetchDriverActivity = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/driver-activity');
    return response.data;
  } catch (error) {
    console.error('Error fetching driver activity:', error);
    return [];
  }
};

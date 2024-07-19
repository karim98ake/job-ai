import axios from 'axios';

export const getCompanyLogo = async (companyName) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/logo/${companyName}`);
    return response.data.logo_url;
  } catch (error) {
    console.error('Error fetching logo:', error);
    return null;
  }
};

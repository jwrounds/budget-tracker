import axios from 'axios';

export interface UserData {
  username: string,
  email: string,
  password: string
}

const API_URL = 'http://localhost:8000/api/v1/users/';

// Register user
const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const userService = {
  register
};

export default userService;
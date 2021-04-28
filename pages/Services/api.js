import axios from "axios";

const accessToken = "6|GyucWAqVGfV8B33lUOSN3TYzhI7UUltR9w7MSFBF";

const apiUrl = "http://codesafe.org/api";

const baseApi = axios.create({
  baseUrl: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    
  },
});

export default { baseApi };

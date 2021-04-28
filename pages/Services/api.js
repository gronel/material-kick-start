import axios from "axios";

const accessToken = "6|GyucWAqVGfV8B33lUOSN3TYzhI7UUltR9w7MSFBF";

const baseURL = "http://codesafe.org/api";

const instance = axios.create({
  baseUrl: baseURL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export default { baseURL, instance, accessToken };

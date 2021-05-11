import axios from "axios";

const baseURL = "http://codesafe.org/api"; //local development
const accessToken = "7|C0wTL0TOja8S0X6VkgPwPm12MrlXNn52PRMkT8qV";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
   
  },
});

instance.interceptors.request.use(
  async (config) => {
      const userToken = await localStorage.getItem("token");

    if (userToken != null) {
      config.headers.token = userToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function httpMsg(obj, statuscode, msg) {
  if (statuscode === 401) {
    obj.$store.dispatch("logout").then(() => {
      obj.$router.push("/login");
    });
  } else if (statuscode === 200) {
    console.log(msg);
  } else if (statuscode === undefined) {
    console.log("Please contact administrator!!!");
  } else {
    console.log(msg);
  }
}

export default {
  instance,
  baseURL,
  httpMsg,
};

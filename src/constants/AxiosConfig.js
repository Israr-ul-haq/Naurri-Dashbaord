import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://3.86.246.235:8081",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default instance;

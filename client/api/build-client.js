import axios from "axios";

const BuildClient = ({ req }) => {
  if (typeof window == "undefined") {
    // We are on the server

    return axios.create({
      baseURL: "http://www.fuzzyrock.xyz",
      headers: req.headers,
    });
  } else {
    // We are on the browser

    return axios.create({
      baseURL: "/",
    });
  }
};

export default BuildClient;

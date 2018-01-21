import axios from "axios";
const baseUrl = "https://restcountries.eu/rest/v2/all";
const countryUrl = "https://restcountries.eu/rest/v2/name/";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data).catch(error => {
    console.log("fail");
  });
};
const getCountry = props => {
  console.log(props);
  const request = axios.get(countryUrl + props);
  return request.then(response => response.data).catch(error => {
    console.log("fail");
  });
};

export default { getAll, getCountry };

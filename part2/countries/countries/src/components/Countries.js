import React from "react";
import contactService from "../services/Contacts";

const Countries = props => {
  if (props.countries.length === 1) {
    Specific({
      country: props.countries[0],
      callback: data => {
        console.log(data);
        props.func(data);
      }
    });
    return (
      <div>
        <h2>{props.state.name}</h2>
        <p> Capital: {props.state.capital}</p>
        <p> Population: {props.state.population}</p>
        <img src={props.state.flag} alt="Flag" width="450" height="300" />
      </div>
    );
  } else {
    return (
      <div>
        <table>
          <tbody>
            {props.countries.map(country => (
              <Country
                key={country}
                countries={country}
                clickHandler={props.clickHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
const Specific = props => {
  contactService
    .getCountry(props.country)
    .then(response => {
      props.callback(response[0]);
    })
    .catch(error => {
      return (
        <div>
          <p> plööööööö </p>
        </div>
      );
    });
};
const Country = props => {
  return (
    <tr>
      <td onClick={props.clickHandler}>{props.countries}</td>
    </tr>
  );
};

export default Countries;

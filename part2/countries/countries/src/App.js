import React from "react";
import contactService from "./services/Contacts";
import Countries from "./components/Countries";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filter: "",
      specific: ""
    };
  }
  componentWillMount() {
    contactService.getAll().then(response => {
      let countryNames = response.map(data => data.name);
      this.setState({ countries: countryNames });
    });
  }
  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };
  clickHandler = event => {
    this.setState({ filter: event.target.textContent });
  };
  render() {
    const countriesToShow = this.state.countries.filter(country =>
      country.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    if (countriesToShow.length < 11) {
      return (
        <div>
          <div>
            find countries: {}
            <input value={this.state.filter} onChange={this.handleFilter} />
          </div>
          <Countries
            countries={countriesToShow}
            state={this.state}
            func={data => {
              this.setState({
                name: data.name,
                capital: data.capital,
                flag: data.flag,
                population: data.population
              });
            }}
            clickHandler={this.clickHandler}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            find countries: {}
            <input value={this.state.filter} onChange={this.handleFilter} />
          </div>
          <p> Too many countries to show, please specify.</p>
        </div>
      );
    }
    return <div />;
  }
}

export default App;

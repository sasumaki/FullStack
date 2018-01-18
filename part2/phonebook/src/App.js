import React from "react";
import Person from "./components/Person";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Martti Tienari", number: "040-123456" },
        { name: "Arto Järvinen", number: "040-123456" },
        { name: "Lea Kutvonen", number: "040-123456" }
      ],
      newName: "",
      newNumber: "",
      filter: ""
    };
  }
  handleNameChange = event => {
    this.setState({ newName: event.target.value });
  };
  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value });
  };
  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };
  addEntry = event => {
    event.preventDefault();
    const person = { name: this.state.newName, number: this.state.newNumber };
    let names = this.state.persons.map(person => person.name);
    if (!names.includes(person.name)) {
      let persons = this.state.persons.concat(person);
      this.setState({ persons, newName: "", newNumber: "" });
    } else {
      alert("Contact already exists!");
    }
  };
  render() {
    const contactsToShow = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <div>
          filter:{}
          <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h2>Add new contact</h2>
        <form onSubmit={this.addEntry}>
          <div>
            name:{}
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            number:{}
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <table>
          <tbody>
            {contactsToShow.map(person => (
              <Person
                key={person.name}
                name={person.name}
                number={person.number}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

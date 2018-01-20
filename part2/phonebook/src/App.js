import React from "react";
import Person from "./components/Person";
import Notification from "./components/Notification";
import contactService from "./services/Contacts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: "",
      error: null
    };
  }
  componentWillMount() {
    console.log("Getting data from http://localhost:3001/persons");
    contactService.getAll().then(response => {
      this.setState({ persons: response });
      console.log("promise fulfilled");
    });
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
  handleRemoval = (props, id) => {
    return () => {
      if (
        window.confirm(`Are you sure you want to delete ${props.person.name}`)
      ) {
        contactService.remove(id).then(response => {
          let remainingContacts = this.state.persons.filter(
            person => person.id !== id
          );
          this.setState({
            persons: remainingContacts,
            error: `${props.person.name} deleted.`
          });
          setTimeout(() => {
            this.setState({ error: null });
          }, 5000);
        });
      }
    };
  };
  addEntry = event => {
    event.preventDefault();
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    };
    let names = this.state.persons.map(person => person.name);
    let numbers = this.state.persons.map(person => person.number);

    if (!names.includes(newPerson.name)) {
      contactService.create(newPerson).then(response => {
        this.setState({
          persons: this.state.persons.concat(response),
          error: `${newPerson.name} added.`,
          newName: "",
          newNumber: ""
        });
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
      });
    } else {
      let modified = this.state.persons.filter(p => {
        return p.name === newPerson.name;
      });
      console.log(modified);
      const newModifiedPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: modified[0].id
      };
      if (
        window.confirm(
          `Are you sure you want to edit ${newModifiedPerson.name}?`
        )
      ) {
        contactService
          .update(modified[0].id, newPerson)
          .then(response => {
            console.log(response);
            this.setState({
              persons: this.state.persons.map(
                person =>
                  person.id !== modified[0].id ? person : newModifiedPerson
              ),
              error: `${newModifiedPerson.name} updated.`,
              newName: "",
              newNumber: ""
            });
            setTimeout(() => {
              this.setState({ error: null });
            }, 5000);
          })
          .catch(error => {
            this.setState({
              error: `${newModifiedPerson.name} already deleted`
            });
            setTimeout(() => {
              this.setState({ error: null });
            }, 5000);
          });
      }
    }
  };
  render() {
    const contactsToShow = this.state.persons.filter(person =>
      person.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <Notification message={this.state.error} />
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
                key={person.id}
                person={person}
                handler={this.handleRemoval}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

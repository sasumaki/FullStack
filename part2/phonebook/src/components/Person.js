import React from "react";
import contactService from "../services/Contacts";
const Person = props => {
  console.log(props);
  const handler = (props, id) => {
    return () => {
      console.log("deleting");
      contactService.remove(id).then(response => {
        console.log(props);
        console.log(props.persons.filter(person => person.id));
        let remainingContacts = props.persons.filter(
          person => person.id !== id
        );
        this.setState({ persons: remainingContacts });
      });
    };
  };

  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td>
        <button onClick={handler(props, props.person.id)}>Delete</button>
      </td>
    </tr>
  );
};
export default Person;

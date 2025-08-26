import { use, useState, useEffect } from "react";
import axios from "axios";
import contactServices from "./services/contacts";

const SearchFilter = (props) => {
  return (
    <div>
      Search: <input value={props.searchTerm} onChange={props.onChange} />
    </div>
  );
};

const NewContactForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <InputField
        text="name: "
        fieldType={props.newName}
        handleChange={props.handleNewName}
      ></InputField>
      <InputField
        text="number: "
        fieldType={props.newNumber}
        handleChange={props.handleNewNumber}
      ></InputField>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const InputField = (props) => {
  return (
    <div>
      {props.text}{" "}
      <input value={props.fieldType} onChange={props.handleChange} />
    </div>
  );
};

const DisplayContacts = ({ filteredContacts, handleDelete }) => {
  return (
    <div>
      {filteredContacts.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDelete(person)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");
    contactServices.getAll().then((response) => {
      console.log("promise fulfilled, data: ", response.data);
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (person) {
      const newPerson = { ...person, number: newNumber };
      if (
        window.confirm(
          `${newName} already added to the phone book, replace the old number with the new one?`
        )
      ) {
        contactServices.updateContact(newPerson).then((response) => {
          console.log("Updated contact. Contact: ", response.data);
          setPersons(
            persons.map((p) => (p.id === person.id ? response.data : p))
          );
          setNewName("");
          setNewNumber("");
        });
      }
    } else if (newName == "" || newNumber == "") {
      alert("name or number can't be empty");
    } else {
      const newPerson = { name: newName, number: newNumber };

      contactServices.create(newPerson).then((response) => {
        console.log("Added contact successfully. Contact: ", response.data);

        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      contactServices.deleteContact(person.id).then((response) => {
        console.log("deleted succesfully. Deleted contact: ", response.data);
        setPersons(persons.filter((person) => person.id !== response.data.id));
      });
    }
  };

  const filteredContacts = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        searchTerm={searchTerm}
        onChange={handleSearch}
      ></SearchFilter>
      <h2>Add a new contact</h2>
      <NewContactForm
        onSubmit={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      ></NewContactForm>
      <h2>Numbers</h2>
      <DisplayContacts
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      ></DisplayContacts>
    </div>
  );
};

export default App;

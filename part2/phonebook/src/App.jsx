import { use, useState, useEffect } from "react";
import axios from "axios";

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

const DisplayContacts = ({ filteredContacts }) => {
  return (
    <div>
      {filteredContacts.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
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
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled, data: ", response.data);
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.some((person) => person.name == newName);
    if (exists) {
      alert(`${newName} already added to the phone book.`);
    } else if (newName == "" || newNumber == "") {
      alert("name or number can't be empty");
    } else {
      const newPerson = { name: newName, number: newNumber };

      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
      <DisplayContacts filteredContacts={filteredContacts}></DisplayContacts>
    </div>
  );
};

export default App;

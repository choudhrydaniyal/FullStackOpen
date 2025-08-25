import { use, useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (!persons.some((person) => person.name == newName)) {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationClass("success");
          setNotificationMessage(`${returnedPerson.name} has been added`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        })
        .catch((error) => {
          setNotificationClass("error");
          setNotificationMessage(error.response.data.error);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        });
    } else {
      const existingPerson = persons.find((person) => person.name == newName);
      personService
        .update(existingPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          setNotificationClass("success");
          setNotificationMessage(
            `${returnedPerson.name}'s number has been changed`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        })
        .catch((error) => {
          setNotificationClass("error");
          setNotificationMessage(
            `Information of ${existingPerson.name} has already been removed from server`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.deleteEntry(person.id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id != deletedPerson.id));
      });
    }
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        className={notificationClass}
      />
      <PersonForm
        handleAddPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

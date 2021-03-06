import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/personService'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }

    if (persons.map(person => person.name).includes(newName)) {
      const person = persons.find(person => person.name === newName)
      console.log(person)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumber = {...person, number: newNumber}
        personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNotification(
              `${newName} number has been changed to ${newNumber}`
            )
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNotification(`Information of ${newName} has already been removed from server`)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
      
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const deletePerson = id => {

    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteUser(id, person)
        .then(
          setPersons(persons.filter(person => person.id !== id)),
          setNotification(
            `Deleted ${person.name}`
          ),
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          )
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterPersons = (event) => {
    setFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />


      <Filter filter={filter} filterPersons={filterPersons} />


      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
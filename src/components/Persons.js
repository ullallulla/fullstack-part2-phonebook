import React from 'react'
import Person from './Person'


const Persons = ({filter, persons, deletePerson}) => {

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) && filter != '')
  return (
    personsToShow.map((person, i) => 
      <Person key={i} person={person} deletePerson={() => deletePerson(person.id)}/>
    )
  )
}

export default Persons
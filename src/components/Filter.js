import React from 'react'

const Filter = ({ filter, filterPersons }) => {
    return (
        <div>
        filter shown with <input value={filter} onChange={filterPersons}/>
      </div>
    )
  }



export default Filter
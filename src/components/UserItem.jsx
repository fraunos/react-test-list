import { useState, useEffect } from 'react'
import sortBy from 'lodash/sortBy'

function UserItem({user, parentHandler, checked}) {
  const {id, avatar, first_name, last_name} = user;
  const [checkbox, setCheckbox] = useState(checked)
  
  const checkboxHandler = (ev) => {
    setCheckbox(ev.target.checked)
    parentHandler(ev)
  }
  
  return (
        <div className="UserItem" key={id}>
          <label htmlFor={id}>
            <img loading="lazy" src={avatar} height="50" width="50" />
            <span>
              {first_name} {last_name}
            </span>
        
          </label>
          <input type="checkbox" id={id} onChange={checkboxHandler} checked={checkbox} />
        </div>
  )
}


export default UserItem

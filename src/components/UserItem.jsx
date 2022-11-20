import { useState, useEffect } from 'react'

function UserItem({ user, parentHandler, checked }) {
  const { id, avatar, first_name, last_name } = user;
  const [checkbox, setCheckbox] = useState(checked)

  const checkboxHandler = (ev) => {
    setCheckbox(ev.target.checked)
    parentHandler(ev)
  }

  return (
    <div className="userItem" key={id}>
      <label htmlFor={id}>
        <img className="userAvatar" loading="lazy" src={avatar} height="50" width="50" />
        <span className="userName">
          {first_name} {last_name}
        </span>

        <input type="checkbox" id={id} onChange={checkboxHandler} checked={checkbox} />
      </label>
    </div>
  )
}


export default UserItem

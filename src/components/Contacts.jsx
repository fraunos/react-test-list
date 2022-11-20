import { useState, useEffect } from 'react'
import sortBy from 'lodash/sortBy'
import UserItem from './UserItem'
import './Contacts.css'
import { fetchUsers } from '../services/Users'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(new Set());


  useEffect(() => {
    fetchUsers().then(fetchedUsers => {
      const sortedUsers = sortBy(fetchedUsers, ['last_name'])
      setUsers(sortedUsers)
      setFilteredUsers(sortedUsers)
    })
  }, [])

  useEffect(() => {
    console.log(selectedUsers)
  }, [selectedUsers])

  useEffect(() => {
    setDisplayedUsers(filteredUsers.slice(0, 20))
  }, [filteredUsers])

  useEffect(() => {
    // TODO fuzzy search??
    setFilteredUsers(users.filter(user => {
      const { first_name, last_name } = user
      const query = search.toLowerCase()
      return first_name.toLowerCase().match(query) || last_name.toLowerCase().match(query)
    }))
  }, [search])

  const handleCheckbox = ({ target }) => {
    const { id, checked } = target
    if (checked) {
      setSelectedUsers(state => new Set(state.add(parseInt(id))))
    } else {
      setSelectedUsers(state => {
        state.delete(parseInt(id))
        return new Set(state)
      })
    }

  }
  const handleSearch = ({ target }) => {
    setSearch(target.value)
  }
  const showMoreUsers = (target) => {
    const { offsetHeight, scrollTop, scrollHeight } = target
    // TODO use intersection observer??
    if (offsetHeight + scrollTop === scrollHeight) {
      setDisplayedUsers(filteredUsers.slice(0, displayedUsers.length + 10))
    }
  }

  return (

    <div className="contacts">
      <div>Contacts</div>
      <input className="contactsSearch" type="text" onInput={handleSearch} />

      <div
        className="usersList"
        onScroll={({ target }) => showMoreUsers(target)}
      >
        {users && displayedUsers.map(user =>
          <UserItem
            key={user.id}
            user={user}
            checked={selectedUsers.has(user.id)}
            parentHandler={handleCheckbox} />)}
      </div>

    </div>
  )
}


export default UsersList

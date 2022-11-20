import { useState, useEffect } from 'react'
import sortBy from 'lodash/sortBy'
import UserItem from './UserItem'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  useEffect(() => {
    fetch('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json')
      .then(async (res) => {
        // TODO exceptions?
        const fetchedUsers = await res.json()
        const sortedUsers = sortBy(fetchedUsers, ['last_name'])
        setUsers(sortedUsers)
        setDisplayedUsers(sortedUsers.slice(0, 10))
      })
  }, [])

  useEffect(() => {
    console.log(selectedUsers)
  }, [selectedUsers])

  useEffect(() => {
    setDisplayedUsers(filteredUsers.slice(0, 10))
  }, [filteredUsers])

  useEffect(() => {
    // TODO fuzzy search
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

  return (
    <div className="UsersList">
      <input type="text" onInput={handleSearch} />
      {users && displayedUsers.map(user =>
        <UserItem
          key={user.id}
          user={user}
          checked={selectedUsers.has(user.id)}
          parentHandler={handleCheckbox} />)}

    </div>
  )
}


export default UsersList

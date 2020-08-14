const processContact = contact => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
})

export const fetchUsers = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
  const {results} = await response.json()
  return results.map(processContact)
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8000', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username, password}),
  })

  console.log("<login> response received.")
  if (response.ok) {
    //const json = await response.json()
    // return json.token
    const {token} = await response.json()

    return token
    //console.log("<login> response OK")
   
  }

  const errMessage = await response.text()
  console.log("<login> error:", errMessage)
  throw new Error(errMessage)
}
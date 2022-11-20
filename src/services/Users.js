export async function fetchUsers(callback) {
  return await fetch('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json')
    .then(async (res) => {
      // TODO exceptions??
      return await res.json()
    })
}
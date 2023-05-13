const storeToken = (value) => {
    localStorage.setItem('token', value)
  }
  const getToken = () => {
    let token = localStorage.getItem('token')
    return token
  }
  const removeToken = (value) => {
    localStorage.removeItem(value)
  }
  //new file worked 
  export { storeToken, getToken, removeToken }
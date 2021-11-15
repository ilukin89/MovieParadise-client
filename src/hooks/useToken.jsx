import { useState } from "react"
import { useEffect } from "react"

function useToken(){
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    if(accessToken) {
      setToken(accessToken)
      setUser(userId)
    }
  }, [])

  return { token, user }
}

export default useToken
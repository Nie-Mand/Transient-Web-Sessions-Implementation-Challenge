import { useState, useEffect } from 'react'
import './App.css'
import Profile from './components/Profile'
import Connect from './components/Connect'
import * as Session from './utils/session'

function App() {

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(true)

  const handleConnect = user => {
    Session.createSession(user)
    setReload(!reload)
  }

  const handleDisconnect = () => {
    Session.deleteSession()
    setReload(!reload)
  }

  useEffect(() => {
    const session = Session.getSession()
    setSession(session)
    setLoading(false)
  }, [reload])

 

  if (loading) return <div className="container" >Loading</div> 

  if (session) return <Profile user={session.user} onDisconnect={handleDisconnect} />

  return <Connect onConnect={handleConnect} />


}

export default App

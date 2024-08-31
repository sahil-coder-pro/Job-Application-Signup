import { useEffect, useState } from 'react'
import { ApplicantForm } from './components/ApplicantForm.jsx'
import { LandingPage } from './components/LandingPage.jsx'
import axios from "axios"


function App() {
  const [showRegister, setShowRegister] = useState(false) ;


  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
  }, [])

  if (showRegister) {
    return <ApplicantForm setShowRegister = {setShowRegister}/>
  }
  else {
    return <LandingPage setShowRegister={setShowRegister} />
  }
}

export default App

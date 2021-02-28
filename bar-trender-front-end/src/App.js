import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

const App = () => {

  const [msg, setMsg] = useState('No connection with API')

  //Exec only once, when the page load
  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/main/test/')
      .then(res => {
        setMsg(res.data.msg)
      })
      .catch(error => console.log(error))

  },[])

  return (
    <div className="App">
      <h2>{msg}</h2>
    </div>
  )
}

export default App;

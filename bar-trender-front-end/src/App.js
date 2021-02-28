import React, {useState, useEffect} from 'react';
import axs from  './utils/axios';
import './App.css';

const App = () => {

  const [msg, setMsg] = useState()

  //Exec only once, when the page load
  useEffect(() => {
    
    axs.get('main/test/')
      .then(res => setMsg(res.data.msg))
      .catch(error => setMsg('No connection with API'))

  },[])

  return (
    <div className="App">
      <h2>{msg}</h2>
    </div>
  )
}

export default App;
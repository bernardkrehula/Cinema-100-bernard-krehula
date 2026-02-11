import { useEffect } from 'react';
import './App.css';
import { requestMovie } from './api/requestMovie';

function App() {
  
  useEffect(() => {
    requestMovie();
  },[]);

  return (
    <div className='app'>
    </div>
  )
}

export default App;

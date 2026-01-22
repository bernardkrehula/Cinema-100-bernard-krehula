import { useEffect } from 'react';
import './App.css'
import supabase from './config/supabaseClient';
import { requestMovie } from './api/requestMovie';

function App() {
  
  useEffect(() => {
    requestMovie();
  },[]);

  return (
    <>
      <div>
      </div>
    </>
  )
}

export default App;

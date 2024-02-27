import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import MainPageRouter from './pages/MainPageRouter';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { useState } from 'react';

function App() {
  console.log('Inside app');
  // const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
  return (
    <div className="App">
      
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<MainPageRouter />} />
      </Routes>
    </div>
  );
}

export default App;

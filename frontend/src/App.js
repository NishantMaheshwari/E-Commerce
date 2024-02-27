import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import MainPageRouter from './pages/MainPageRouter';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { useState, useReducer } from 'react';
import { themeReducer } from './reducers/themeReducer';
import { ThemeContext } from './context/ThemeContext';

function App() {

  const initialTheme = {
    darkMode:false
  }

  const [theme,dispatch] = useReducer(themeReducer,initialTheme);

  return (
    <div className={`App ${theme.darkMode ? 'dark-mode' : ''}`}>
      <ThemeContext.Provider value={{theme,dispatch}}>
        <Toaster />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<MainPageRouter />} />
        </Routes>
      </ThemeContext.Provider>  
    </div>
  );
}

export default App;

import './LoginForm.css';
import { login } from '../../services/operations/authAPI';
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; 
import { BiMoon, BiSun } from 'react-icons/bi';
import { TOGGLE_THEME } from '../../reducers/themeReducer';

function LoginForm() {
  const navigate = useNavigate();
  const { theme,dispatch } = useContext(ThemeContext); 
  const [formData,setFormData] = useState({
    email:'',
    password:''
  });

  const {email,password} = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name] : e.target.value
      }
    })
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    login(email,password,navigate);
    setFormData({
      email:'',
      password:''
    })
  }

  const toggleTheme = () => {
    dispatch({type : TOGGLE_THEME});
  }
  
  // console.log('Inside Login Form');

  return (
    <div className={`login-main ${theme.darkMode ? 'dark-mode' : ''}`}> 
     <div className="theme-toggle-login" onClick={toggleTheme}>
        {theme.darkMode ? <BiSun /> : <BiMoon />}
        {theme.darkMode ? ' Light Mode' : ' Dark Mode'}
      </div>
     <div className={`sub-main ${theme.darkMode ? 'dark-mode' : ''}`}>
       <div>
         <div className="login-imgs">
           <div className="login-container-image">
             <img src='/eCom1.png' className="login-profile"/>
            </div>
         </div>
         <div>
           <h1>Welcome</h1>
          <form onSubmit={handleOnSubmit}>
           <div>
             <input 
             required
             className='login-name'
             type="text"
             name="email"
             value={email}
             onChange={handleOnChange}
             placeholder="Enter email address"
             />
           </div>
           <div className="second-input">
             <input 
             required
             className='login-name'
             type="password"
             name="password"
             value={password}
             onChange={handleOnChange}
             placeholder="Enter password"
             />
           </div>
          <button type = "submit" className="login-button">Login</button>
          </form>
          </div>
       </div>
     </div>
    </div>
  );
}

export default LoginForm;

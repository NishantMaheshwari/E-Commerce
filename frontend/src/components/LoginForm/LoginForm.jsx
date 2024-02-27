import './LoginForm.css';
import { login } from '../../services/operations/authAPI';
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

function LoginForm() {
  const navigate = useNavigate();
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
  
  // console.log('Inside Login Form');

  return (
    <div className="login-main">
     <div className="sub-main">
       <div>
         <div className="login-imgs">
           <div className="login-container-image">
             <img src='./person.png' alt="login-profile" className="login-profile"/>
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
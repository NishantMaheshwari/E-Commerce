import styles from './LoginForm.module.css'; 
import { login } from '@/services/operations/authAPI';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; 
import { BiMoon, BiSun } from 'react-icons/bi';
import { TOGGLE_THEME } from '../../reducers/themeReducer';
import { useRouter } from 'next/router';

function LoginForm() {
  const router=useRouter();
  const { theme, themeDispatch } = useContext(ThemeContext); 
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    login(email, password,router);
    setFormData({
      email:'',
      password:''
    });
  }

  const toggleTheme = () => {
    themeDispatch({ type: TOGGLE_THEME });
  }
  
  return (
    <div className={`${styles['login-main']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
      <div className={styles['theme-toggle-login']} onClick={toggleTheme}>
        {theme.darkMode ? <BiSun /> : <BiMoon />}
        {theme.darkMode ? ' Light Mode' : ' Dark Mode'}
      </div>
      <div className={`${styles['sub-main']} ${theme.darkMode ? styles['dark-mode'] : ''}`}>
        <div>
          <div className={styles['login-imgs']}>
            <div className={styles['login-container-image']}>
              <img src='/eCom1.png' className={styles['login-profile']} alt="Profile" />
            </div>
          </div>
          <div>
            <h1>Welcome</h1>
            <form onSubmit={handleOnSubmit}>
              <div>
                <input 
                  required
                  className={styles['login-name']}
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                />
              </div>
              <div className={styles['second-input']}>
                <input 
                  required
                  className={styles['login-name']}
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className={styles['login-button']}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

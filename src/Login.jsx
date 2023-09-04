import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Main from './Main'; // Import the Main component

function Login(props) {
  const handleRegisterClick = () => {
    props.onToggleForm();
  };

  const [dataLogin, setDataLogin] = useState({ message: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePostRequest_login = () => {
    axios
      .post('https://flask-server-psi.vercel.app/api/login', {
        email: formData.email,
        password: formData.password
      })
      .then((response) => {
        // Handle success
        console.log('Response:', response.data);

        if (response.status === 200) {
          // Update login status when status code is 200
          setLoggedIn(true);
        } else {
          // Display an error message when status code is not 200
          setDataLogin({ message: 'Login failed. Please check your credentials.' });
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        setDataLogin({ message: 'Error occurred' });
      });
  };

  // Conditionally render the Main component if logged in
  if (loggedIn) {
    return <Main />;
  }

  return (
    <div className="login-container">
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Login</h3>
      <form className='login_form'>
        <input
          type="email"
          placeholder="Email"
          className='login_input'
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className='login_input'
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button" // Change type to "button" to prevent form submission
          className='login_button'
          onClick={handlePostRequest_login}
        >
          Login
        </button>
      </form>
      {dataLogin.message && <p>{dataLogin.message}</p>}
      <p>
        Don't have an account?{' '}
        <span onClick={handleRegisterClick} className="register-link">
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;

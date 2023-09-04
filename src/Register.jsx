// import axios from 'axios';
// import React, { useState } from 'react';

// function Register(props) {

//   const handleLoginClick = () => {
//     props.onToggleForm();
//   };
//   const [dataRegister, setDataRegister] = useState({ message: '' });
//   const handlePostRequest_register = () => {
//     axios
//       .post('http://127.0.0.1:5000/api/register', {
//         // Your request data here
//         email_id: '',
//         name: '',
//         password: ''
        
//       })
//       .then((response) => {
//         // Handle success
//         console.log('Response:', response.data);
//         setDataRegister({ message: 'POST request successful' });
//       })
//       .catch((error) => {
//         // Handle error
//         console.error('Error:', error);
//         setDataRegister({ message: 'Error occurred' });
//       });
//   };

//   return (
//     <div className="register-container">
//       <h3 style={{textAlign: 'center', marginTop: '20px'}}>Register</h3>
//       <form className='register_form'>
//         <input type="text" placeholder="Name" className='register_input'/>
//         <input type="email" placeholder="Email" className='register_input'/>
//         <input type="password" placeholder="Password" className='register_input'/>
//         <button type="submit" className='register_button'>Register</button>
//       </form>
//       <p>
//         Already have an account?{' '}
//         <span onClick={handleLoginClick} className="login-link">
//           Login
//         </span>
//       </p>
//     </div>
//   );
// }

// export default Register;

import axios from 'axios';
import React, { useState } from 'react';

function Register(props) {
  const handleLoginClick = () => {
    props.onToggleForm();
  };

  const [dataRegister, setDataRegister] = useState({ message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePostRequest_register = () => {
    axios
      .post('http://127.0.0.1:5000/api/register', {
        name: formData.name,
        email_id: formData.email,
        password: formData.password
      })
      .then((response) => {
        // Handle success
        console.log('Response:', response.data);
        setDataRegister({ message: 'POST request successful' });
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        setDataRegister({ message: 'Error occurred' });
      });
  };

  return (
    <div className="register-container">
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Register</h3>
      <form className='register_form'>
        <input
          type="text"
          placeholder="Name"
          className='register_input'
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className='register_input'
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className='register_input'
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className='register_button'
          onClick={handlePostRequest_register}
        >
          Register
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={handleLoginClick} className="login-link">
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;


import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface LoginState {
    username: '',
    password: '',
}

function Login() {
  const [formData, setFormData] = useState<LoginState>({
    username: '',
    password: '',
  });

  const {username, password} = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    console.log(e.target);
    e.preventDefault();
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Login
        </h1>
        <p>Sign in to your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              type="text" 
              className="form-control" 
              id='username' 
              name='username' 
              value={username} 
              placeholder='Enter your username'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input 
              type="text" 
              className="form-control" 
              id='password' 
              name='password' 
              value={password} 
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;
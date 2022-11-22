import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/userSlice';
import Spinner from '../components/Spinner';

interface RegistrationState {
    username: '',
    email: '',
    password: '',
    password2: ''
}

function Register() {
  const [formData, setFormData] = useState<RegistrationState>({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const {username, email, password, password2} = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user, isLoading, isError, isSuccess, message} = useAppSelector((state) => state.user);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(`Registration failed: ${message}`);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match!');
    } else {
      const userData = {
        username,
        email,
        password
      }

      dispatch(register(userData))
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
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
              id='email' 
              name='email' 
              value={email} 
              placeholder='Enter your email'
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
          <div className='form-group'>
            <input 
              type="text" 
              className="form-control" 
              id='password2' 
              name='password2' 
              value={password2} 
              placeholder='Re-enter your password'
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

export default Register;
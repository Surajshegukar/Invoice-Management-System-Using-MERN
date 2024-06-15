import React, { useState } from 'react'
import {useContext} from 'react'
import systemContext from '../context/systemContext'

function Login() {
  const [user, setUser] = useState({email: '', password: ''});
  const {login} = useContext(systemContext);
  const handleOnChange = (e) => {
    setUser({...user, [e.target.id]: e.target.value});

  }
  const handleOnClick = () => {
    console.log(user);
    login(user.email, user.password);
  }

  return (
    <div className='container border w-50 mt-5 p-5'>
  <div className="row mb-3">
    <label for="email" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email"  onChange={handleOnChange} className="form-control w-50" id="email"/>
    </div>
  </div>
  <div className="row mb-3">
    <label for="password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" onChange={handleOnChange}  className="form-control w-50" id="password"/>
    </div>
  </div>
  
  <button onClick={handleOnClick} className="btn btn-primary">Sign in</button>
</div>
  )
}

export default Login
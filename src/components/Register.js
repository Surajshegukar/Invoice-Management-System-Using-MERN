import React from 'react'
import {useState} from 'react'
import {useContext} from 'react'
import systemContext from '../context/systemContext'

function Register() {
    const {register} = useContext(systemContext);
    const [user, setUser] = useState({email: '', name: '', password: ''});
    const handleOnChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value});
    
  }
    const handleOnClick = () => {
        console.log(user);
        register(user.name,user.email, user.password);

  }

  return (
    <div className="row g-3 container border mt-5 w-25 p-5 m-auto">
  <div className="col-md-6">
    <label for="email" className="form-label">Email</label>
    <input type="email" onChange={handleOnChange} className="form-control" id="email"/>
  </div>
  <div className="col-md-6">
    <label for="name" className="form-label">Username</label>
    <input type="text" onChange={handleOnChange} className="form-control" id="name"/>
  </div>
  <div className="col-md-6">
    <label for="password" className="form-label">Password</label>
    <input type="password" onChange={handleOnChange} className="form-control" id="password"/>
  </div>
  
  <div className="col-12">
    <button onClick={handleOnClick}  className="btn btn-primary">Sign in</button>
  </div>
</div>
  )
}

export default Register
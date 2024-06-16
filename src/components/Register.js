import React from 'react'
import {useState} from 'react'
import {useContext} from 'react'
import systemContext from '../context/systemContext'
import { useNavigate } from 'react-router-dom'


function Register() {
    const {register} = useContext(systemContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({email: '', name: '', password: ''});
    const handleOnChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value});
    
  }
    const handleOnClick = async(e) => {
      console.log(user);
      e.preventDefault();
      const {name, email, password} = user;
      const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success === true) {
        alert("Register Successfull");
        navigate('/login');
      }
      if(json.error){
        alert(json.error);
      }
      if(json.errors){
        alert(json.errors[0].msg);
      }

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
    <button onClick={handleOnClick}  className="btn btn-primary">Register</button>
  </div>
</div>
  )
}

export default Register
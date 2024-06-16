import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Login() {
  const [user, setUser] = useState({email: '', password: ''});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser({...user, [e.target.id]: e.target.value});

  }
  const redirect = () => {
    navigate('/manage/invoice');
  };

  const handleOnClick = async(e) => {
    console.log(user);
    e.preventDefault();
    const {email, password} = user;
    const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    console.log(json.success);

    if(json.success === true){
      localStorage.setItem('token',json.authtoken);
      redirect();
      alert("Login Successfull");
      

    }
    if(json.error){
      alert(json.error);
    }
    if(json.errors){
      alert(json.errors[0].msg);
    }
    
  }

  return (
    <div className='container border w-50 mt-5 p-5'>
  <div className="row mb-3">
    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email"  onChange={handleOnChange} className="form-control w-50" id="email"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" onChange={handleOnChange}  className="form-control w-50" id="password"/>
    </div>
  </div>
  
  <button onClick={handleOnClick} className="btn btn-primary">Log in</button>
</div>
  )
}

export default Login
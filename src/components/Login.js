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
    const response = await fetch('http://localhost:5000/api/auth/login', {
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
    <form className='container border mt-5 p-5' style={{maxWidth:"500px"}}>
  <div className="row mb-3">
    <label htmlFor="email" className="col-sm-2 col-form-label " style={{marginRight:"10px"}}>Email</label>
    <div className="col-sm-12">
      <input type="email"  onChange={handleOnChange} className="form-control"  id="email"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="password" className="col-sm-2 col-form-label" style={{marginRight:"10px"}}>Password</label>
    <div className="col-sm-12">
      <input type="password" onChange={handleOnChange}  className="form-control"  id="password"/>
    </div>
  </div>
  
  <button onClick={handleOnClick} className="btn btn-primary">Log in</button>
</form>
  )
}

export default Login
import React from 'react'
import {Link, useNavigate} from "react-router-dom"

function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    alert("Logged Out Successfully");
    navigate('/');

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand my-auto" to="/"><strong>Invoice</strong></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link to = "/" className="nav-link active my-auto" aria-current="page" >Home</Link>
        <Link to = "/about" className="nav-link my-auto" >About</Link>
        <div className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle my-1" to="/manage" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manage
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <div><Link className="dropdown-item" to="/manage/customer">Customer</Link></div>
            <div><Link className="dropdown-item" to="/manage/product">Product</Link></div>
            <div><Link className="dropdown-item" to="/manage/invoice">Create Invoice</Link></div>
            <div><Link className="dropdown-item" to="/manage/showinvoice">Show Invoice</Link></div>
          </div>
        </div>
        { !localStorage.getItem('token') ?<>
          <div><Link to = "/login" className="nav-link bg-light mx-2 p-2 my-1" style={{borderRadius:"5px"}} >Login</Link></div>
          <div><Link to = "/register" className="nav-link bg-light mx-2 p-2 my-1" style={{borderRadius:"5px"}} >Register</Link></div>
          </>
          :<div><button className="my-2 bg-danger p-1" style={{cursor: "pointer",borderRadius:"5px"}} onClick={handleLogOut} >Logout</button></div>
        }
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar
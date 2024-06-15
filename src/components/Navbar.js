import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><strong>Invoice</strong></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link to = "/" className="nav-link active" aria-current="page" >Home</Link>
        <Link to = "/about" className="nav-link" >About</Link>
        <div className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/manage" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manage
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <div><Link className="dropdown-item" to="/manage/customer">Customer</Link></div>
            <div><Link className="dropdown-item" to="/manage/product">Product</Link></div>
            <div><Link className="dropdown-item" to="/manage/invoice">Create Invoice</Link></div>
            <div><Link className="dropdown-item" to="/manage/showinvoice">Show Invoice</Link></div>
          </div>
        </div>
          <div><Link to = "/login" className="nav-link">Login</Link></div>
          <div><Link to = "/register" className="nav-link" >Register</Link></div>
        
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar
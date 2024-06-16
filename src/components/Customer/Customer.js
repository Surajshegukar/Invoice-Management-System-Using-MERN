import React, { useContext, useEffect, useState } from "react";
import CustomerItem from "./CustomerItem";
import systemContext from "../../context/systemContext";
import { useNavigate } from "react-router-dom";


function Customer() {
  const context = useContext(systemContext);
  const {fetchCustomer,customerList,addCustomer,deleteCustomer} = context;
  const [customer, setCustomer] = useState({ customerName: " ", customerEmail: '',customerMobileNo:0,customerAddress:'' });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    addCustomer(customer.customerName,customer.customerEmail,customer.customerMobileNo,customer.customerAddress);
    console.log(customer);
  };
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      alert("Please Login First");
      navigate('/login', { replace: true });
    }
    fetchCustomer();
  },[]);

  return (
    <>
      <div className="container w-50  my-4">
        <h3>Add Customer</h3>
        <div className="form-floating mb-3 w-30">
          <input
            type="text"
            name="customerName"
            onChange={onChange}
            className="form-control"
            id="floatingInput"
            placeholder="Customer Name"
          />
          <label htmlFor="floatingInput">Customer Name</label>
        </div>
        <div className="form-floating mb-3 w-30">
          <input
            type="email"
            name="customerEmail"
            onChange={onChange}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 w-30">
          <input
            type="number"
            onChange={onChange}
            name="customerMobileNo"
            className="form-control"
            id="floatingNumber"
            placeholder="Customer Mobile No."
          />
          <label htmlFor="floatingNumber">Customer Mobile No.</label>
        </div>
        <div className="form-floating mb-3 w-30 ">
          <input
            type="text"
            onChange={onChange}
            name="customerAddress"
            className="form-control"
            id="floatingInput"
            placeholder="Customer Address"
          />
          <label htmlFor="floatingInput">Customer Address</label>
        </div>
        <button
          type="button"
          onClick={handleOnClick}
          className="btn btn-primary mb-3"
        >
          Add Customer
        </button>
      </div>
      <div className="container mb-3 my-3">
      <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            customerList.map((customer,index)=>{
                return <CustomerItem key={index} index = {index} customer={customer} deleteCustomer={deleteCustomer}/>
            })
        }
          </tbody>
          </table>
        
      </div>
    </>
  );
}

export default Customer;

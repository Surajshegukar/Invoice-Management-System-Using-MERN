import React, { useState } from 'react'
import systemContext from './systemContext'
import Product from '../components/Product';

function SystemState(props) {
    const [productList,setProductList] = useState([]);
    const [customerList,setCustomerList] = useState([]);

    const fetchProduct = async() => {
        const response = await fetch('http://localhost:5000/api/product/fetchallproduct',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjM2MwNTI4ZjM2Njk3MTNkOGJmNGQwIn0sImlhdCI6MTcwNzMyNzY2OX0.HRD3nSFnD-pjCdSOB7itCtNMCrrJAzMmC7DEE0plKbU'
        },
    });
    const json = await response.json();
    // console.log(json);
    setProductList(json);
    
    }
    const fetchCustomer = async() => {
        const response = await fetch('http://localhost:5000/api/customer/fetchallcustomer',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjM2MwNTI4ZjM2Njk3MTNkOGJmNGQwIn0sImlhdCI6MTcwNzMyNzY2OX0.HRD3nSFnD-pjCdSOB7itCtNMCrrJAzMmC7DEE0plKbU'
        },
    });
    const json = await response.json();
    // console.log(json);
    setCustomerList(json);
    
    }
    const addProduct= async(productName,productPrice)=>{
        const response = await fetch('http://localhost:5000/api/product/addproduct',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjM2MwNTI4ZjM2Njk3MTNkOGJmNGQwIn0sImlhdCI6MTcwNzMyNzY2OX0.HRD3nSFnD-pjCdSOB7itCtNMCrrJAzMmC7DEE0plKbU"
            },
            body: JSON.stringify({productName,productPrice})
        });
        const tempProduct = await response.json();
        setProductList(productList.concat(tempProduct));
        
    };
    const addCustomer= async(customerName,customerEmail,customerMobileNo,customerAddress)=>{
      const response = await fetch('http://localhost:5000/api/customer/addcustomer',{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjM2MwNTI4ZjM2Njk3MTNkOGJmNGQwIn0sImlhdCI6MTcwNzMyNzY2OX0.HRD3nSFnD-pjCdSOB7itCtNMCrrJAzMmC7DEE0plKbU"
          },
          body: JSON.stringify({customerName,customerEmail,customerMobileNo,customerAddress})
      });
      const tempCustomer = await response.json();
      setCustomerList(customerList.concat(tempCustomer));
      console.log(tempCustomer);
      
  };

    const deleteProduct=async(id)=>{
      //For Forntend
      const newProduct = productList.filter((ele)=>{
        return ele._id !== id;
      })
      console.log("product deleted " + id);
      setProductList(newProduct);
    }
  return (
    <systemContext.Provider value={{productList,customerList,fetchProduct,fetchCustomer,addProduct,deleteProduct,addCustomer}}>
        {props.children}
    </systemContext.Provider>
  )
}

export default SystemState
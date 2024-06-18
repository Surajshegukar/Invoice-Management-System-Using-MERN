import React, { useState } from 'react'
import systemContext from './systemContext'


function SystemState(props) {
    const [productList,setProductList] = useState([]);
    const [customerList,setCustomerList] = useState([]);
    const [invoiceList,setInvoiceList] = useState([]);
    // const local_url = "http://localhost:5000";
    // const global_url = "https://invoice-management-system-using-mern-wwo7.vercel.app";

    const fetchProduct = async() => {
        const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/product/fetchallproduct',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
    });
    const json = await response.json();
    // console.log(json);
    setProductList(json);
    }
    const fetchInvoice = async() => {
        const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/invoice/fetchallinvoice',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
    });
    const json = await response.json();
    // console.log(json);
    setInvoiceList(json);
    }

    const fetchCustomer = async() => {
        const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/customer/fetchallcustomer',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
    });
    const json = await response.json();
    // console.log(json);
    setCustomerList(json);
    
    }
    const addProduct= async(productName,productPrice)=>{
        const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/product/addproduct',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({productName,productPrice})
        });
        const tempProduct = await response.json();
        setProductList(productList.concat(tempProduct));
        
    };
    const addCustomer= async(customerName,customerEmail,customerMobileNo,customerAddress)=>{
      const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/customer/addcustomer',{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({customerName,customerEmail,customerMobileNo,customerAddress})
      });
      const tempCustomer = await response.json();
      setCustomerList(customerList.concat(tempCustomer));
      console.log(tempCustomer);
      
  };
    const addInvoice= async(
      invoiceNumber,
      customerName,
      customerEmail,
      customerMobileNo,
      customerAddress,
      items,
      totalAmount,
      date)=>{
      const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/invoice/addinvoice',{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({invoiceNumber,
            customerName,
            customerEmail,
            customerMobileNo,
            customerAddress,
            items,
            totalAmount,
            date})
      });
      const tempInvoice = await response.json();
      setCustomerList(invoiceList.concat(tempInvoice));
      console.log(tempInvoice);
      
  };

    const deleteProduct=async(id)=>{
      const response = await fetch(`https://invoice-management-system-using-mern-wwo7.vercel.app/api/product/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = response.json();
      console.log(json);
      //For Forntend
      const newProduct = productList.filter((ele)=>{
        return ele._id !== id;
      })
      console.log("product deleted " + id);
      setProductList(newProduct);
    }
    const deleteCustomer=async(id)=>{
      const response = await fetch(`https://invoice-management-system-using-mern-wwo7.vercel.app/api/customer/deletecustomer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = response.json();
      console.log(json);
      //For Forntend
      const newCustomer = customerList.filter((ele)=>{
        return ele._id !== id;
      })
      console.log("Customer Deleted " + id);
      setCustomerList(newCustomer);
    }
    const deleteInvoice=async(id)=>{
      const response = await fetch(`https://invoice-management-system-using-mern-wwo7.vercel.app/api/invoice/deleteinvoice/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = response.json();
      console.log(json);
      //For Forntend

      const newInvoice = invoiceList.filter((ele)=>{
        return ele._id !== id;
      })
      console.log("product deleted " + id);
      setInvoiceList(newInvoice);
    }

    const editProduct = async (id,productName,productPrice) => {
    const response = await fetch(`https://invoice-management-system-using-mern-wwo7.vercel.app/api/product/updateproduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({productName,productPrice}),
    });
    
    const editedProduct = JSON.parse(JSON.stringify(productList))
    for (let index = 0; index < editedProduct.length; index++) {
      const element = editedProduct[index];
      if (element._id === id) {
        editedProduct[index].productName = productName;
        editedProduct[index].productPrice = productPrice;
        break;
      }
    }
    setProductList(editedProduct);
  };
  const editCustomer = async (id,customerName,customerEmail,customerMobileNo,customerAddress) => {
    const response = await fetch(`https://invoice-management-system-using-mern-wwo7.vercel.app/api/customer/updatecustomer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({customerName,customerEmail,customerMobileNo,customerAddress}),
    });
    
    const editedCustomer = JSON.parse(JSON.stringify(customerList))
    for (let index = 0; index < editedCustomer.length; index++) {
      const element = editedCustomer[index];
      if (element._id === id) {
        editedCustomer[index].customerName = customerName;
        editedCustomer[index].customerEmail = customerEmail;
        editedCustomer[index].customerMobileNo = customerMobileNo;
        editedCustomer[index].customerAddress = customerAddress;
        
        break;
      }
    }
    setCustomerList(editedCustomer);
  };
  const editInvoice = async (id,
    invoiceNumber,
    customerName,
    customerEmail,
    customerMobileNo,
    customerAddress,
    items) => {
    const response = await fetch(`https://invoice-management-system-using-mern-wwo7.vercel.app/api/invoice/updateinvoice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({invoiceNumber,
        customerName,
        customerEmail,
        customerMobileNo,
        customerAddress,
        items}),
    });
    
    const editedInvoice = JSON.parse(JSON.stringify(invoiceList))
    for (let index = 0; index < editedInvoice.length; index++) {
      const element = editedInvoice[index];
      if (element._id === id) {
        editedInvoice[index].invoiceNumber = invoiceNumber;
        editedInvoice[index].customerName = customerName;
        editedInvoice[index].customerEmail = customerEmail;
        editedInvoice[index].customerMobileNo = customerMobileNo;
        editedInvoice[index].customerAddress = customerAddress;
        editedInvoice[index].items = items;
      
        break;
      }
    }
    setProductList(editedInvoice);
  };
  const getUser = async () => {
    const response = await fetch('https://invoice-management-system-using-mern-wwo7.vercel.app/api/auth/getuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    return json;
  };

  
  
  return (
    <systemContext.Provider value={{productList,customerList,invoiceList,
    fetchInvoice,fetchProduct,fetchCustomer,
    addProduct,addInvoice,addCustomer,
    editProduct,editCustomer,editInvoice,
    deleteCustomer,deleteInvoice,deleteProduct,getUser
    }}>

        {props.children}
    </systemContext.Provider>
  )
}

export default SystemState
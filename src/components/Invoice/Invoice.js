import React, { useState, useRef, useContext, useEffect} from "react";
import systemContext from "../../context/systemContext";
import PrintInvoice from "./PrintInvoice";
import { useNavigate } from "react-router-dom";


const Invoice = () => {
  const context = useContext(systemContext)
  const {addInvoice,fetchProduct,productList} = context;
  const modalContentRef = useRef(null);
  const navigate = useNavigate();
  const [productOption,setProductOption] = useState([]);
  
  
  
  useEffect(()=>{
    
    if(!localStorage.getItem('token')){
      alert("Please Login First");
      navigate('/login', { replace: true });
    }

  },[]);

  useEffect(()=>{
    fetchProduct();
    console.log("UseEffect")
    console.log(productList);
  },[])

  const [items,setItems] = useState([])

  const [error, setError] = useState(false);
  
  const handleAdd = (e)=>{
    e.preventDefault();

    
    if(customerInfo.customerName === "" || customerInfo.mobileNumber === "" || customerInfo.address === "" || items.length === 0){
      alert("Please fill all the fields")
      setError(true)
    }
    
    if(products.product === "") {
      alert("Please enter a valid product name")
      setError(true)
    }
    if(products.quantity < 1){
      alert("Please enter a valid quantity")
      setError(true)
    }
    if(products.price < 1){
      alert("Please enter a valid price")
      setError(true)
    }
    if(error === false){
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      
      addInvoice(customerInfo.invoiceNo,customerInfo.customerName,customerInfo.customerEmail,customerInfo.mobileNumber,customerInfo.address,items,0,customerInfo.date)
      alert("Invoice Added Successfully")
      setCustomerInfo({
        customerName: "",
        customerEmail: "",
        mobileNumber: "",
        address: "",
        date: new Date().toGMTString().substring(5,16),
      });
      setProducts([
        { product: "", quantity: 0, price: 0 },
      ])
      
    }
    else{
      setError(false)
    }
    
  }
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const [customerInfo, setCustomerInfo] = useState({
    invoiceNo:randomNumber ,
    customerName: "",
    customerEmail: "",
    mobileNumber: "",
    address: "",
    date: new Date().toGMTString().substring(5,16),
  });
  console.log(productList);

  const [products, setProducts] = useState([
    { product: "", quantity: 0, price: 0 },
  ]);

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleProductChange = (index, e) => {
    
    const { name, value } = e.target;

    if(name === "product"){
      productList.find((product)=>{
        if(product.productName === value){
          setProductOption([{
            productName: product.productName,
            productPrice: product.productPrice
          }]);}
      });
      
    }
    
    console.log(productOption);
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, [name]: value } : product
      )
    );
    setItems(products)
  };

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: "", quantity: 0, price: 0 },
    ]);
  };

  const handleRemoveProduct = (index) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product, i) => i !== index)
    );
  };
  const pdfref = useRef(null)
  const downloadPdf=()=>{
   pdfref.current.save();
  }

  return (
    <form className="container my-4" style={{maxWidth:"500px"}}>
      <div className="form-floating mb-3 w-30">
        <input
          type="text"
          name="customerName"
          value={customerInfo.customerName}
          onChange={handleCustomerInfoChange}
          className="form-control"
          id="floatingInput"
          placeholder="Customer Name"
          required
        />
        <label htmlFor="floatingInput">Customer Name</label>
      </div>
      <div className="form-floating mb-3 w-30 form-group">
        <input
          type="email"
          name="customerEmail"
          id="floatingInput"
          value={customerInfo.customerEmail}
          onChange={handleCustomerInfoChange}
          className="form-control"
          placeholder="Customer Email"
          
        />
        <label htmlFor="floatingInput">Customer Email</label>
      </div>
      <div className="form-floating mb-3 w-30">
        <input
          type="tel"
          name="mobileNumber"
          value={customerInfo.mobileNumber}
          onChange={handleCustomerInfoChange}
          className="form-control"
          id="floatingInput"
          placeholder="Customer mobile number"
          required
        />
        <label htmlFor="floatingInput">Customer Mobile Number</label>
      </div>
      <div className="form-floating mb-3 w-30">
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          onChange={handleCustomerInfoChange}
          className="form-control"
          id="floatingInput"
          placeholder="Customer address"
          required
        />
        <label htmlFor="floatingInput">Customer Address</label>
      </div>

      <div>
        <h3>Products</h3>
        {products.map((product, index) => (
          <div className="d-flex row gap-3 mt-4" key={index}>
            <div className="form-floating">
              <select
                type="text"
                name="product"
                value={product.product}
                onChange={(e) => handleProductChange(index, e)}
                className="form-control"
                id="floatingInput"
                placeholder="Product Name"
                required
              >
                <option value = "0">Select Product</option>
                {productList.map((product,index)=>{
                  return <option key={index} value={product.productName}>{product.productName}</option>
                })}
              </select>
              
              
              <label htmlFor="floatingInput" className="mx-2">Product Name</label>
            </div>
            <div className="form-floating ">
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                className="form-control"
                id="floatingInput"
                placeholder="Product Quantity"
                required
              />
              <label htmlFor="floatingInput" className="mx-2">Quantity</label>
            </div>
            <div className="form-floating">
              <select
                name="price"
                value={product.price}
                onChange={(e) => handleProductChange(index, e)}
                className="form-control"
                id="floatingInput"
                required
                >
                  <option value = "0">Select Price</option>
                  {productOption.map((product,index)=>{
                    return <option key={index} value={product.productPrice}>{product.productPrice}</option>
                  })}
                </select>
              <label htmlFor="floatingInput" className="mx-2">Price</label>
            </div>

            <button
              className="btn btn-danger mx-3"
              style={{maxWidth:"50px",Height:"70px"}}
              type="button"
              onClick={() => handleRemoveProduct(index)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            
          </div>
        ))}
        <button type="button" className="btn btn-primary me-3 my-5 mb-3" onClick={handleAddProduct}>
          <i className="fa-solid fa-plus"></i> Add Product
        </button>
      </div>
      <button
        type="button"
        className="btn btn-primary me-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-regular fa-file"></i> Preview
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAdd}
      >
      Save
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Print Invoice
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <PrintInvoice
                invoiceNo = {customerInfo.invoiceNo}
                customerName ={customerInfo.customerName}
                customerEmail = {customerInfo.customerEmail}
                customerMobileNo ={customerInfo.mobileNumber}
                customerAddress = {customerInfo.address}
                products={products}
                cretedAt = {customerInfo.date}
                modalContentRef={modalContentRef}
                
              />
            </div>
            <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            </div>
          </div>
        </div>
      </div>

    </form>
  );
};

export default Invoice;

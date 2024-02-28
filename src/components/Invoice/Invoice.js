import React, { useState, useRef, useContext} from "react";
import systemContext from "../../context/systemContext";
import PrintInvoice from "./PrintInvoice";



const Invoice = () => {
  const context = useContext(systemContext)
  const {addInvoice} = context;
  const modalContentRef = useRef(null);
  
  
  const [items,setItems] = useState([])

  const [error, setError] = useState(false);
  
  const handleAdd = (e)=>{
    e.preventDefault();

    
    if(customerInfo.customerName === "" || customerInfo.customerEmail === "" || customerInfo.mobileNumber === "" || customerInfo.address === "" || items.length === 0){
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
        { product: "", quantity: '', price: '' },
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

  const [products, setProducts] = useState([
    { product: "", quantity: '', price: '' },
  ]);

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
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
    <div className="container w-50  my-4">
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
          required
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
          placeholder="Customer Name"
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
          placeholder="Customer Name"
          required
        />
        <label htmlFor="floatingInput">Customer Address</label>
      </div>

      <div>
        <h3>Products</h3>
        {products.map((product, index) => (
          <div className="d-flex gap-3" key={index}>
            <div className="form-floating mb-3 w-25">
              <input
                type="text"
                name="product"
                value={product.product}
                onChange={(e) => handleProductChange(index, e)}
                className="form-control"
                id="floatingInput"
                placeholder="Product Name"
                required
              />
              <label htmlFor="floatingInput">Product Name</label>
            </div>
            <div className="form-floating mb-3 w-25">
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
              <label htmlFor="floatingInput">Quantity</label>
            </div>
            <div className="form-floating mb-3 w-25">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => handleProductChange(index, e)}
                required
                className="form-control"
                id="floatingInput"
                placeholder="Product Price"
              />
              <label htmlFor="floatingInput">Price</label>
            </div>

            <button
              className="bg-danger w-10 "
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

    </div>
  );
};

export default Invoice;

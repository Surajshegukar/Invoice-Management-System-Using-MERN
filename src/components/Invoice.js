import React,{useState} from 'react'
// import './style.css'
function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    customer: {
      name: '',
      email: '',
      address: '',
      mobile:0
    },
    items: [{
      productName:'',
      productPrice:0,
      productQunatity:0
    }],

  });
  const onChange = (e) =>{
    setNewInvoice({...newInvoice,[e.target.name]: e.target.value,
      });
    };
  const handleOnClick =(e)=>{
      console.log(newInvoice);
  };
  return (
    <>
    <h2 className='text-center'>Create Invoice</h2>
    <div className="container w-50  my-4 d-flex flex flex-wrap gap-3">
        
        <div className="form-floating mb-3 w-30">
          <input
            type="text"
            name="name"
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
            name="email"
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
            name="mobile"
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
            name="address"
            className="form-control"
            id="floatingInput"
            placeholder="Customer Address"
          />
          <label htmlFor="floatingInput">Customer Address</label>
        </div>
        </div>
        <div className="container w-50  my-4 d-flex flex flex-wrap gap-3">
        <div className="form-floating mb-3 w-30 ">
          <input
            type="text"
            onChange={onChange}
            name="productName"
            className="form-control"
            id="floatingInput"
            placeholder="Customer Address"
          />
          <label htmlFor="floatingInput">Product Name</label>
        </div>
        <div className="form-floating mb-3 w-30 ">
          <input
            type="productPrice"
            onChange={onChange}
            name="customerAddress"
            className="form-control"
            id="floatingInput"
            placeholder="Customer Address"
          />
          <label htmlFor="floatingInput">Product Price</label>
        </div>
        <div className="form-floating mb-3 w-30 ">
          <input
            type="text"
            onChange={onChange}
            name="ProductQuantity"
            className="form-control"
            id="floatingInput"
            placeholder="Customer Address"
          />
          <label htmlFor="floatingInput">Product Quantity</label>
        </div>
         
        </div>
        <div className='d-flex justify-content-center'><button
          type="button"
          onClick={handleOnClick}
          className="btn btn-primary mb-3"
        >
          Add Customer
        </button> </div>
        </>
    
  )
}

export default Invoice
import React, { useContext, useState, useEffect, useRef } from "react";
import systemContext from "../../context/systemContext";
import PrintInvoice from "./PrintInvoice";
import editInvoice from "./editInvoice";
import { useNavigate } from "react-router-dom";

function ShowInvoice() {
  const context = useContext(systemContext);
  const modalContentRef = useRef(null);
  const updateContentRef = useRef(null);
  const { invoiceList, editInvoice, fetchInvoice, deleteInvoice } = context;
  const navigate = useNavigate();
  
  const [eInvoice, setEInvoice] = useState({
    eInvoiceNumber: 0,
    eCustomerName: " ",
    eCustomerEmail: " ",
    eCustomerMobileNo: " ",
    eCustomerAddress: "",
    eItems:[]

  });
  const handleClick = (e) => {
    e.preventDefault();
    editInvoice(
      eInvoice.id,
      eInvoice.eInvoiceNumber,
      eInvoice.eCustomerName,
      eInvoice.eCustomerEmail,
      eInvoice.eCustomerMobileNo,
      eInvoice.eCustomerAddress,
      eInvoice.eItems
    );
    //refClose.current.click();
  };
  const onChange = (e) => {
    setEInvoice({ ...eInvoice, [e.target.name]: e.target.value });
  };
  const updateInvoice = (currentInvoice) => {
    setEInvoice({
      id: currentInvoice._id,
      eInvoiceNumber: currentInvoice.invoiceNumber,
      eCustomerName: currentInvoice.customerName,
      eCustomerEmail: currentInvoice.customerEmail,
      eCustomerMobileNo: currentInvoice.customerMobileNo,
      eCustomerAddress: currentInvoice.customerAddress,
      eItems:currentInvoice.items
      
    });
  
  };

  // Function to update eItems
  const updateEItems = (updatedItems) => {
    setEInvoice(prevState => ({
      ...prevState,
      eItems: updatedItems
    }));
  };

  // Handle changes in eItems
  const handleItemChange = (index, key, value) => {
    const updatedItems = [...eInvoice.eItems];
    updatedItems[index][key] = value;
    updateEItems(updatedItems);
  };

  // Function to add a new eItem
  const handleAddItem = () => {
    const newItem = { product: "", quantity: 0, price: 0 };
    updateEItems([...eInvoice.eItems, newItem]);
  };

  // Function to remove an eItem
  const handleRemoveItem = (index) => {
    const updatedItems = [...eInvoice.eItems];
    updatedItems.splice(index, 1);
    updateEItems(updatedItems);
  };

  useEffect(() => {
    if(!localStorage.getItem('token')){
      alert("Please Login First");
      navigate('/login', { replace: true });
    }

    fetchInvoice();
  }, [deleteInvoice,editInvoice]);
  return (
    <>
      <div className="container my-3" style={{overflowX:"scroll"}}>
        Show Invoice
        <table className="table table-striped table-hover my-5">
          <thead className="table-primary ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Invoice Number</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Email</th>
              <th scope="col">Customer Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td scope="row">{invoice.invoiceNumber}</td>
                  <td scope="row">{invoice.customerName}</td>
                  <td scope="row">{invoice.customerEmail}</td>
                  <td scope="row">{invoice.customerAddress}</td>
                  <td scope="row">
                    <div
                      className="modal fade"
                      id={`exampleModal${index}`}
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
                              invoiceNo={invoice.invoiceNumber}
                              customerName={invoice.customerName}
                              customerEmail={invoice.customerEmail}
                              customerMobileNo={invoice.customerMobileNo}
                              customerAddress={invoice.customerAddress}
                              products={invoice.items}
                              date={invoice.date.substring(0, 10)}
                              modalContentRef={modalContentRef}
                            />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary">
                              Print
                            </button>

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
                    <div
                      className="modal fade"
                      id={`uexampleModal${index}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Update Invoice
                            </h5>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label htmlFor="eInvoiceNo">
                                  Invoice No
                                </label>
                                <input
                                  name="eInvoiceNumber"
                                  type="text"
                                  value={eInvoice.eInvoiceNumber}
                                  className="form-control"
                                  id="eInvoiceNo"
                                  onChange={onChange}
                                  aria-describedby="invoiceNo"
                                  placeholder="Enter Invoice No"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="eCustomerName">
                                  Customer Name
                                </label>
                                <input
                                  name="eCustomerName"
                                  type="text"
                                  value={eInvoice.eCustomerName}
                                  className="form-control"
                                  id="eCustomerName"
                                  onChange={onChange}
                                  aria-describedby="eCustomerName"
                                  placeholder="Enter Customer Name"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="eCustomerEmail">
                                  Customer Email
                                </label>
                                <input
                                  name="eCustomerEmail"
                                  value={eInvoice.eCustomerEmail}
                                  type="text"
                                  className="form-control"
                                  id="eCustomerEmail"
                                  onChange={onChange}
                                  placeholder="Enter Customer Email"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="eCustomerMobileNo">
                                  Customer Mobile No.
                                </label>
                                <input
                                  name="eCustomerMobileNo"
                                  type="text"
                                  value={eInvoice.eCustomerMobileNo}
                                  className="form-control"
                                  id="eCustomerMobileNo"
                                  onChange={onChange}
                                  placeholder="Enter Customer Mobile No"
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="eCustomerAddress">
                                  Customer Address
                                </label>
                                <input
                                  name="eCustomerAddress"
                                  type="text"
                                  value={eInvoice.eCustomerAddress}
                                  className="form-control"
                                  id="eCustomerAddress"
                                  onChange={onChange}
                                  placeholder="Enter The address"
                                />
                              </div>
                              {eInvoice.eItems.map((product, index) => (
                                <div className="d-flex gap-3" key={index}>
                                  <div className="form-floating mb-3 w-25">
                                    <input
                                      type="text"
                                      name="eProduct"
                                      value={product.product}
                                      onChange={(e) => handleItemChange(index, 'product', e.target.value)}
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
                                      name="eQuantity"
                                      value={product.quantity}
                                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
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
                                      name="ePrice"
                                      value={product.price}
                                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
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
                                    onClick={() => handleRemoveItem(index)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              ))}
                              <button type="button" className="btn btn-primary me-3 my-5 mb-3" onClick={handleAddItem}>
                                <i className="fa-solid fa-plus"></i> Add Product
                              </button>

                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e)=>{handleClick(e)}}
                        data-bs-dismiss="modal"
                      >
                        Update
                      </button>
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
          <button
            type="button"
            className="btn btn-primary me-3 my-1"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal${index}`}
          >
            <i className="fa-regular fa-file"></i> Preview
          </button>
          <button
            type="button"
            className="btn btn-primary me-3 my-1"
            data-bs-toggle="modal"
            data-bs-target={`#uexampleModal${index}`}
            onClick={() => updateInvoice(invoice)}
          >
            Edit
          </button>
          <button
            onClick={() => deleteInvoice(invoice._id)}
            className="btn btn-danger my-1"
          >
            Delete
          </button>
        </td>
      </tr>
      );
            })}
    </tbody >
        </table >
      </div >
    </>
  );
}

export default ShowInvoice;

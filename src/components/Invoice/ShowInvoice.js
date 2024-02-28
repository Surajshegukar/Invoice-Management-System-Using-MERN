import React, { useContext, useEffect, useState, useRef } from "react";
import systemContext from "../../context/systemContext";
import PrintInvoice from "./PrintInvoice";
function ShowInvoice() {
  const context = useContext(systemContext);
  const modalContentRef = useRef(null);
  const { invoiceList, fetchInvoice, deleteInvoice } = context;
  useEffect(() => {
    fetchInvoice();
  }, []);
  return (
    <>
      <div className="container my-3">
        Show Invoice
        <table className="table table-striped table-hover my-5" >
          <thead className="table-primary ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Invoice Number</th>
              <th scope="col">customer Name</th>
              <th scope="col">customer Email</th>
              <th scope="col">customer Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice, index) => {
              console.log(invoice.items);
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
                              invoiceNo={invoice.invoiceNumber}
                              customerName={invoice.customerName}
                              customerEmail={invoice.customerEmail}
                              customerMobileNo={invoice.customerMobileNo}
                              customerAddress={invoice.customerAddress}
                              products={invoice.items}
                              date={invoice.date.substring(0,10)}
                              modalContentRef={modalContentRef}
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              
                            >
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
                    <button
                      type="button"
                      className="btn btn-primary me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i className="fa-regular fa-file"></i> Preview
                    </button>
                    <button
                      onClick={() => deleteInvoice(invoice._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowInvoice;

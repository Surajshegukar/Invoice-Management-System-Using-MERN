import React from 'react'

function PrintInvoice() {
  return (
    <div><div className='container border my-5'>
    <div id="Invoice"> 
      <div style={{width: "100%",height: "100%"}}>    
          <div className="header">
            <div className="companyName" id="companyName" >Vinu Enterprises</div>
            <div className="phoneNum" id="phoneNum" >Phone No. 9764560267</div>
            <div className="email" id="email" >Email: morekarsantosh17@gmail.com</div>
            <img style={{position:"relative",top:"0",left:"1100px",width:"80px",height: "80px"}} src="./icon2.jpg" alt=""/>
          </div>
          <br/>
          <h1>Tax Invoice</h1>
          <div className="floatText1">
            <span className="billTo" id="billTo" >Bill to:{CustomerName}</span>
            <span className="invoiceNo" id="invoiceNo">Invoice No.: 1530</span>
          </div>
          <br/>
          <div className="floatText2">
            <span className="customer-phone" id = "customer-phone">Phone No. {CustomerMobileNo}</span><br/>
            <span className="companyAddress" id = "customer-email">Customer Email: {CustomerEmail}</span>
            <span className="date" id="date">Date: 01-11-2023</span>
          </div>
      
          <table id="itemTable">
            <thead>
              <tr>
              <th style={{width: "5%"}}>#</th>
              <th style={{width: "35%", textAlign: "start"}}>Item Name</th>
              <th style={{width: "10%"}}>HSN/SAC</th>
              <th className="rightAlign" style={{width: "15%"}}>Quantity</th>
              <th className="rightAlign" style={{width: "15%"}}>Price/Unit</th>
              <th className="rightAlign" style={{width: "15%"}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td style={{textAlign: "start", fontWeight: "bold"}}>Total</td>
                <td ></td>
                <td ></td>
                <td ></td>
                <td ><span id="totalAmount">0</span></td>  
            </tr>
            </tfoot>
          </table>
          <div className="table-wrapper">
            <div className="custom-table-container">
              <table className="custom-first-table">
                <tr>
                  <td className="upperCase1">INVOICE AMOUNT IN WORDS</td>
                </tr>
                <tr className="custom-first-alternate-row">
                  <td><p id="result">three</p></td>
                </tr>
                <tr>
                  <td className="upperCase1">TERMS AND CONDITIONS</td>
                </tr>
                <tr className="custom-first-alternate-row">
                  <td>Thank you for doing business with us.</td>
                </tr>
              </table>
        
              <table className="custom-second-table">
                <tr>
                  <td>Sub Total</td>
                  <td className="rightAlign" id="subTotal" style={{textAlign: "end"}}>₹ 0</td>
                </tr>
                <tr>
                  <td>Tax (CGST+SGST) </td>
                  <td className="rightAlign" id="tax" style={{textAlign: "end"}}>₹0</td>
                </tr>
                <tr className="custom-second-highlighted-row">
                  <td>Total</td>
                  <td className="rightAlign" id="oTotal" style={{textAlign: "end"}}>₹0</td>
                </tr>
                <tr>
                  <td>Received</td>
                  <td className="rightAlign" style={{textAlign: "end"}}>₹ 0.0</td>
                </tr>
                <tr className="custom-second-bottom-outline-row">
                  <td>Balance</td>
                  <td className="rightAlign" id="bal" style={{textAlign: "end"}}>₹ 400</td>
                </tr>
              </table>
            </div>
        
          </div>
          <p className="signatureSpace1" id = "signatureSpace1"> For Vinu Enterprises
          </p>
          <p className="signatureSpace2"> Authorized Signatory
          </p>
        </div>
    </div>
</div></div>
  )
}

export default PrintInvoice
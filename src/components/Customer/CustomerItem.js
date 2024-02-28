import React from 'react'

function CustomerItem(props) {
    const {customer,index,deleteCustomer} = props
  return (
    <tr>
        <th scope="row">{index + 1}</th>
        <td>{customer.customerName}</td>
        <td>{customer.customerEmail}</td>
        <td>{customer.customerMobileNo}</td>
        <td>{customer.customerAddress}</td>
        <td><a onClick={()=>{deleteCustomer(customer._id)}}><i className="fa-solid fa-trash"></i></a></td>
      </tr>
    
  )
}

export default CustomerItem
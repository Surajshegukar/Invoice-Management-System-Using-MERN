import React, { useContext } from 'react'
import SystemState from '../context/SystemState'
import systemContext from '../context/systemContext';

function ShowProduct(props) {
  const context = useContext(systemContext)
  const {deleteProduct} = context;
    const {product , index} = props
  return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{product.productName}</td>
        <td>{product.productPrice}</td>
        <td><a onClick={(id)=>{deleteProduct(product._id)}}><i className="fa-solid fa-trash"></i></a></td>
      </tr>
        
  )
}

export default ShowProduct
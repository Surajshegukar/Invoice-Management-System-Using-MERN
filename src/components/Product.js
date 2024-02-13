import React, { useContext, useEffect, useState } from "react";
import ShowProduct from "./ShowProduct";
import systemContext from "../context/systemContext";

function Product() {
  const context = useContext(systemContext);
  const { productList, fetchProduct, addProduct } = context;

  const [product, setProduct] = useState({ productName: " ", productPrice: 0 });

  const handleClick = (e) => {
    e.preventDefault();
    addProduct(product.productName, product.productPrice);
    // console.log(product);
  };
  const OnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div className="container w-50  my-4">
        <h3>Add Product</h3>
        <div className="form-floating mb-3 w-30">
          <input
            name="productName"
            type="text"
            className="form-control"
            id="floatingInput"
            onChange={OnChange}
            placeholder="Product Name"
          />
          <label htmlFor="floatingInput">Product Name</label>
        </div>
        <div className="form-floating mb-3 w-30">
          <input
            name="productPrice"
            type="number"
            className="form-control"
            id="floatingNumber"
            onChange={OnChange}
            placeholder="Product Price"
          />
          <label htmlFor="floatingNumber">Product Price</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={handleClick}
        >
          Add Product
        </button>
      </div>
      <div className="container">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            productList.map((product,index)=>{
                return <ShowProduct key={index} index = {index} product={product}/>
            })
        }
          </tbody>
        </table>
        
      </div>
    </>
  );
}

export default Product;

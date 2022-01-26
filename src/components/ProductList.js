import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../context/withContext";

const ProductList = (props)=>{
    const {products} = props.context;
    return(
        <React.Fragment>
            <div className="hero is-primary">
                <div className="hero-body container">
                    <h4 className="title">Our Products</h4>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="column columns is-multiline">
                    {products && products.length ?(
                        products.map((product, index) =>(
                            <ProductItem 
                                key={index}
                                product = {product}
                                addToCart = {props.context.addToCart}
                            />
                        ))
                    ):(
                        <div className="column">
                            <span className="title has-text-grey-light">
                                No Products found!
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};
export default withContext(ProductList);
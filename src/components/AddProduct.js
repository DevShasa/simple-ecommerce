import React, {Component} from "react";
import withContext from "../context/withContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

const initState = {
    name: "",
    price: "",
    stock: "",
    shortDesc: "",
    description: ""
};

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            productState: initState,
            flash: null, 
            error: ""
        }
    }

    save = async (e)=>{
        e.preventDefault();
        const { name, price, stock, shortDesc, description} = this.state.productState;

        if (name && price){

            // Send the data to the server
            await axios.post(
                'http://localhost:3001/products',
                { name, stock, price, shortDesc, description}
            )

            // Update contect
            this.props.context.addProduct(
                {name, price, shortDesc, description, stock: stock || 0}, 
                () => this.setState({productState: initState}) // reset the state 
            );
            this.setState({
                flash: {status: "is-success", msg:"Product successfully added"}
            });
        }else{
            this.setState({
                flash: {status: "is-danger", msg:"Please enter name and price"}
            });
        }
    }    

    handlechange = (e) => {
            
        this.setState({
            productState:{
                ...this.state.productState,
                [e.target.name]:e.target.value
            }
        });
    }

    render(){
        const { name, price, stock, shortDesc, description} = this.state.productState;
        const { user } = this.props.context;


        return !(user && user.accessLevel < 1)? (
            <Redirect to="/" />
        ):(
            <React.Fragment>
                <div className="hero is-primary">
                    <div className="hero-body container">
                        <h4 className="title">Add Product</h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.save}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <label className="label">Product Name: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.handlechange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Price: </label>
                                <input 
                                    className="input"
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={this.handlechange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Available in stock: </label>
                                <input 
                                    className="input"
                                    type="number"
                                    name="stock"
                                    value={stock}
                                    onChange={this.handlechange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Short Description: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="shortDesc"
                                    value={shortDesc}
                                    onChange={this.handlechange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Description: </label>
                                <input 
                                    className="textarea"
                                    type="text"
                                    rows="2"
                                    style={{resize: "none"}}
                                    name="description"
                                    value={description}
                                    onChange={this.handlechange}
                                />
                            </div>
                            {this.state.flash &&(
                                <div className={`notification ${this.state.flash.status}`}>
                                    {this.state.flash.msg}
                                </div>
                            )}
                            <div className="field is-clearfix">
                                <button
                                    className="button is-primary is-outlined is-pulled-right"
                                    type="submit"
                                    onClick={this.save}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
export default withContext(AddProduct)
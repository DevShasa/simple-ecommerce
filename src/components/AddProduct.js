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
            const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

            await axios.post(
                'http://localhost:3001/products',
                { id, name, stock, price, shortDesc, description}
            )

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

    handlechange = (e) => this.setState({
        productState: [e.target.name] = e.target.value,
        error: "" 
    })

    render(){
        return(
            <div>
                Wolan
            </div>
        )
    }
}
export default withContext(AddProduct)
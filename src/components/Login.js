import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import withContext from "../context/withContext";

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            error: ""
        }
    }

    handlechange = (e)=> this.setState({
        [e.target.name]: e.target.value, 
        error: ""
    });

    login = (e)=>{
        e.preventDefault();
        const {username, password} = this.state;
        if (!username || !password) {
            return this.setState({error: "Fill All the fields"})
        }
        this.props.context.login(username, password)
            .then((loggedIn)=>{
                if(!loggedIn){ // if loggedin is false
                    this.setState({error: "Invalid Credentials"})
                }
            })
    };

    render(){
        return !this.props.context.user ? (
            <>
                <div className="hero is-primary">
                    <div className="hero-body container">
                        <h4 className="title">Login</h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.login}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <label className="label">Email: </label>
                                <input 
                                    className="input"
                                    type="email"
                                    name="username"
                                    onChange={this.handlechange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Password: </label>
                                <input 
                                    className="input"
                                    type="password"
                                    name="password"
                                    onChange={this.handlechange}
                                />
                            </div>
                            {this.state.error && (
                                <div className="has-text-danger">
                                    {this.state.error}  
                                </div>
                            )}
                            <div className="field is-clearfix">
                                <button className="button is-primary is-outlined is-pulled-right">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        ) :(
            <Redirect to="/products"/>
        );
    }
}
export default withContext(Login);
import React, {Component} from 'react';
import snap from '../../src/Pictures/snapchat.png';
import axios from "axios";
import App from '../App.js';

class Connexion extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            result : <div></div>

        };
    }

    setPassword = (e) => {
        this.setState({password : e.target.value});
    };

    setEmail = (e) => {
        this.setState({email : e.target.value});
    };

    login = (e) => {
        e.preventDefault();
        axios
            .post('http://snapchat-webac.tk/connection', this.state, {
                headers: { 
                'Access-Control-Allow-Origin:': '*',
                'content-type': 'application/json'
              }})
            .then(confirm => {
                localStorage.setItem('token', confirm.data.data.token);
                new App();
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({result :<div className="alert alert-danger mt-3">Incorrect email ou mot de passe</div>});
            });
    };


    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-xl-5 col-sm-12 mx-auto d-block">
                        <div className="mx-auto d-block">
                            <img src={snap} className="img-fluid mx-auto d-block" alt="logo"/>
                        </div>
                        <a href="/">
                            <button className="btn btn-light btn-sm mb-3">Retour</button>
                        </a>
                        <form method="post" action="/inscription" onSubmit={this.login}>
                            <div className="form-group">
                                <label htmlFor="email">Email :</label>
                                <input className="form-control" onChange={this.setEmail} value={this.email} id="email" type="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password :</label>
                                <input className="form-control" onChange={this.setPassword} value={this.password} id="password" type="password"/>
                            </div>
                            <button className="btn btn-primary btn-lg mx-auto d-block mt-5" type="submit">Connexion
                            </button>
                        </form>
                        {this.state.result}
                    </div>
                </div>
            </div>
        )
    }
}

export default Connexion;

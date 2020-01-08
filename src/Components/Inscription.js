import React, {Component} from 'react';
import snap from "../Pictures/snapchat.png";
import axios from 'axios';

class Inscription extends Component {

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

    register = (e) => {
        e.preventDefault();
        axios
            .post('http://snapchat-webac.tk/inscription', this.state, {crossorigin: "anonymous",
                headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
              }})
            .then(confirm => {
                this.setState({result : <div className="alert alert-success mt-3">Votre inscription a bien ete prise en compte</div>});
            })
            .catch(error => {
                this.setState({result :<div className="alert alert-danger mt-3">Une erreur est survenue merci de reesayer</div>});
                console.log('stop ' +error);
        });
    };

    render() {
        const test = <div className="container">
                <div className='row'>
                    <div className="col-xl-5 col-sm-12 mx-auto d-block">
                        <div className="mx-auto d-block">
                            <img src={snap} className="img-fluid mx-auto d-block" alt="logo"/>
                        </div>
                        <a href="/">
                            <button className="btn btn-light btn-sm mb-3">Retour</button>
                        </a>
                        <form method="post" action="/inscription" onSubmit={this.register}>
                            <div className="form-group">
                                <label for="email">Email :</label>
                                <input className="form-control" onChange={this.setEmail} value={this.email} id="email" type="email"/>
                            </div>
                            <div className="form-group">
                                <label for="password">Password :</label>
                                <input className="form-control" onChange={this.setPassword} value={this.password} id="password" type="password"/>
                            </div>
                            <button className="btn btn-primary btn-lg mx-auto d-block mt-5" type="submit">Inscription</button>
                        </form>
                        {this.state.result}
                    </div>
                </div>
        </div>;
        return (test);
    }
}

export default Inscription;

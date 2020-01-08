import React from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import Inscription from './Components/Inscription';
import Connexion from './Components/Connexion';
import Home from './Components/Home';
import Snap from './Components/Snap'
/*import { connect } from 'react';*/
import {Component} from 'react';
import {BrowserRouter as Router, Route, withRouter, /*Switch*/} from "react-router-dom";
import {/*Link*/ Redirect} from 'react-router-dom';

const fakeAuth = {
    setsession() {

        localStorage.getItem('token') === null
            ? this.isAuthenticated = false
            : this.isAuthenticated = true
    },
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        localStorage.clear()
        setTimeout(cb, 100)
    }
};

/*const Public = () => <h3>Public</h3>*/
const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/'/>
    )}/>
);

const AuthButton = withRouter(({history}) => (
    fakeAuth.isAuthenticated ? (
        <button className="btn btn-danger mx-auto d-block btn-sm" onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Logout</button>

    ) : (
        <div></div>
    )
));

class App extends Component {

    constructor(props) {
        super(props);
        fakeAuth.setsession();
        console.log(fakeAuth.isAuthenticated)
        console.log(localStorage.getItem('token'))
    }

    render() {

        return (
            <div className="container col-xl-6">
                <Router>
                    <div className="mt-2"><AuthButton/>
                    </div>
                    <Route path="/" component={Home} exact/>
                    <Route path="/connexion" component={Connexion} exact/>
                    <Route path="/inscription" component={Inscription} exact/>
                    <PrivateRoute path='/protected' component={Protected}/>
                    <PrivateRoute path='/snap' component={Snap}/>
                    <PrivateRoute path='/mesnap' component={Snap}/>
                </Router>
            </div>
        );
    }
}

export default App;
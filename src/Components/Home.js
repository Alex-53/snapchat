import React, {Component} from 'react';
import snap from "../Pictures/snapchat.png";

class Home extends Component {

    render() {
            if (localStorage.getItem('token') === null)
            {
                return (
                    <div className="container">
                        <div className='row'>
                            <div className="col-xl-5 col-sm-12 mx-auto d-block">
                                <div className="mx-auto d-block">
                                    <img src={snap} className="img-fluid mx-auto d-block" alt="logo"/>
                                </div>
                                <div className="d-flex justify-content-around mt-5">
                                    <a href="/inscription">
                                        <button className="btn btn-primary btn-lg">Inscription</button>
                                    </a>
                                    <a href="/connexion">
                                        <button className="btn btn-primary btn-rounded btn-lg">Connexion</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else
            {
                return (
                    <div className="container">
                        <div className='row'>
                            <div className="col-xl-5 col-sm-12 mx-auto d-block">
                                <div className="mx-auto d-block">
                                    <img src={snap} className="img-fluid mx-auto d-block" alt="logo"/>
                                </div>
                                <div className="">

                                    <a href="/snap">
                                    <button className="btn btn-success">Snap</button>
                                    </a>
                                    <a href="/mesnaps">
                                        <button className="btn btn-success">Recu</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

    }
}

export default Home;

import React, {Component} from 'react';
import snap from '../../src/Pictures/snapchat.png';
import axios from "axios";
import Webcam from 'react-webcam';


class Snap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            file: null,
            duration: '',
            load: false,
            email: '',
            result: '',

        };
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        /*this.refs.cam.setAttribute('href', imageSrc);*/
        /* test = base64ToImage(imageSrc,path,optionalObj);
         console.log(test);*/
    };

    send = () => {
        axios
            .get('http://snapchat-webac.tk/all',{
                headers: {
                    token: localStorage.getItem('token'),
                    'Access-Control-Allow-Origin': "*",
                }
            })
            .then(confirm => {
                this.setState({data : confirm.data});
                this.setState({load: true})
            })
            .catch(error => {
                console.log(error);
            });

    };

    send_snap = (e) => {
        let form = new FormData();
        this.setState({email: e.target.id});

        form.append('image', this.state.file);
        form.append('to', this.state.email);
        form.append('duration', 5);

        axios
            .post('http://snapchat-webac.tk/snap', form, {
                headers: {
                    token: localStorage.getItem('token'),
                    'Access-Control-Allow-Origin:': "*",
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(confirm => {
                console.log(confirm);
                this.setState({result :<div className="alert alert-success mt-3">Votre snap a bien ete envoye</div>});
            })
            .catch(error => {
                console.log(error);
                this.setState({result :<div className="alert alert-danger mt-3">Une erreur est survenue</div>});
            });
    };

    set_file = (e) => {
        this.setState({file: e.target.files[0]})
    };


    render() {

        const videoConstraints = {
            width: 1600,
            height: 1800,
            facingMode: "user"
        }

        const {data} = this.state;

        return (
            <div className="container">
                <div className='row'>
                    <div className="col-xl-5 col-sm-12 mx-auto d-block">
                        <div className="mx-auto d-block">
                            <img src={snap} className="img-fluid mx-auto d-block" alt="logo"/>
                        </div>
                        <div className='d-flex row justify-content-between'>
                            <a href="/">
                                <button className="btn btn-light btn-sm mb-3">Retour</button>
                            </a>
                            <div>
                                <input className="input-sm" type="NUMBER"/>
                            </div>

                                <button onClick={this.send} className="btn btn-success btn-sm mb-3">Envoyer</button>


                        </div>
                        <form>
                            <input onChange={this.set_file} type="file" className="mb-3 form-control-file"/>
                        </form>
                        <div className="webcam">
                            <Webcam

                                ref={this.setRef}
                                screenshotFormat="image/jpeg"

                                videoConstraints={videoConstraints}
                            />
                        </div>
                        <a href='cam' download='snap'>
                            <canvas className="mx-auto d-block" id="screen" width="50" height="50"
                                    onClick={this.capture}>Capture photo
                            </canvas>
                        </a>
                        {this.state.result}
                        <div>
                            <ul>
                                {data.map(data =>
                                <li key={data.email}>
                                    {data.email}
                                    <br />
                                    <button onClick={this.send_snap} id={data.email} className="btn btn-success">Envoyer</button>
                                </li>)}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Snap;

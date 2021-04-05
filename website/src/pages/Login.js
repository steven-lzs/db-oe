import React from 'react';
import Axios from 'axios';
import logo from '../logo.svg';

function Login() {
    const first = () => {
        Axios.post('http://application.test/api/sayHi', {}).then(resp => {
            if(resp.status === 200){
                alert(resp.data.data);
            }
        });
    }
    return(
        <div className="h-full w-full text-center table">
            <div className="table-cell align-middle">
                <img src={logo} className="h-64 mx-auto" alt="logo" />
                Hi from me.
                <div>
                   <button onClick={first}>get response</button> 
                </div>
            </div>
        </div>
    )
}

export default Login;
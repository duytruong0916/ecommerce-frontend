import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
const Google = ({informParent =f =>f}) => {

    const responseGoogle = (response) => {
        console.log(process.env.REACT_APP_GOOGLECLIENTID);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: {idToken: response.tokenId}
        })
        .then(response=>{
            console.log("GOOGLE SIGNIN SUCCESS:", response)
            informParent(response);
        })
        .catch(err=>{
            console.log("GOOGLE SIGNIN ERROR:", err)
        })
      }
       
    return (
        <div>
            <GoogleLogin
                clientId='942121231116-hu0oi3knkr9ck61kv01c1qd2e1ogoics.apps.googleusercontent.com'
                buttonText="Login"
                autoLoad={false}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='button-card w-100 bg-success'><i class="fa fa-google mr-4 text-white" aria-hidden="true"></i>LOGIN WITH GOOGLE</button>
                  )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google;
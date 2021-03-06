import React, { useState, useEffect, Fragment } from 'react';
import { states } from '../core/UsState';
import { connect } from 'react-redux';
import { startSignUpWithEmail } from '../redux-store/actions/auth';
import axios from 'axios';
const SignUp = (props) => {
    const [data, setdata] = useState({
        firstname: "",
        lastname: '',
        password: '',
        confirmpassword: '',
        addressNumber: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        zipcode: '',
        error: false,
        success: false,
        errornotmatch: false,
    })
    const { firstname, lastname, success, addressNumber, city, state, email, phone, zipcode, password, confirmpassword, error, errornotmatch } = data;
    const onChangeHandler = name => (e) => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (!firstname || !lastname || !email || !password || !confirmpassword) {
            setdata({ ...data, error: 'Missing required fields' });
        } else if (password !== confirmpassword) {
            setdata({ ...data, errornotmatch: 'Passwords do not match' })
        } else {
            setdata({ ...data, error: '', errornotmatch: '' })
            let address = `${addressNumber}. ${city}, ${state}-${zipcode}`;
            axios({
                method: 'POST',
                url: `http://localhost:8000/api/signup`,
                data: { firstname, lastname, email, password, phone, address}
            })
                .then((response) => {
                    console.log(response.data.message)
                    setdata({ firstname: '', lastname: '', email: '', state: '', error: '', zipcode: '', city: '', addressNumber: '', password: '', confirmpassword: '', success: response.data.message });
                })
                .catch(error => {
                    console.log(error)
                    setdata({ ...data, error: error.response.data.error });
                })
        }
    }
    const ShowForm = () => (
        <div>
            <div className='page-header-title text-center'>Create An Account</div>
            <form onSubmit={onSubmit} onBlur={() => setdata({ ...data, error: '', errornotmatch: '', success: '' })}>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*First name:</span></div>
                            <input
                                className={`text-input w-100 ${error && !firstname ? 'missing-field' : ''}`}
                                type='text'
                                placeholder='First name'
                                value={firstname}
                                onChange={onChangeHandler('firstname')} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*Last name:</span></div>
                            <input
                                className={`text-input w-100 ${error && !lastname ? 'missing-field' : ''}`}
                                type='text'
                                value={lastname}
                                placeholder='Last name'
                                onChange={onChangeHandler('lastname')} />
                        </div>
                        <div className='w-50 mt-4'>
                            <div><span className="font-weight-bold">Phone:</span></div>
                            <input
                                className='text-input w-100'
                                type="text"
                                value={phone}
                                placeholder='+1( - - -) - - - - - - -'
                                onChange={onChangeHandler('phone')} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">Address:</span></div>
                            <div>
                                <input
                                    className='text-input w-100'
                                    type='text'
                                    value={addressNumber}
                                    placeholder='Address (OR PO BOX)'
                                    onChange={onChangeHandler('addressNumber')} />
                            </div>
                            <div >
                                <select onChange={onChangeHandler('state')} className='text-input w-50' value={state}>
                                    <option className='small'>STATE</option>
                                    {states.map((st, i) => (
                                        <option key={i} value={st}>{st}</option>
                                    ))}
                                </select>
                            </div>
                            <div >
                                <input
                                    className='text-input w-100'
                                    type='text'
                                    value={city}
                                    placeholder='City'
                                    onChange={onChangeHandler('city')} />
                            </div>
                            <div >
                                <input
                                    className='text-input w-100'
                                    type='text'
                                    value={zipcode}
                                    placeholder='Zipcode'
                                    onChange={onChangeHandler('zipcode')} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12'>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*Email:</span></div>
                            <input
                                className={`text-input w-100 ${error && !email ? 'missing-field' : ''}`}
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={onChangeHandler('email')} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*Password:</span></div>
                            <div>
                                <input
                                    className={`text-input w-100 ${error && !password || errornotmatch ? 'missing-field' : ''}`}
                                    type='password'
                                    value={password}
                                    placeholder='password'
                                    onChange={onChangeHandler('password')} />
                            </div>
                            <div className='mt-4'>
                                <div><span className="font-weight-bold">*Confirm password:</span></div>
                                <input
                                    className={`text-input w-100 ${error && !confirmpassword || errornotmatch ? 'missing-field' : ''}`}
                                    type='password'
                                    value={confirmpassword}
                                    placeholder='Confirm password'
                                    onChange={onChangeHandler('confirmpassword')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center text-danger'>
                    {error && (<div>{error}</div>)}
                    {!error && errornotmatch && (<div>{errornotmatch}</div>)}
                </div>
                <div className='text-center text-success'>
                    {success && (<div>{success}</div>)}
                </div>
                <div className='text-center mt-4'>
                    <button className="button-card mt-3 w-50 p-4 mb-5">SUBMIT</button>
                </div>
            </form>
        </div>
    )
    return (
        <div className='Signup-wrapper mx-auto py-5'>
            {ShowForm()}
        </div>

    )
}


const MapStateToProps = (state) => ({
    signupError: state.auth.authError,
    signupMessage: state.auth.message
})
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(startSignUpWithEmail(creds))
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(SignUp);
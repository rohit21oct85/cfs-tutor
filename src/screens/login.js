import React, {useState, useEffect, useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import  setLogin  from '../api/auth'
import {Link} from 'react-router-dom'

export default function Login(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const history = useHistory();

    async function submitForm(e){
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email === ''){
            setError("Please enter email address");
            return false;
        }else if(password === ''){
            setError("Please enter password");
            return false;
        }else{
            setLoading(true);
            const formData = {email: emailRef.current.value , password: passwordRef.current.value};
            const response = await setLogin(formData)
            if(response.status=== 401){
                setError("Email or password not matched");
                setLoading(false);
            }else{
                localStorage.setItem('tutor_token', response.data.accessToken)
                localStorage.setItem('tutor_refresh_token', response.data.refreshToken);
                localStorage.setItem('tutor_name', response.data.tutor.fullname);
                localStorage.setItem('tutor_email', response.data.tutor.email);
                localStorage.setItem('tutor_approve', response.data.tutor.approve);
                localStorage.setItem('tutor_id', response.data.tutor._id);
                localStorage.setItem('mastered-subject-id', response.data.tutor.master_sub_subject_id);
                console.log(response);
                if(response.data.tutor.approve == 1){
                    setLoading(false);
                    history.push('/dashboard');
                }else if((response.data.tutor.bank_details == '' || response.data.tutor.paypal == null) && response.data.tutor.paypal == '' ){
                    setLoading(false);
                    history.push('/profile-details/1');
                }else{
                    setLoading(false);
                    history.push('/profile-details/5');
                }
            }
        }    
    }

    useEffect( () => {
        let timer1 = setTimeout(() => setError(null), 2500);
        return () => {
        clearTimeout(timer1)
        }
    },[error]);

    return(
        <div className="container">
            <div className="row col-md-4" style={{ margin: '25vh auto' }}>
                <div className="card p-3">
                <h4 className="mt-1 mb-1">Login</h4>
                <hr className="mt-1 mb-2"/>
                <form onSubmit={submitForm}>
                    {error && (<p style={{ color: 'red', margin: '0px' }}>{error}</p>)}
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailRef}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordRef}/>
                    </div>
                    <div className="mb-3">
                    <button type="submit" className="btn btn-primary">{loading ? <span>signing in...</span> : 'Login'}</button>
                    <span style={{float:"right"}}><Link to="/signup" style={{textDecoration: "none"}}>SignUp</Link></span>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { helpRegistrationWorker } from '../authAPI/AuthAPI';
import * as Actions from '../../../redux/ActionCreators';

import '../RegistrationWorker/RegistrationWorkerPage.css';

function RegistrationWorkerPage() {

    const [messageFromServer, setMessageFromServer] = useState(null);
    const [hadRegistered, setHadRegistered] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [typeUser, setTypeUser] = useState();
    
    // const typeUser = useSelector(state => state.selectorRegType);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.setTypeOfUser('worker')) 
        setTypeUser('worker')
    }, []);
      
    const registrationWorker = (e) => {
        e.preventDefault(); setLoading(true); 

        const info = helpRegistrationWorker(e, typeUser);

        addDoc(info.fb.colRef, info.userToReg)
        .then(() => {
            createUserWithEmailAndPassword(info.fb.auth, info.userToReg.user, info.password)
            .then((msg) => {
                console.log('answer', msg);
                setMessageFromServer('Successfuly registered!');
                setTimeout(() => { setHadRegistered(true);}, 2000); // just to imitate
            })
            .catch(err => {
                setMessageFromServer(err.message);
                setLoading(false);
            })
        })
        .catch(err => {
            setMessageFromServer(err.message);
            setLoading(false);
        })
    }
    
    return hadRegistered ? <Redirect to={{pathname: '/login'}}/>
    :
    <> 
        <div className='registration-worker-page'>

            <div className='reg-for-worker'>
                <h1 className='reg-title'>Worker registration</h1>
                <form className='registration-form' name='registrationForm' onSubmit={(e) => registrationWorker(e)}>
                    <h2 className='msg-server'>{messageFromServer}</h2> {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                    <input type='email' name='email' placeholder={'type your email here'} className='registration-input' required/>
                    <input type='text' name='name' placeholder={'What is your name?'} className='registration-input' required/>
                    <input type='text' name='password' autoComplete={'true'} placeholder={'type your password here'} className='registration-input' required/>
                    <input type='text' name='profession' placeholder={'What is your profession?'} className='registration-input' required/>
                    <input type='submit' value={'Register'} className='registration-input'/>
                    <Link to={'/login'} className='btn-ihave'>I have account</Link>
                </form>
            </div>

        </div>
    </>

    
}

export default RegistrationWorkerPage;
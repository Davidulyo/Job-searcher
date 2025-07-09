import * as Actions from '../../../redux/ActionCreators';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import './LoginPage.css';
import { helpLogin } from '../authAPI/AuthAPI';
import { onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvfoiSybe8t501LbF8AoD8DwCNBNdnbmY",
    authDomain: "first-testing-9fede.firebaseapp.com",
    projectId: "first-testing-9fede",
    storageBucket: "first-testing-9fede.appspot.com",
    messagingSenderId: "142129088408",
    appId: "1:142129088408:web:499072fc62a4cbd5eb8ded",
  };

  initializeApp(firebaseConfig);

function LoginPage() {
    
    const [messageFromServer, setMessageFromServer] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const isLogged = useSelector(state => state.someoneLogged);
    const dispatch = useDispatch();
    
    const credsCheck = (e) => {
        e.preventDefault(); setIsLoading(true);

        const info = helpLogin(e);
        console.log(info);
        // if (info.userToCheck.infoOfUserThatLoggedIn === null) {
        //     setIsLoading(false);
        //     setMessageFromServer('Wrong creds');
        //     return;
        // }

        signInWithEmailAndPassword(info.fb.auth, info.userToCheck.email, info.userToCheck.password)
        .then((msg) => {
            onSnapshot(info.fb.q, (snapshot) => {                
                snapshot.forEach(doc =>{
                    info.userToCheck.infoOfUserThatLoggedIn = ({...doc.data(), id: doc.id})
                });
                localStorage.setItem('TOKEN', info.userToCheck.infoOfUserThatLoggedIn.id); // change to uid
                // console.log('TOKEN USED =', info.userToCheck.infoOfUserThatLoggedIn.id);
                dispatch(Actions.setProfile(info.userToCheck.infoOfUserThatLoggedIn));
                setMessageFromServer('You are logged in!');
                setTimeout(() => {dispatch(Actions.setSomeoneLogged(true));}, 2000);
            })
        })
        .catch(err => {
            setIsLoading(false)
            setMessageFromServer(err.message);
        })
    }

    return isLogged ? <Redirect to={{pathname: '/'}}/> 
    :
    <div className='login-page'>
        <div className='login-form-div'>
            <h1 className='log-title'>Login form</h1>
            {/* <p style={{backgroundColor: '#E0AE0A'}}> for example worker@work.work, worker!1</p> */}
            <form className='login-form' name='loginForm' onSubmit={(e) => credsCheck(e)}>
                <h2 className='msg-server'>{messageFromServer}</h2> 
                {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                <input type={'email'} name='email' placeholder={'type your email here'} className='login-input' required/>
                <input type={'password'} autoComplete={'true'} name='password' placeholder={'type your password here'} className='login-input' required/>
                <input type={'submit'} value={'Login'} className='login-input'/>
                <Link to={'/select-type'}>Have no account yet?</Link>
            </form>
        </div>

    </div>
}

export default LoginPage;
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'C:/Programmig Way/vsCodeForReact/train_react/src/components/Auth/RegistrationEmployer/RegistrationEmployer.css';
import { helpRegistrationEmployer } from '../authAPI/AuthAPI';
import { companySize } from '../../../data/jobsList';
import * as Actions from '../../../redux/ActionCreators';

function RegistrationEmployerPage() {

    const [messageFromServer, setMessageFromServer] = useState(null);
    const [hadRegistered, setHadRegistered] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [typeUser, setTypeUser] = useState();

    // const typeUser = useSelector(state => state.selectorRegType)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.setTypeOfUser('employer')) 
        setTypeUser('employer')
    }, []);

    const registrationEmployer = (e) => {
        e.preventDefault(); setLoading(true); 
        
        const info = helpRegistrationEmployer(e, typeUser);

        addDoc(info.fb.colRef, info.userToReg)
        .then(() => {
            createUserWithEmailAndPassword(info.fb.auth, info.userToReg.user, info.password)
            .then(() => {
                setTimeout(() => {setHadRegistered(true);}, 2000); // just to imitate
                setMessageFromServer('Successfully registered!');
            })
            .catch(err => {                    
                setMessageFromServer(err.message);
                setLoading(false);
            })
        }).catch(err => {
            setMessageFromServer(err.message);
            setLoading(false);
        })

    }

    return hadRegistered ? <Redirect to={{pathname: '/login'}}/>
    :
    <div className='registration-employer-page'>

        <div className='reg-for-employer'>
            <h1 className='reg-title'>Employer registration</h1>
            <form className='registration-form' name='registrationForm' onSubmit={(e) => registrationEmployer(e)}>
                <h2 className='msg-server'>{messageFromServer}</h2> {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                <label className='label'>Personal information</label>
                <input type='email' name='email' placeholder={'type your email here'} className='registration-input' required/>
                <input type='text' name='name' placeholder={'What is your name?'} className='registration-input' required/>
                <input type='text' name='password' autoComplete={'true'} placeholder={'type your password here'} className='registration-input' required/>
               
                <label className='label'>Company information</label>
                <input type='text' name='company' placeholder={'what the name of your company?'} className='registration-input' required/>
                
                <label className='label'>Company size</label>
                {/* <input type='number' name='companySize' placeholder={'what the size of your company?'} step='100' className='registration-input' required/> */}
                
                <select name="companySize" className="registration-input">
                    {companySize.map((size, i) => {
                        return <option className="opt-item" key={i+33} value={`${size}`}>{size}</option>
                    })}
                </select>

                <input type='text' name='companyUrl' placeholder={'company website'} className='registration-input' required/>
                <input type='text' name='companyLogoUrl' placeholder={'company logo url'} className='registration-input' required/>
                <input type='text' name='companyOffice' placeholder={'company main office(city)'} className='registration-input' required/>
                <input type='text' name='companyEmail' placeholder={'Corporate email(for applications)'} className='registration-input' required/>
                
                <textarea name='companyDescription' className='registration-input' cols={8}  placeholder='Company description'></textarea>

                <input type='submit' value={'Register'} className='registration-input'/>
                <Link to={'/login'}>I have account</Link>
            </form>
        </div>

    </div>
    
}

export default RegistrationEmployerPage;
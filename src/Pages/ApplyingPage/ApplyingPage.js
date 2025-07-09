import { arrayUnion, collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ThanksBtn from './components/ThanksBtn/ThanksBtn';
import * as Actions from '../../redux/ActionCreators'
import './ApplyingPage.css';

function ApplyingPage() {

    const db = getFirestore();
    
    const totalVacancies = useSelector(state => state.totalVacancies);
    const [totalVac, setTotalVac] = useState(totalVacancies);
    const [applySuccess, setApplySuccess] = useState(false);

    const [isLoading, setIsLoading] = useState();
    const [message, setMessage] = useState();

    
    const profile = useSelector(state => state.profile);

    const idd = profile.id;
    console.log(profile.id);
    const dispatch = useDispatch();

    const pickedVac = useSelector(state => state.pickedId);


    const onApplyHandler = async(e) => {
        e.preventDefault();

        // dispatch(Actions.setProfile(profile));
        // localStorage.setItem('TOKEN', idd);


        setIsLoading(true);

        let idResumeApply = e.target.searchSelectResume.value.trim();
        let coverLetter = e.target.coverLetter.value.trim();

        if ((idResumeApply == '' || coverLetter == '')){
            setMessage('error!')
            return;
        }

        let resumeApply = profile.resumes.find(res => res.idResume == idResumeApply);
        resumeApply = {...resumeApply, coverLetter: coverLetter}

/////////////
        // upd in totalUsers
        const colRef = collection(db, 'totalUsers');
        const docRef = doc(colRef, `${pickedVac.whoPostedId}`) // J4yrqBYvOn5I2sKgJmDg - id doc with totalVacancies || maybe to change id of doc to a variable
            
        let allVacEmployer = totalVac.filter(el => el.whoPostedId === pickedVac.whoPostedId) // all employees vacs
        let tmp = allVacEmployer.filter(el => el.idVacancy !== pickedVac.idVacancy) // get out picked vac of there
        let pickedVacUpd = {...pickedVac, applies: [...pickedVac.applies, resumeApply]}
        tmp.push(pickedVacUpd);

        console.log('tmp =', tmp);

        
        let res = await updateDoc(docRef, {
            vacancies: tmp,
        })
        .then(() =>{
            setMessage('Successfully applied!');
        })
        .catch(err => {
            setIsLoading(false);
            setMessage(err.message);
        })

////////////////

        const colRef1 = collection(db, 'totalVacancies');
        const docRef1 = doc(colRef1, `J4yrqBYvOn5I2sKgJmDg`)

        let updatedArrayAfterApllying = totalVac.filter( el => el.idVacancy !== pickedVac.idVacancy);

        let pickedVacUpdated = {...pickedVac, applies: [...pickedVac.applies, resumeApply]};

        updatedArrayAfterApllying.push(pickedVacUpdated);


        let res1 = await updateDoc(docRef1, {
            vacancies: updatedArrayAfterApllying,
        })
        .then(() =>{
            setTimeout(() => {
                // localStorage.setItem('TOKEN', idd);
                setApplySuccess(true);
            }, 2000)
            setMessage('Successfully applied!')
        })
        .catch((err) => {
            setIsLoading(false);
            setMessage(err.message);
        })
        setIsLoading(false);

        dispatch(Actions.setProfile(profile));
        localStorage.setItem('TOKEN', idd);
    }

    return applySuccess ? <Redirect to={{pathname: '/'}}/>
    :   
    <div className='applying-page'>
            <form name='applyForm' className='apply-form' onSubmit={(e) => onApplyHandler(e)}>
            {/* <button onClick={() => window.history.back()} className='profile-header-link back-btn'> back </button> */}

                <h1 className='msg-server'>{message}</h1>
                {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}

                <h1> You are applying to <span className='some-span'>{pickedVac.offeredPosition} </span>position </h1>

                <label className='add-vacancy-form-label'>Your cover letter: </label>
                <textarea name='coverLetter' className='coverLetter' cols={60} rows={10} required></textarea>

                <label className='add-vacancy-form-label'>Choose your resume: </label>
                <select name="searchSelectResume" className="search-form-item cr" required>
                    {profile.resumes && profile.resumes.map((resume, i) => {
                        return <option className="opt-item" key={i+44} value={resume.idResume}>{resume.desiredPosition}</option>
                    })}
                </select>

                <button type='submit' className='submitter profile-header-link back-btn'> send </button>

            </form>
    
                {/* <ThanksBtn/> */}
    </div>
}

export default ApplyingPage;

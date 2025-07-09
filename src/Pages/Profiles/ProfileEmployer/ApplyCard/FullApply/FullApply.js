import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getTotalResumes, getUserInfo } from '../../../../../MainAPI';
import * as Actions from '../../../../../redux/ActionCreators';
import './FullApply.css'

function FullApply() { // 

    console.log('im coming');
    let { url } = useRouteMatch();
    const id = url.split(`apply-`)[1];
    console.log(id);
    
    const [resume, setResume] = useState();

    const pickedApply = useSelector(state => state.pickedId)
    
    const dispatch = useDispatch();
    const token = localStorage.getItem('TOKEN');

    useEffect(() => {
        async function init() {
            if (token && !pickedApply){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
                
                let arTR = await getTotalResumes();
                dispatch(Actions.setTotalResumes(arTR));
            
                let res = arTR.find(el => el.idResume == id);
                console.log(arTR, res);
                setResume(res);
            }
        }
        init();
    }, []);

    return <>

        {pickedApply ? 
        <div className='full-apply'>
            <h1><span className='some-span'>{pickedApply.whoPostedName}</span> is looking for <span className='some-span'>{pickedApply.desiredPosition}</span> position</h1>
            <h1>Desired salary: <span className='some-span'>{pickedApply.desiredSalary}</span></h1>
            <h1>Years of expirience: <span className='some-span'>{pickedApply.expYears}</span></h1>
            <h1>Prof. level: <span className='some-span'>{pickedApply.profLevel}</span></h1>
            <h1>Language: <span className='some-span'>{pickedApply.language}</span></h1>
            <h1>Location: <span className='some-span'>{pickedApply.workerLocation}</span></h1>

            <hr style={{height: '2px', backgroundColor: 'black'}}/>

            <p className='apply-text'>
                <h2>Cover letter: </h2>
                <span>{pickedApply.coverLetter}</span>
            </p>

            <p className='apply-text'>
                <h2>Job expectations:</h2>
                <span>{pickedApply.aboutExp}</span>
            </p>

            <p className='apply-text'>
                <h2>About expirience:</h2>
                <span>{pickedApply.jobExpectations}</span>
            </p>

            <button onClick={() => window.history.back()} className='profile-header-link back-btn'> back </button>

        </div>
        :
        <div className='full-apply'>
            <h1>Looking for <span className='some-span'>{resume.desiredPosition}</span> position</h1>
            <h1>Desired salary: {resume.desiredSalary}</h1>
            <h1>Years of expirience: {resume.expYears}</h1>
            <h1>Prof. level: {resume.profLevel}</h1>
            <h1>Language: {resume.language}</h1>
            <h1>Location: {resume.workerLocation}</h1>

            <hr style={{height: '2px', backgroundColor: 'black'}}/>

            <p className='apply-text'>
                <h2>Cover letter: </h2>
                <span>{resume.coverLetter}</span>
            </p>

            <p className='apply-text'>
                <h2>Job expectations:</h2>
                <span>{resume.aboutExp}</span>
            </p>

            <p className='apply-text'>
                <h2>About expirience:</h2>
                <span>{resume.jobExpectations}</span>
            </p>

            <button onClick={() => window.history.back()} className='profile-header-link back-btn'> back </button>

        </div>}
    
    </>
}

export default FullApply;

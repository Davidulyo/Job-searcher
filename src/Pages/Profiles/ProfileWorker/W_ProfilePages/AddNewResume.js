import { getFirestore} from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jobsList, { employmentType, languages, locations, profLevel } from "../../../../data/jobsList";
import * as Actions from '../../../../redux/ActionCreators';
import {sendInTotalResumes, helpAddNewResume, sendNewResume} from '../../ProfilesAPI/W_Functions/W_Functions'

const db = getFirestore();


function AddNewResume() {

    const [isLoading, setIsLoading] = useState(false);
    const [messageFromServer, setMessageFromServer] = useState('');

    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const addNewResume = (e) => {
        e.preventDefault(); setIsLoading(true);

        const newResume = helpAddNewResume(e, profile); // helpfuncsAPI

        sendNewResume(newResume, db, profile) // 1 action in totalUsers/resumes and Redux
        .then(() => {
            dispatch(Actions.updateResumes(newResume));
            setMessageFromServer('Successfuly add to your remuses');
        })
        .catch(err => {
            setIsLoading(false);
            setMessageFromServer(err.message);
        })
    //////////
        sendInTotalResumes(newResume, db) // 2 action in totalResumes
        .then(() => {
            setIsLoading(false);
            setMessageFromServer('Successfuly add to your remuses');
        })        
        .catch(err => {
            setIsLoading(false);
            setMessageFromServer(err.message);
        })

    }



    return <>


        {/* <h2 className='msg-server'>{messageFromServer}</h2> 
        {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>} */}
        

        <form className="add-new-resume-form" name="addNewResumeForm" onSubmit={(e) => addNewResume(e)}>

            <label name='position' className="add-resume-form-label">Desired position *</label>
            <select name="position" className="selector-position add-resume-form-item" required>
                {jobsList.map((job, i) => {
                    return <option className="opt-item" key={i+77} value={`${job}`}>{job}</option>
                })}
            </select>

            <label name='prof-level' className="add-resume-form-label">Prof level *</label>
            <select name="profLevel" className="selector-level add-resume-form-item" required>
                {profLevel.map((level, i) => {
                    return <option className="opt-item" key={i+66} value={`${level}`}>{level}</option>
                })}
            </select>

            <label name='salary' className="add-resume-form-label">Desired salary per month $ *</label>
            <input type={'number'} step='100' name="salary" className=" add-resume-form-item" required/>

            <label name='employment-type' className="add-resume-form-label">Type of employment *</label>
            <select name="employmentType" className="employment-type add-resume-form-item" required>
                {employmentType.map((type, i) => {
                    return <option className="employment-type-item" key={i+66} value={`${type}`}>{type}</option>
                })}
            </select>
            
            <label name='workerLocation' className="add-resume-form-label">Your location *</label>
            <select name="workerLocation" className="worker-location add-resume-form-item" required>
                {locations.map((location, i) => {
                    return <option className="worker-location-item" key={i+66} value={`${location}`}>{location}</option>
                })}
            </select>

            <label name='expYears' className="add-resume-form-label">Years of expirience *</label>
            <input type={'number'} step='0.5' name="expYears" className="add-resume-form-item" required/>

            <label name='language' className="add-resume-form-label">Language *</label>
            <select name="language" className="worker-language add-resume-form-item" required>
                {languages.map((lang, i) => {
                    return <option className="worker-language-item" key={i+66} value={`${lang}`}>{lang}</option>
                })}
            </select>

            <label name='tellAboutExp' className="add-resume-form-label">Tell more about your expirience: *</label>
            <textarea name="tellAboutExp" className="add-resume-form-textarea" cols={'8'} rows='10' required></textarea>

            <label name='jobExpectations' className="add-resume-form-label">Tell about your job expectations: *</label>
            <textarea name="jobExpectations" className="add-resume-form-textarea" cols={'8'} rows='10' required></textarea>
            
            {messageFromServer && <h2 className='msg-server'>{messageFromServer}</h2>}
            <div style={{textAlign: 'center'}}>
                {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
            </div>
            
            <input type={'submit'} name='submitter' value='Send'className="submitter"/>
        </form>

    
    </>;
}

export default AddNewResume;
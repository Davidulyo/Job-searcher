import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../../../../redux/ActionCreators';
import { deleteResumeFromUsersProfile, deleteResumeFromTotalResumes, helpDeleteResume } from "../../ProfilesAPI/W_Functions/W_Functions";

function FullResumeCard({pickedResume}) {

    console.log(pickedResume);
    const [isLoading, setIsLoading] = useState(false);
    const [MessageFromServer, setMessageFromServer] = useState('');

    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const deleteResume = () => {
        setIsLoading(true);

        const updatedArrayResumes = helpDeleteResume(profile, pickedResume); // just organized

        deleteResumeFromUsersProfile(profile, updatedArrayResumes) // 1 action in totalUsers/resumes and Redux
        .then(() => {
            dispatch(Actions.updateAfterDeletingFromResumes(updatedArrayResumes));
            setIsLoading(false);
            setMessageFromServer('successfully deleted!')
        })
        .catch(err => {
            setIsLoading(false);
            setMessageFromServer(err.message)
        })
    //////////
        deleteResumeFromTotalResumes(updatedArrayResumes) // 2 action in totalResumes
        .then(() => {
            setIsLoading(false);
            setMessageFromServer('successfully deleted!')
        })
        .catch(err => {
            setIsLoading(false);
            setMessageFromServer(err.message)
        })
        
    }

    return <div className='full-resume-card'>

        <h2>{MessageFromServer}</h2> 
        {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}

        <h1>Desired position: {pickedResume.desiredPosition}</h1>
        <h1>Desired salary: {pickedResume.desiredSalary}</h1>
        <h1>Your years of expirience: {pickedResume.expYears}</h1>
        <h1>Prof. level: {pickedResume.profLevel}</h1>
        <h1>Your language: {pickedResume.language}</h1>
        <h1>Your location: {pickedResume.workerLocation}</h1>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px'}}>
            <button className='profile-header-link' onClick={() => deleteResume()}>Delete</button>
            <button className='profile-header-link'>Edit</button>
        </div>
        

    
    </div>
}

export default FullResumeCard;

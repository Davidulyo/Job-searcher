import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../MainAPI";
import FullResumeCard from "../ResumeCard/FullResumeCard";
import ShortResumeCard from "../ResumeCard/ShortResumeCard";
import * as Actions from '../../../../redux/ActionCreators';

function MyResumes(props) {

 
    const profile = useSelector(state => state.profile);
    const idResume = useSelector(state => state.pickedId);
    const pickedResume = profile.resumes.find(el => el.idResume === idResume);

    const dispatch = useDispatch();
    

    const token = localStorage.getItem('TOKEN');


    useEffect(() => {
        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
            }
        }
        init();
    }, []);

    return <div className="my-resume-section">
    
    <div className="short-resumes-part">
        <h1>My resumes:</h1>
        {profile.resumes.map((el, i) => <ShortResumeCard key={i+22} props={props} resume={el} />)}
    </div>

        {pickedResume && <FullResumeCard pickedResume={pickedResume}/>}

    </div>;
}

export default MyResumes;
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ProfilesHeader from "../ProfilesHeader/ProfilesHeader";
import AddNewResume from "./W_ProfilePages/AddNewResume";
import MyProfileWorker from "./W_ProfilePages/MyProfileWorker";
import MyResumes from "./W_ProfilePages/MyResumes";
import { useSelector } from "react-redux";
import FullResumeCard from "./ResumeCard/FullResumeCard";
import './ProfileWorkerPage.css';

function ProfileWorkerPage() {

    let { path, url } = useRouteMatch();
    const isLogged = useSelector(state => state.someoneLogged);
    const pickedId = useSelector(state => state.pickedId)

    
    return isLogged ? <div className="profile-worker-page">
        
        <ProfilesHeader/>

        <Switch>
            <Route path={`${url}/my-profile`} component={MyProfileWorker}/>
            <Route path={`${url}/add-new-resume`} component={AddNewResume}/>
            <Route path={`${url}/my-resumes`} component={MyResumes}/>
            <Route path={`${url}/:id`} children={<FullResumeCard pickedResume={pickedId}/>}/>

        </Switch>


    </div>
    :
    <Redirect to={{pathname: '/login'}}/>
}

export default ProfileWorkerPage;



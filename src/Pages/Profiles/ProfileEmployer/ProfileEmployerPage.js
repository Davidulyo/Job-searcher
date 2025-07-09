import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ProfilesHeader from "../ProfilesHeader/ProfilesHeader";
import E_AddNewVacancy from "./E_ProfilePages/E_AddNewVacancy";
import E_MyProfile from "./E_ProfilePages/E_MyProfile";
import E_MyVacancies from "./E_ProfilePages/E_MyVacancies";
import FullVacancyCard from "./VacancyCard/FullVacancyCard";
import FullApply from "./ApplyCard/FullApply/FullApply";
import './ProfileEmployerPage.css';

function ProfileEmployerPage() {

    let { path, url } = useRouteMatch();
    console.log(url);

    const isLogged = useSelector(state => state.someoneLogged);
    const pickedId = useSelector(state => state.pickedId)

    return isLogged ? <div className="profile-employer-page">

        <ProfilesHeader/>

        <Switch>
            {/* <Route path={`${url}/my-profile/apply-:id`} children={<FullApply />}/> */}
            <Route path={`${url}/my-profile`} component={E_MyProfile}/>
            <Route path={`${url}/add-new-vacancy`} component={E_AddNewVacancy}/>
            <Route path={`${url}/my-vacancies`} component={E_MyVacancies}/>
        </Switch>
    </div>
    :
    <Redirect to={{pathname: '/login'}}/>
}


export default ProfileEmployerPage;




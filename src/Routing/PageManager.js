import { Route, Switch } from "react-router-dom";
import LoginPage from "../components/Auth/LoginPage/LoginPage";
import Select from "../Pages/SelectPage/Select";
import AccessDeniedPage from "../Pages/GeneralPages/AccessDeniedPage";
import { useSelector } from "react-redux";
import ProfileWorkerPage from "../Pages/Profiles/ProfileWorker/ProfileWorkerPage";
import ProfileEmployerPage from "../Pages/Profiles/ProfileEmployer/ProfileEmployerPage";
import RegistrationWorkerPage from "../components/Auth/RegistrationWorker/RegistrationWorkerPage";
import RegistrationEmployerPage from "../components/Auth/RegistrationEmployer/RegistrationEmployerPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import Vacancypage from "../Pages/VacancyPage/Vacancypage";
import FindJobPage from "../Pages/FindJobPage/FindJobPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import ApplyingPage from "../Pages/ApplyingPage/ApplyingPage";
import './PageManager.css';
import NotFound from "../Pages/NotFound/NotFound";
import App from "../Pages/Game/src_memoryCard_v2/Game";
import Game from "../Pages/Game/src_memoryCard_v2/Game";


function PageManager() {

    const profile = useSelector(state => state.profile);
    const pickedId = useSelector(state => state.pickedId)

    return <>

        <Switch>
            <Route path='/registration-employer' component={RegistrationEmployerPage}/>
            <Route path='/registration-worker' component={RegistrationWorkerPage}/>
            <Route path='/accessdenied' component={AccessDeniedPage}/>
            <Route path='/select-type' component={Select}/> {/* Could rewrite to change the selectType by changing in address */}
            <Route path='/salaries' component={NotFound}/>
            <Route path='/events' component={NotFound}/>
            <Route path={`/profile-${profile.typeUser}`} component={profile.typeUser === 'worker' ? ProfileWorkerPage : ProfileEmployerPage}/>
            <Route path='/applying' component={ApplyingPage}/>
            <Route exact path='/find-job' component={FindJobPage}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/game' component={Game}/>

            <Route exact path='/' component={SearchPage}/>


            <Route path={'/vacs/:id'} children={<Vacancypage />}/>
            <Route path={'/company/:title'} children={<CompanyPage />}/>

        </Switch>

    </>;
}

export default PageManager;
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ApplyCard from "../ApplyCard/ApplyCard";
import FullApply from "../ApplyCard/FullApply/FullApply";
import Up from "./Up";

function E_MyProfile() {

    let { url } = useRouteMatch();

    const profile = useSelector(state => state.profile);
    const pickedApply = useSelector(state => state.pickedId);

    return <div className="my-profile-page">
        {/* <h1>Your email: {profile.user}</h1>
        <h1>Your company is: {profile.companyOf}</h1>
        <hr/>
        <h2>Applies: </h2>
        <ApplyCard profile={profile}/> */}

        <Switch>
            <Route path={`${url}/apply-:id`} children={<FullApply/>}/>
            <Route path={`${url}`} component={Up}/>
        </Switch>



    </div>;
}

export default E_MyProfile;

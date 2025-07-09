import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const RouteForEmployers = ({component: Component}) => {

    const isLoggedIn = useSelector(state => state.someoneLogged);
    const typeUser = useSelector(state => state.profile.typeUser);


    return (
        <Route
          render={props => (isLoggedIn && typeUser ==='employer') ? 
          <Component {...props} /> : <Redirect to={{pathname: "/accessdenied"}}/>}
        />
      );

}

export default RouteForEmployers;
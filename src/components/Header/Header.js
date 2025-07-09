import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import {getUserInfo } from "../../MainAPI";
import * as Actions from '../../redux/ActionCreators'
import './Header.css';

function Header() {


    const isLogged = useSelector(state => state.someoneLogged);
    const profile = useSelector(state => state.profile);
    // const [prof, setProf] = useState();
    

    const token = localStorage.getItem('TOKEN');

    const dispatch = useDispatch();

    useEffect(() => {
        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                dispatch(Actions.setSomeoneLogged(true))
            }
            // setProf(await getUserInfo(token));

        }
        init();
    }, []);

    const logout = () => {
        // const auth = getAuth();
        signOut(auth)
        .catch(err => {
            console.log(err.message);
        })
        localStorage.removeItem('TOKEN');
        dispatch(Actions.logOut());
    }

    return <>
        <nav className="header">
            <Link to={'/'}><img src='https://first-testing-9fede.web.app/pics/clocks.jpg' alt="logo" className="header-logo"/></Link>
            <NavLink to={'/find-job'} className="header-link">Find job</NavLink>
            <NavLink to={'/salaries'} className="header-link">Salaries</NavLink>
            <NavLink to={'/events'} className="header-link">Events</NavLink>

            {/* {profile.typeUser === 'employer' && <NavLink to={'/workers'} className="header-link">Workers</NavLink>} */}
            {/* {profile.typeUser === 'worker' && <NavLink to={'/vacancy'} className="header-link">Vacancies</NavLink>} */}
            {/* {isLogged && <NavLink to={`/profile-:x`} className="header-link">Profile</NavLink>} */}
            
            {isLogged && <NavLink to={`/profile-${profile.typeUser}`} className="header-link">Profile</NavLink>}

            {isLogged ? <NavLink to={'/'}><button className="header-link logout" onClick={() => logout()}>Log out</button></NavLink> 
            : 
            <NavLink to={'/login'} className={'header-link'}>Login</NavLink>}
        </nav>
    </>
}

export default Header;
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ProfilesHeader.css';

function ProfilesHeader() {

    const typeUser = useSelector(state => state.profile.typeUser);

    return <div className="left-side">
        <nav className="profiles-header">
            {typeUser === 'worker' && <NavLink to={'/profile-worker/my-profile'} className='profile-header-link'>My Profile</NavLink>}
            {typeUser === 'worker' && <NavLink to={'/profile-worker/add-new-resume'} className='profile-header-link'>Add resume</NavLink>}
            {typeUser === 'worker' && <NavLink to={'/profile-worker/my-resumes'} className='profile-header-link'>My resumes</NavLink>}

            {typeUser === 'employer' && <NavLink to={'/profile-employer/my-profile'} className='profile-header-link'>My Profile</NavLink>}
            {typeUser === 'employer' && <NavLink to={'/profile-employer/add-new-vacancy'} className='profile-header-link'>Add new vacancy</NavLink>}
            {typeUser === 'employer' && <NavLink to={'/profile-employer/my-vacancies'} className='profile-header-link'>My vacancies</NavLink>}
        
            {/* <nav>
                <ul>
                    {typeUser === 'worker' && <li><span><NavLink to={'/profile-worker/my-profile'} className='profile-header-link'>My Profile</NavLink></span></li>}
                    {typeUser === 'worker' && <li><span><NavLink to={'/profile-worker/add-new-resume'} className='profile-header-link'>Add resume</NavLink></span></li>}
                    {typeUser === 'worker' && <li><span><NavLink to={'/profile-worker/my-resumes'} className='profile-header-link'>My resumes</NavLink></span></li>}
                
                    {typeUser === 'employer' && <li><span><NavLink to={'/profile-employer/my-profile'} className='profile-header-link'>My Profile</NavLink></span></li>}
                    {typeUser === 'employer' && <li><span><NavLink to={'/profile-employer/add-new-vacancy'} className='profile-header-link'>Add new vacancy</NavLink></span></li>}
                    {typeUser === 'employer' && <li><span><NavLink to={'/profile-employer/my-vacancies'} className='profile-header-link'>My vacancies</NavLink></span></li>}
                
                </ul>
            </nav> */}

        </nav>


    </div>;
}

export default ProfilesHeader;
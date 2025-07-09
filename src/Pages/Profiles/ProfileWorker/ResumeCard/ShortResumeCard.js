import { useDispatch } from 'react-redux'
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators';

function ShortResumeCard({resume}) {

    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
        
    return <>
        <div className="resume-card">
            <NavLink className={'show-more'} to={`${url}/${resume.idResume}`} onClick={() => dispatch(Actions.pickId(resume.idResume))}>
                <h1>{resume.desiredPosition}</h1>
                <h2>{resume.desiredSalary}</h2>
            </NavLink>

            {/* <button onClick={() => dispatch(Actions.pickId(resume.idResume))}>Show more</button> */}
            {/* <Link to={`${url}/${resume.idResume}`} onClick={() => dispatch(Actions.pickId(resume.idResume))}>Show more</Link> */}
            
        </div>
    </>
}

export default ShortResumeCard;

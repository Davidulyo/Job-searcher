import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators';
import './VacancyHeader.css';

function VacancyHeader({vacancy}) {

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);

    // console.log('typeUser: ', profile.typeUser === 'employer' || 'undefined');
    return <div className='vacancy-header'>

        <div className='vacancy-header-left'>
            <h1>{vacancy.offeredPosition}</h1>
            <h3>{vacancy.postedByCompany.companyOf}</h3>
    
            {profile.typeUser === 'worker' ? <Link to={'/applying'} onClick={() => dispatch(Actions.pickId(vacancy))} className='apply-btn'>Apply</Link>
            :
            <Link to={'/registration-worker'} className='apply-btn' onClick={() => dispatch(Actions.pickId(vacancy))}>Apply</Link>}

            {/* <Link to={'/applying'} className='apply-btn' onClick={() => dispatch(Actions.pickId(vacancy))}>Apply</Link> */}

        </div>

        <div className='vacancy-header-right'>
            <h2>
                {vacancy.profLevel}
            </h2>
            <h2>
                {vacancy.desiredEmploymentType}
            </h2>
            <h2>
                {vacancy.offeredSalary}
            </h2>
                
            <h2>
                {vacancy.workLocation}
            </h2>
            
        </div>
    
    </div>
}

export default VacancyHeader;

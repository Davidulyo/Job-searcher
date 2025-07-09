import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators';
import { blocksParser } from '../../../PagesAPI/PagesAPI';
import './InfoList.css';

function InfoList({vacancy}) {
    
    const profile = useSelector(state => state.profile);

    const dispatch = useDispatch();
    
    return <div className='info-list'>
    
       <div className='info-block'>
            {vacancy.blocks.companyDescription}
        </div>

        <h2>What kind of professional are we looking for?</h2>
        <div className='info-block'>
            {/* {vacancy.blocks.whoAreYouLooking} */}
            {blocksParser(vacancy.blocks.whoAreYouLooking)}

        </div>

        <h2>For which tasks (responsibilities)?</h2>
        <div className='info-block'>
            {/* {vacancy.blocks.forWhichTasks} */}

            {blocksParser(vacancy.blocks.forWhichTasks)}
        </div>  

        <h2>Why do we enjoy working here?</h2>
        <div className='info-block'>
            {/* {vacancy.blocks.whatConditions} */}
            {blocksParser(vacancy.blocks.whatConditions)}

        </div>
        <hr/>
        <h2 className='how-many-applies'>Already applied to this job: <span className='vac-num num'>{vacancy.applies.length}</span></h2>

        {profile.typeUser === 'worker' ? <Link to={'/applying'} onClick={() => dispatch(Actions.pickId(vacancy))} className='apply-btn'>Apply</Link>
        :
        <Link to={'/registration-worker'} className='apply-btn' onClick={() => dispatch(Actions.pickId(vacancy))}>Apply</Link>}

    </div>
}

export default InfoList;

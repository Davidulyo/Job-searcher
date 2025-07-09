import { useDispatch } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators';

function ShortVacancyCard({vacancy}) {

    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
        
    return <>
        <div className="vacancy-card">
        <Link to={`${url}/${vacancy.idVacancy}`} onClick={() => dispatch(Actions.pickId(vacancy.idVacancy))}>
            <h1>{vacancy.offeredPosition}</h1>
            <h2>{vacancy.offeredSalary}</h2>
        </Link>

            {/* <button onClick={() => dispatch(Actions.pickId(vacancy.idVacancy))}>Show more</button> */}
            {/* <Link to={`${url}/${vacancy.idVacancy}`} onClick={() => dispatch(Actions.pickId(vacancy.idVacancy))}>go</Link> */}
            {/* <Link to={`${url}/${vacancy.idVacancy}`} onClick={() => dispatch(Actions.pickId(vacancy.idVacancy))}>go</Link> */}
        </div>
    </>
}

export default ShortVacancyCard;

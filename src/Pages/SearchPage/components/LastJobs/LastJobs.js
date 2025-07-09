import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators';
import Carousel from 'carousel-react-rcdev';

import './LastJobs.css';

function LastJobs({totalVacancies}) {

    const dispatch = useDispatch();

    return <>
        <h2>New jobs</h2>
                <Carousel>
            <div className='last-jobs-box'>
                {totalVacancies.reverse().map((el, i) => {
                    return <div key={i+99} className='last-job-card'>
                        <div className='left-last'>
                            <Link to={`/vacs/${el.idVacancy}`} onClick={() => dispatch(Actions.pickId(el.idVacancy))}>
                                <img src={`${el.postedByCompany.companyLogoUrl}`} alt='comp-logo' className='job-logo'/>
                            </Link>
                        </div>
                        <hr/>
                        <div className='right-last'>
                        <Link to={`/vacs/${el.idVacancy}`} onClick={() => dispatch(Actions.pickId(el.idVacancy))}>
                                <h3>{el.offeredPosition}</h3>
                            </Link>
                            <h4>{el.profLevel}</h4>
                            <h4>{el.workLocation}</h4>
                        </div>
                    </div>
                })}
            </div>
        </Carousel>

    </>
}

export default LastJobs;

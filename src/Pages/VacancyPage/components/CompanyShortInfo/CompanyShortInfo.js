import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './CompanyShortInfo.css';

function CompanyShortInfo({vacancy}) {

    const dispatch = useDispatch();


    return <div className='company-short-info'>
        
        <Link  className='logo-comany-short'  to={`/company/${vacancy.postedByCompany.companyOf}`}>
            <img className='logo-comany-short' src={`${vacancy.postedByCompany.companyLogoUrl}`}/>
        </Link>
        {/* <h2>{vacancy.postedByCompany.companyOf}</h2> */}
        <h2>Company size: {vacancy.postedByCompany.companySize}</h2>
        <h2><a href={`${vacancy.postedByCompany.companyUrl}`} target={'_blank'}>Company website</a></h2>
        <hr/>
        <h3>
            <Link to={`/company/${vacancy.postedByCompany.companyOf}`}>
                View all vacancies of this company
            </Link>
        </h3>
            
    </div>
}

export default CompanyShortInfo;

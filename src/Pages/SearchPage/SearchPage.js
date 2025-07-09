import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jobsList, { locations } from "../../data/jobsList";
import Select from "../SelectPage/Select";
import { buildLastJobs, buildResults, calcPartnersesVacancies, handleArrows, helpSearchResult } from "../PagesAPI/PagesAPI";
import * as Actions from '../../redux/ActionCreators';
import { getTotalResumes, getTotalVacancies } from "../../MainAPI";
import LastJobs from "./components/LastJobs/LastJobs";
import Partners from "./components/Partners/Partners";
import { Redirect } from "react-router-dom";
import Carousel from 'carousel-react-rcdev'
import './SearchPage.css';


function SearchPage() {

    // const [searchResults, setSearchResults] = useState([]);
    // const [searchMessage, setSearchMessage] = useState('');
    const [partners, setPartners] = useState([]);
    const [lastVacancies, setLastVacancies] = useState([]);

    // document.getElementById('prev').childNodes.img.src = '';
    // document.getElementById('next').src = '';

    const [findClicked, setFindClicked] = useState(false);

    const isLogged = useSelector(state => state.someoneLogged);

    const dispatch = useDispatch();

    useEffect(() => {
        async function init() {
            let partners = await calcPartnersesVacancies()
            setPartners(partners);

            let arTV = await getTotalVacancies();
            dispatch(Actions.setTotalVacancies(arTV));
            setLastVacancies(arTV)

            handleArrows();
        }
        init();
    }, []);

    const findHandler = (e) => {

        dispatch(Actions.setSearchSettings({
            jobTitle: e.target.searchSelectJob.value,
            jobLocation: e.target.searchSelectLocation.value,
        }))

        setFindClicked(true);
    }

    return findClicked ? <Redirect to={{pathname: '/find-job'}}/>
    : 
    <div className="search-page">

        <section className="search-page-upsearch">
            

            <div className="search-page-intro">
                <h1>HI-TECH JOBS - best way to find what you want!</h1>
                <p>For professionals - 4300 vacancies from 2200 companies on the platform.
                For companies - free publications of vacancies in unlimited quantity!</p>
            </div>

            <form name="search-form" onSubmit={(e) => findHandler(e)}>
                <select name="searchSelectJob" className="search-form-item">
                    {jobsList.map((job, i) => {
                        return <option className="opt-item" key={i+77} value={`${job}`}>{job}</option>
                    })}
                </select>
                <select name="searchSelectLocation" className="search-form-item">
                    {locations.map((loc, i) => {
                        return <option className="opt-item" key={i+44} value={`${loc}`}>{loc}</option>
                    })}
                </select>
                <button type="submit" name="submitter" className="search-form-item">Find</button>


            </form>

        </section>

        <section className="search-page-our-partners">
            {partners.length > 0 && <Partners partners={partners}/>}
        </section>

        <section className="search-page-last-jobs">
            {lastVacancies.length > 5 && <LastJobs totalVacancies={lastVacancies}/>}
        </section>

        {!isLogged && <section className="search-page-offer-to-register">
            <Select/>
        </section>}


    
    </div>

}

export default SearchPage;
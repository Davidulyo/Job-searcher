import { useEffect } from 'react';
import jobsList, { locations } from '../../../../data/jobsList';
import './Searcher.css';

function Searcher({findHandler, searchSettings}) {

    useEffect(() => {
        if (searchSettings !== null) {
            document.forms.searchForm.searchSelectJob.value = searchSettings.jobTitle;
            document.forms.searchForm.searchSelectLocation.value = searchSettings.jobLocation;
        }
    }, []);

    return <>
    
        <form name="searchForm" onSubmit={(e) => findHandler(e)} className='searcher-form'>
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
    
    </>
}

export default Searcher;

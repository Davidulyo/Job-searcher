import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firstSearchResult, helpSearchResult } from '../PagesAPI/PagesAPI';
import FindResults from './components/FindResults/FindResults';
import * as Actions from '../../redux/ActionCreators';
import Searcher from './components/Searcher/Searcher';
import './FindJobPage.css';
import JoinUs from '../VacancyPage/components/JoinUs/JoinUs';



function FindJobPage() {

    const [searchResults, setSearchResults] = useState([]);
    const [searchMessage, setSearchMessage] = useState('');

    const totalVacancies = useSelector(state => state.totalVacancies);
    const settings = useSelector(state => state.searchSettings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.setSearchSettings(null))
        if(settings){
            let res = firstSearchResult(settings, totalVacancies);
            
            if (res.length > 0) {
                setSearchMessage(null)
                setSearchResults(res);
            } else {
                setSearchResults(null);
                setSearchMessage('No results found')
            }
        }

    }, []);

    const findHandler = (e) => {

        let res = helpSearchResult(e, totalVacancies);

        if (res.length > 0) {
            setSearchMessage(null)
            setSearchResults(res);
        } else {
            setSearchResults(null);
            setSearchMessage('No results found')
        }
    }

    return <>
        <div className='find-job-page'>

        <div>
            <Searcher findHandler={findHandler} searchSettings={settings}/>
            <br/>
            <br/>

            <JoinUs/>
        </div>

            <section className='find-jobs-results'>


                <div className='find-jobs-box'>
                    {searchResults && <FindResults searchResults={searchResults}/>} 
                    <h1>{searchMessage}</h1>           
                </div>

            </section>
            
        </div>
    
    </>
}

export default FindJobPage;

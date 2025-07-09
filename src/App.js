import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PageManager from "./Routing/PageManager";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from './redux/ActionCreators';
import { getTotalResumes, getTotalVacancies, getUserInfo } from "./MainAPI";
import './App.css';

function App() {

    const dispatch = useDispatch();
    
    useEffect(() => {
        async function init() {
            const token = localStorage.getItem('TOKEN');
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)));
                dispatch(Actions.setSomeoneLogged(true))

                let arTR = await getTotalResumes();
                dispatch(Actions.setTotalResumes(arTR));

                let arTV = await getTotalVacancies();
                dispatch(Actions.setTotalVacancies(arTV));
            }

            // let arTR = await getTotalResumes();
            // dispatch(Actions.setTotalResumes(arTR));
            // console.log(arTR);

            // let arTV = await getTotalVacancies();
            // dispatch(Actions.setTotalVacancies(arTV));
            // console.log(arTV);
        }
        init();
            
    }, []);

    return <div className="app">

        <Header/>

        <div className="page-content"> 
            <PageManager/>
        </div>
        
        <Footer/>
    </div>;
}

export default App;
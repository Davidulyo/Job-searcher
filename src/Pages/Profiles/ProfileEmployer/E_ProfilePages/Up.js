import * as Actions from '../../../../redux/ActionCreators'
import { useDispatch, useSelector } from 'react-redux';
import ApplyCard from '../ApplyCard/ApplyCard';
import { getUserInfo } from '../../../../MainAPI';
import { useEffect, useState } from 'react';

function Up() {

    // const profile = useSelector(state => state.profile);

    const [profileHere, setProfileHere] = useState();
    const dispatch = useDispatch();

    const token = localStorage.getItem('TOKEN');

    useEffect(() => {
        async function init() {
            if (token){
                dispatch(Actions.setProfile(await getUserInfo(token)))
                setProfileHere(await getUserInfo(token));
                dispatch(Actions.setSomeoneLogged(true))
            }

        }
        init();
    }, []);

    return profileHere && <div className='up-main'>
        <div className='up-header'>
            <h1>Profile</h1>
        </div>
        <div className='up-up'>
            <li>Email: <span className='some-span and'>{profileHere.user}</span></li>
            <li>User: <span className='some-span and'>{profileHere.name}</span></li>
            <li>Your company: <span className='some-span and'>{profileHere.companyOf}</span></li>
        </div>
        <hr style={{height: '2px', backgroundColor: 'black'}}/>
        <h1>Applies: </h1>
        <ApplyCard profile={profileHere}/>
    
    </div>
}

export default Up;

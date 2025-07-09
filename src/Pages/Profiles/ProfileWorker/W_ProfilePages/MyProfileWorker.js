import { useSelector } from "react-redux";

function MyProfileWorker() {

    const profileInfo = useSelector(state => state.profile);

    return <div className="my-profile-page">
        <div className="up-header">
            <h1>Profile</h1>
        </div>

        <div className="up-up">
            <h1 className="hh">Your email: <span className='some-span'>{profileInfo.user}</span></h1>
            <h1 className="hh">Your profession: <span className='some-span'>{profileInfo.profession}</span></h1>
        </div>

        <hr style={{height: '2px', backgroundColor: 'black'}}/>


    </div>
}

export default MyProfileWorker;
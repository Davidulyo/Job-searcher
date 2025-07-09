import { Link } from "react-router-dom";

function AccessDeniedPage() {
    return <>
    
        <h1>Access denied. You need to login</h1>
        <Link to={'/login'} className={'header-link'} style={{color: 'red', backgroundColor: 'blue', height: '60px'}}>Login</Link>

    </>;
}

export default AccessDeniedPage;
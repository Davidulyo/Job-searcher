import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import './Footer.css';

function Footer() {

    const profile = useSelector(state => state.profile);

    return <nav className="footer">
        
        <div className="grid-col">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <h1 className="footer-header">TECH JOBS</h1>
                <img src="https://first-testing-9fede.web.app/pics/littleMarks/loop.png" className="img-footer"/>
            </div>
            <Link to={'/'} className={'footer-link'}>Terms and conditions</Link>
            <Link to={'/'} className={'footer-link'}>Privacy Policy</Link>
            <Link to={'/'} className={'footer-link'}>Contact Us</Link>
        </div>
        <div className="grid-col">
            <h1 className="footer-header">For professionals:</h1>
            <Link to={'/find-job'} className={'footer-link'}>Find job</Link>
        </div>
        <div className="grid-col">
            <h1 className="footer-header">For employers:</h1>
            {profile.typeUser === 'employer' ? <Link to={'/profile-employer/add-new-vacancy'} className={'footer-link'}>Post job</Link>
            : 
            <Link to={'/registration-employer'} className={'footer-link'}>Post job</Link>}
            <Link to={'/'} className={'footer-link'}>Prices and services</Link>

        </div>
        <div className="grid-col">
            <div className="grid-col-img">
                <a target={'_blank'} href='https://www.facebook.com/'>
                    <img src="https://first-testing-9fede.web.app/pics/littleMarks/fb.jpg" className="img-footer"/>
                </a>
                <a target={'_blank'} href='https://t.me/react_js'>
                    <img src="https://first-testing-9fede.web.app/pics/littleMarks/telegram.png" className="img-footer"/>
                </a>
                <a target={'_blank'} href='https://www.linkedin.com/in/davidulyo/'>
                    <img src="https://first-testing-9fede.web.app/pics/littleMarks/in.png" className="img-footer"/>
                </a>
            </div>
            <a href="mailto:questions@techjobs.com" className="site-email">questions@techjobs.com</a>
        </div>
        

    </nav>;
}

export default Footer;
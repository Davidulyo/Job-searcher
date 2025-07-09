import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../../../../redux/ActionCreators'
import Carousel from 'carousel-react-rcdev';
import './Partners.css';

function Partners({partners}) {
    
    const dispatch = useDispatch();

        return <>



            <h1>Our partners</h1>
            <br/>
            <Carousel>
            <div className='partners-box'>
                {partners && partners.map((el, i) => {
                    return el.numVac > 0 && 
                        <div className="partner-card" key={i+44}>
                            {/* <Link to={`/company/${el.partner}`} onClick={() => dispatch(Actions.pickId(el.partner))}><h1>{el.partner}</h1></Link>  */}
                            <Link to={`/company/${el.partner}`} onClick={() => dispatch(Actions.pickId(el.partner))}>
                                <img src={el.logo} className='partner-logo'/>
                            </Link> 
                            <h1 className='vac-num'>{el.numVac}</h1>
                        </div>
                    })
                }
            </div>
            </Carousel>
    </>
    
}

export default Partners;

import './SingleCard.css';

export default function SigleCard({card, handleChoice, flipped, disabled, setStartTimer}) {

    const handlerClick = () => {
        if(disabled){
            return;
        } else{
            handleChoice(card);
        }
    }

    return <div className='card' onClick={() => setStartTimer(true)}>
                <div className={flipped === true ? "flipped" : ""}>
                    <img className='front' src={card.src} alt='front-card' />
                    <div className='back' onClick={handlerClick}/>
                </div>
            </div>
}

// src={"./pics/cover.jpg"}  alt='cover-card' 
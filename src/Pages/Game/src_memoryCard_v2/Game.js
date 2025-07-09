import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard/SingleCard'
import cardImages from './components/data/dataCards';
import Board from './components/Board/Board';
import { startSeconds } from './components/data/dataCards';
import './Game.css';

export default function Game() {

    // useStates
    const [cards, setCards] = useState([]); // just ar of cards. we just get ar cards(6cards) and with func shuffleCards we doudle it and give them unic id, and put them randomly to setState
    const [turns, setTurns] = useState(0); // it just hold the turns of comparing of cards. For showing it on screen

    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    const [disabled, setDisabled] = useState(false);
    const [checkWin, setCheckWin] = useState(null);

    const [startTimer, setStartTimer] = useState(false);
    const [timer, setTimer] = useState();

    // auto start part
    useEffect(()=> {
        shuffleCards() // works like 'window.onload' - ar is empty
    }, [])

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages] // here we doudle origin array
        .sort(() => Math.random() - 0.5) // sort them by random num of position
        .map(card => ({...card, id: Math.random()*100000})); // here we put every element of ar in object and add new prop - id

        setStartTimer(false);
        setTimer(startSeconds); //
        setCheckWin(null);      //
        setChoiceOne(null);     //
        setChoiceTwo(null);     // => initial part
        setTurns(0);            // 
        setCards(shuffledCards); // just transfer it to State
    }

    // clickHandler for click on card
    const handleChoice = (card) => { // get the card info
        choiceOne === null ? setChoiceOne(card) : setChoiceTwo(card); 
    } // after first choice click, it sets second choice

    // func-check if all the cards are matched
    const checkTrue = () =>{
        let sum = 0;
        for (let i = 0; i < cards.length; i++) {
           if(cards[i].matched) {
                sum++;
           }      
        }
        if (sum === cards.length && cards.length !== 0){
            setCheckWin(true);
        }
    }

    // if checkWin or turns is changing - chechTrue is working
    useEffect(() => {
        checkTrue();
        if(checkWin){
            pauseTimer();
        }
    }, [checkWin, turns]);

    useEffect(()=> {
        if (choiceOne && choiceTwo){ // after first and second choices are - work!
            setDisabled(true); // to do unclickeble another cards
            if (choiceOne.src === choiceTwo.src){ // compare them by src path
                setCards(prevCard => { // ma the prevCards..?
                    return prevCard.map(card=>{
                        if (card.src === choiceOne.src){
                            return {...card, matched: true}; // set true for cards that are matched
                        } else{
                            return card; // if no match, do nothing
                        }
                    })
                })
                resetTurn(); // got it
            } else{
                setTimeout(()=>resetTurn(), 1000); // close card after 1 sec
            }
        }
    }, [choiceOne, choiceTwo]); // dependencies btw ... and ...

    // reset
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1); // plus turns
        setDisabled(false); // another cards could be clicked
    }

    useEffect(() => {
        if(startTimer && timer > 0){
            tikTak();
        } else if (timer <= 0){
            setCheckWin(false);
        }
    }, [startTimer, timer])

    const tikTak = () => {
        setTimeout(() => {
            setTimer(timer-1)
        }, 1000)
    }

    const pauseTimer = () => setStartTimer(false);

    return <>
        <div className='app'>
            <h1>Magic Match</h1>
            <h1>{timer}</h1>
            <button className='btn' onClick={() => pauseTimer()}>Pause</button>
            <button className='btn' onClick={shuffleCards}>New Game</button>

            <div className='card-grid'>
                {cards.map(card => (
                    <SingleCard setStartTimer={setStartTimer} key={card.id} 
                    card={card} 
                    handleChoice={handleChoice} 
                    flipped={card === choiceOne || card === choiceTwo || card.matched === true}
                    disabled={disabled}/>
                ))}
            </div>
            <h2>Turns: {turns}</h2>
            {checkWin !== null && <Board newGame={shuffleCards} turns={turns} win={checkWin} sec={startSeconds-timer}/>} 
        </div>
    </>
}

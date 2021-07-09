import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Navbar, OffCanvasPart, Maincontent, Footer} from './statichtmlparts'
import axios from 'axios'

function MainLogic(){
  const [isRoll, setRoll] = useState(false);
  const [settings, setSetts] = useState({
                                  countGames: '3',
                                  priceMore: '0',
                                  priceLess: '100000'
                                 });
  const [settigsLink, setLink] = useState(
    'http://127.0.0.1:8000/api/game?&countGames=3&priceMore=0&priceLess=100000'
    );
  const [gamePool, setPool] = useState({})
  const [rollAddParams, setRollParams] = useState('')
  //return settings form params
  function getSettings(newSetts) {
    setSetts(newSetts);
  }

  function changeRollCondition() {
    setRoll(!isRoll);
  }

// logging effect
  useEffect( () => {
    console.log(settigsLink)
    console.log(settings)
    console.log(isRoll)
    console.log(gamePool)
  });
// update games effect
  useEffect( ()=> {
    setLink(getLinkFromSettings(settings));
  },[settings]);

  useEffect ( ()=>{

    axios({
      method:'GET',
      url: settigsLink
    }).then(response => {
      setPool(response.data)
       //winner id
    })

  },[settigsLink, isRoll])

// update games effect  
  useEffect ( ()=> {
    
        let winner = getRandomWinner(0,gamePool.length - 1  )
        let rotateAmount = getRangomRotate(10, 30, 
                                        gamePool.length, winner);
        console.log(`The winner is ${winner} which spined ${rotateAmount} deg`)
        setRollParams({winner:winner, rotate:rotateAmount})
     
  },[gamePool])

  return (    
    <>
      <Navbar/>
      <OffCanvasPart getSettings={getSettings}/>
      <Maincontent   
        gamePool={gamePool} 
        rollAddParams={rollAddParams}
        changeRollCondition={changeRollCondition}
        isRoll={isRoll}

        />
      <Footer/>
    </>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <MainLogic/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


function getLinkFromSettings(params){
  let myParams = params;
  let seacrh = 'http://127.0.0.1:8000/api/game?';
  for (let [key, value] of Object.entries(myParams)) {
    if (seacrh.length > 1){
          seacrh += '&';
    }
    seacrh += `${key}=${value}`;
  }
  return seacrh;
}


//in degrees
function getRangomRotate(circMin, circMax, countGames, winner){
  //number of full circles -> from 10 to 30
  let circles = Math.floor(Math.random()*(circMax - circMin)) + circMin;
  circles = circles * 360

  // rotate amount not full circle spin
  let lower_bound = 360/countGames * (winner)
  let upper_bound = 360/countGames * (winner + 1)

  let y = Math.floor(Math.random() *(upper_bound - lower_bound) ) + lower_bound;
  return circles + y + 1
}

function getRandomWinner(min, max){
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

function toZeroRotate (elementId){
  if (document.getElementById(elementId) == undefined){
    return
  }
  let myCanvas = document.getElementById(elementId).style;
  //restore circle to start position
  const myTrans = myCanvas.transition;
  myCanvas.transition= `all ease-in-out 0ms`;
  myCanvas.transform = 'rotate(' + 0 + 'deg)';
  //return back transition propherties
  setTimeout( () => {myCanvas.transition = myTrans;}, 2)
}


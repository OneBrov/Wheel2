import React, { useRef, useEffect, useState } from 'react';
import SettingsForm from './settings'
import { Circle, RollButton} from './wheel'
import {Game} from './gameToHtml'



function Navbar(props)  {
	return (
    <nav className="navbar  navbar-expand-lg navbar-dark bg-dark ">
      <div className = "container-fluid">
        <a className = 'navbar-brand fs-2' href = '#'> Bruh Wheel </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav fs-4">
            <li className="navbar-item">
              <a className ='nav-link active' href= '#settingsMenuButton'> Settings </a>
            </li>
            <li className="navbar-item">
              <a className ='nav-link active' href= '#about'> About </a>
            </li>
            <li className="navbar-item "><a className = 'nav-link ' href = '#'> Login </a>  
            </li>
          </ul>
        </div>
      </div>
    </nav>  
	);
};



function OffCanvasPart(props)  {
	return (
		<section id = 'settingsSection'> 
		    <div className="offcanvas offcanvas-start" data-bs-scroll="true" 
		         tabIndex="-1" id="offcanvasWithBothOptions" 
		         aria-labelledby="offcanvasWithBothOptionsLabel">
		      <div className="offcanvas-header">
		        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">  
		          Settings Menu
		        </h5>
		          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		      </div>
		      <div className="offcanvas-body">
		     
		        <div id = 'settings-root' className ='container'>

		        	<SettingsForm
                  getSettings={props.getSettings}
              />
            
		        </div>
		      </div>
		    </div>
  		</section>
	);
};

function Maincontent (props){
  let game = props.gamePool[props.rollAddParams.winner];
  let games =props.gamePool
  let gameobj;
  let gamesObj;
  // if (props.gamePool){
  if (typeof game !== "undefined"){
    gameobj =  <div className='bg-dark  mx-3 my-3 '>
                  <Game rolledGame={props.gamePool[props.rollAddParams.winner]}/>
               </div>
  } else{
    gameobj = <div> <h2> The game steel not rolled </h2> </div>
  }

  if (typeof games !== "undefined" && games.length > 0 ){
    gamesObj =   games.map(g => (
      <div className='bg-dark  mx-3 my-3 '>
      <h4 className='text-center'>{g.name}</h4>
      <Game rolledGame={g} myClass='collapse' myId={`gameDesc${g.appid}`}/>
      <p>       
        <button class="btn btn-light align-middle" type="button" data-bs-toggle="collapse" data-bs-target={`#gameDesc${g.appid}`} aria-expanded="false" aria-controls={`gameDesc${g.appid}`}>
          Togle description
        </button>
      </p>

      </div>
      ));
   
  } else{
    gamesObj = <div> <h2> The list is empty </h2> </div>

  }
	return (
		<div id = 'main-page-content' className ='container-fluid'> 
      <div className = 'row'>
        <div id = 'left-content' className ='bg-dark  bg-gradient col-lg-3 col'>
          <h1 className='text-center my-4'>Rolled game</h1>
            <div className='bg-dark'>
              {gameobj} 
            </div>
          <div className="d-flex justify-content-center p-2" id = 'settingsMenuButton'>
            <button 
                    className="btn btn-light btn-lg" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasWithBothOptions" 
                    aria-controls="offcanvasWithBothOptions">
              Settings menu
            </button>
          </div>
        </div> 

        <div id = 'mid-content'  className ='p-2 bg-dark bg-gradient col-lg-6'>
       
            <h1 className='text-center  my-4'>Wheel</h1>
            <section>
            <div  id ='wheel-root' className='container container-canvas'>
              <div className="wheel-canvas">
                
                <Circle id = 'wheel-canvas'/>
                <RollButton elementName='wheel-canvas'/>
              </div>
            </div>
            
            </section>
        </div> 

        <div id = 'right-content'className ='bg-dark  bg-gradient col-lg-3'>
          <h1 className='text-center  my-4'>List of games</h1>
            <div className='bg-dark'>
            {gamesObj}
            </div>
        </div> 
      </div>
    </div>
	)
}

function Footer(props) {
	return (
		<footer className="bg-dark text-center text-white">
      <div id = 'about' className= 'container-fluid'>
        <h3>Why BruhWheel?</h3>
        <p>
          It's just 4 fun site. Bruh - it's my nickname, Wheel - it's a way to get a random game.  BruhWheel can help you choose a game from Steam. Just push a roll button.  
        </p>

        <h3>How it work?</h3>
        <p>
          All games come from SteamAPI or steam SPY API and from some diffrent API. And library of the Bruh Wheel large as steam library large. 
        </p>
        <p> And if u wanna see source of the code click  
          <a className='link-success' target="_blank" rel="noreferrer" href="https://github.com/OneBrov/GameWheel"> here</a>
        </p>
      </div>
    </footer>
	);
};
export {
    Navbar,
    OffCanvasPart,
    Maincontent,
    Footer
};


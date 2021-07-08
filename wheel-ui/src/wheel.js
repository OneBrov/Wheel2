import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';



 const Circle = (props) => {
     let ref = useRef(null);

     var  games = props.games;
     useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext('2d');
        let dpi = window.devicePixelRatio; 
        canvas.setAttribute('height', canvas.clientHeight * dpi);
        canvas.setAttribute('width', canvas.clientWidth * dpi);
        //let ratio = getPixelRatio(context);
        // let width = getComputedStyle(canvas)
        //     .getPropertyValue('width')
        //     .slice(0, -2);
        // let height = getComputedStyle(canvas)
        //      .getPropertyValue('height')
        //       .slice(0, -2);

        let ratio = dpi; 

        // canvas.width = width * ratio;
        // canvas.height = height * ratio;
        // canvas.width = Math.floor(width * ratio);
        // canvas.height = Math.floor(height * ratio);
        var deviceWidth =  window.screen.width;
        let mySize = '500px';
        if (deviceWidth < 1200){
          mySize = '400px'
        }

        if (deviceWidth < 576){
          mySize = '300px'
        }

        if (deviceWidth < 400){
          mySize = '200px'
        }
        canvas.style.width = mySize;
        canvas.style.height = mySize;
        const render = () =>{
          let count;
          if (games === undefined || games.length < 2){
            count = 2;
          } else {
            count = games.length;
          }

          let countParts = count;
          //draw the circle
          drawFullboxCircle(canvas, context, countParts);
          drawGameName(canvas, context, props.games, ratio)
        }; 

        render();
     });
     
     return (
         <div className='gameBox p-4 '> 
         <canvas 
            id = {props.id}
            ref={ref} 
            style={{ 
  
               
              transition: `all cubic-bezier(0.23, 0.64, 0.36, 1) ${props.tranDuration}`
            }} />
         </div>
     );
 };
  



function drawFullboxCircle(canvas, context, splitCount, ratio) {
  
  let CicleSize = canvas.width;  
  let radius = CicleSize/2 ;
  var x = radius;
  var y = radius;

  let splitAngle = 2* Math.PI / splitCount;
 // context.scale(ratio, ratio);
  for (let i=0; i< splitCount;i++){
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, i*splitAngle, (i+1)*splitAngle,false);
    context.lineWidth = radius;
    let hueValue = i*15;
    context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)'; 


    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#444';
    context.stroke()
  }
};

function drawGameName(canvas, context, games, ratio) {
  if (games === undefined){
    return 
  }

  let CicleSize = canvas.width;  
  let radius = CicleSize/2 ;
  var x = radius;
  var y = radius;

  context.font = 20 * ratio + 'px Helvetica';
  context.shadowColor = "black";
  context.shadowBlur = 2;
  context.lineWidth=1;
  // context.rotate(-Math.PI/3);
  context.textAlign = "left";
  context.fillStyle = "white";
  context.translate(x , y)
  var angle = 360 / games.length;
  context.rotate(-angle/2* Math.PI / 180 );

 
    for (let i=0; i<games.length; i++){
      
    //context.strokeText( '{{ game.name }}', 0 + 10, 0 - 10);
    let game = games[i].name
    if (game.length > 20){
      game = game.slice(0, 17) + '...'
    }
  
    context.strokeText( game, 0 + 50*ratio , 5*ratio, (radius/2 ) * ratio );
    context.fillText( game , 0 + 50*ratio , 5*ratio, (radius/2 ) * ratio );
    context.rotate(-angle * Math.PI / 180);
    }         
}


const getPixelRatio = context => {
  let backingStore =   
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

function RollButton (props) {
  const [rotatecount, setRotate] = useState(0);
  const rotateAmount = props.rotateAmount;
  const handleClick = ()=> {
    console.log(props.elementName + ' start spinning')
    console.log(rotateAmount)
    document.getElementById(props.elementName).style.transform = 
    'rotate(' + rotateAmount + 'deg)';
  }

  
  return (
    
      <button className = 'rollButton' onClick = {handleClick}>
        Roll
      </button>
    
  )
};

export {
    Circle,
    RollButton
};


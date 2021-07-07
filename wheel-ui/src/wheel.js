import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';



 const Circle = (props) => {
     let ref = useRef();
     
     useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext('2d');
         
        let ratio = getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
         
        canvas.width = width * ratio;

        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        
        const render = () =>{
          drawFullboxCircle(canvas, context, 5);
        }; 

        render();

     });
     
     return (
         <div > 
         <canvas 
            id = {props.id}
            ref={ref} 
            style={{ 
              width: '500px',
              height:'500px' ,
               
              transition: 'all cubic-bezier(0.23, 0.64, 0.36, 1) 5s'
            }} />
         </div>
     );
 };
  



function drawFullboxCircle(canvas, context, splitCount) {
  let CicleSize = canvas.width;  
  let radius = CicleSize/2 ;
  let x = radius;
  let y = radius;

  let splitAngle = 2* Math.PI / splitCount;

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
  const handleClick = ()=> {
    console.log(props.elementName + ' start spinning')
    setRotate(rotatecount + 360)
    console.log(rotatecount)
    document.getElementById(props.elementName).style.transform = 
    'rotate(' + rotatecount + 'deg)';
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
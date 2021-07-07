import React, { useRef, useEffect, useState } from 'react';



function Game(props){
	let game = props.rolledGame;
	let pictureLink = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`;
	if (props.class == undefined){
		props.class = 'fullGame'
	}
	return (
		<div id = 'rolledGame' className='text-white bg-dark fs-5 '>
			<div id='rolledGamePicture' className='mx-3 my-3'>
				<img src={pictureLink} 
					className='img-fluid' 
					alt='Picture of rolled game'
				/>
			</div>
			<div id={props.myId} className={props.myClass}>
				<div id='gameDiscription' className='mx-3'>
					<h4> Name: {game.name} </h4>
					<p> Positive reviews: {game.possitive_count} </p>
					<p> Negative reviews: {game.negative_count} </p>
					<p> Metascore: {game.metascore} </p>
					<p> Sold copies: {game.owners_count} </p>
					<p> Price: {game.price} Rub</p>
					<p> Developer: {game.developer} </p>
					<p> Publisher: {game.publisher} </p>
					<p> Duration: {game.duration} {game.time_unit} {game.label}</p>
					<p> HLTB: <a class="link-light"  href={game.hltb_link} target="_blank"> click here</a>  </p>
					<p> Steam: <a className='link-light'  href='https://store.steampowered.com/app/{game.appid}'  target="_blank"> {game.name} </a></p>
					<p> Languages: {game.languages.join(', ')} </p>
					<p> Genres: {game.genres.join(', ')} </p>
					<p> Tags: {game.tags.join(', ')} </p>
				</div>
			</div>
		</div>
	)
};

export {
    Game
 }
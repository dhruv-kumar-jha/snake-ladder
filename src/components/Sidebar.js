import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Action from 'app/redux/actions';
import * as Helper from 'app/global/utils/Helper'; 


let findPlayerByIndex = (state, index) => {
	if( ! Number.isInteger( index ) ) {
		return { name: 'Undefined' };
	}

	let players = state.player.get('all').toArray();
	return players[index];
}

const mapStateToProps = ( state, ownProps ) => {
	return {
		dice: state.game.get('config').get('dice'),
		winner: state.game.get('config').get('winner'),
		perfect_throws: state.game.get('config').get('perfect_throws'),
		current_player: findPlayerByIndex( state, state.game.get('config').get('current') ),
		winning_player: findPlayerByIndex( state, state.game.get('config').get('winner') ),
	}
}

const mapDispatchToProps = dispatch => ({
    playerUpdatePosition: (data) => dispatch( Action.playerUpdatePosition(data, true) ),
    gameRollDice: () => dispatch( Action.gameRollDice() ),
    gameUpdatePerfectThrows: () => dispatch( Action.gameUpdatePerfectThrows() ),
});





let Sidebar = ( props ) => {

	if( props.perfect_throws === null ) {
		setTimeout( () => {
			props.gameUpdatePerfectThrows();
		}, 100 );
	}


	const movePlayer = () => {
		if( ! props.dice ) {
			return false;
		}
		let data = {
			id: props.current_player.id,
			moves: props.dice,
			tile: props.current_player.tile,
			index: props.current_player.index,
		};
		props.playerUpdatePosition( data );
	}



	let player_dashboard = (
		<div>
			<div className="player-info">
				<p>Current Player</p>
				<p className="name">{ props.current_player.name }</p>
				<div className="moves-to-win">
					You are <strong>"{ props.perfect_throws || 'calculating' }"</strong> moves away from a perfect win.
				</div>
			</div>

			<div className="dice">
				<div className="number">
					{ props.dice ?
						<span>{ props.dice }</span> : <span>&#8995;</span>
					}
				</div>
			</div>

			<div className="m-t-20">
				{ props.dice ?
					<button className="full green" onClick={ movePlayer }>Move</button>
					:
					<button className="full blue" onClick={ props.gameRollDice }>Roll the Dice</button>
				}
			</div>
		</div>
	);


	let winner_dashboard = (
		<div className="winner">
			<p className="game-over">Game Over</p>
			<p className="m-t-20">{ props.winning_player.name } Won!</p>
			<div className="m-t-20">
				<Link to="/stats" className="button full">View Stats</Link>
				<a className="button full m-t-10" href="/">Reset Game</a>
			</div>
		</div>
	);


	return (
		<aside id="main">
			<h2>Control Panel</h2>
			{ props.winner !== null ?
				winner_dashboard
				:
				player_dashboard
			}
		</aside>
	)


}




const ConnectSidebar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar)


export default ConnectSidebar;




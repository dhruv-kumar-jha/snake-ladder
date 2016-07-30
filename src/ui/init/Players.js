import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import PlayerForm from 'app/components/form/Player';



const mapStateToProps = ( state, ownProps ) => {
	return {
		game: state.game.get('config'),
		players: state.player.get('all'),
	}
}

const mapDispatchToProps = dispatch => ({
    playerCreateNew: () => dispatch( Action.playerCreateNew() ),
});


let Players = ( props ) => {

	let handleSubmit = (mode) => {
		browserHistory.push('/');
	}



	let heading = () => {
		if( props.game.get('mode') === 1 ) {
			return <h2>Enter Your Details</h2>
		} else {
			return <h2>Enter Player Details</h2>
		}
	}


    return (
		<div className="screen">
			{ heading() }

			<div className="player-form">
			{ props.players.map( player => {
					return(
						<PlayerForm key={ player.id } data={player} delete={ props.players.size > 1 ? true : false } />
					)
				})
			}
			</div>

			<div className="m-t-40">
				{ props.game.get('mode') > 1 &&
					<button onClick={ props.playerCreateNew } className="m-r-20">Add New Player</button>
				}
				<button onClick={ handleSubmit }>Play The Game</button>
			</div>

		</div>
    )

}




const ConnectPlayers = connect(
	mapStateToProps,
	mapDispatchToProps
)(Players)


export default ConnectPlayers;



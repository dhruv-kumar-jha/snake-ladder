import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import * as Helper from 'app/global/utils/Helper'; 



const mapStateToProps = ( state, ownProps ) => {
	return {
		players: state.player.get('all'),
	}
}

const mapDispatchToProps = dispatch => ({
    gameSetMode: (data) => dispatch( Action.gameSetMode(data) ),
    playerCreateEmpty: () => dispatch( Action.playerCreateEmpty() ),
});


let Mode = ( props ) => {

	const gameSetModeAndAddPlayer = ( mode ) => {
		props.gameSetMode(mode);
		props.playerCreateEmpty();
	}


    return (
		<div className="screen">
			<h2>Select game mode</h2>

			<div className="options">
				<Link to="/init/difficulty" onClick={ () => { gameSetModeAndAddPlayer(1) } }>Single Player</Link>
				<Link to="/init/difficulty" onClick={ () => { gameSetModeAndAddPlayer(2) } }>Multi Player</Link>
			</div>


		</div>
    )


}



const ConnectMode = connect(
	mapStateToProps,
	mapDispatchToProps
)(Mode)


export default ConnectMode;



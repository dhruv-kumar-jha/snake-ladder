import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';


const mapStateToProps = ( state, ownProps ) => {
	return {
	}
}

const mapDispatchToProps = dispatch => ({
    gameSetDifficulty: (data) => dispatch( Action.gameSetDifficulty(data) ),
    gameboardGenerateBoard: () => dispatch( Action.gameboardGenerateBoard() ),
});


let Difficulty = ( props ) => {

	let handleOnClick = (difficulty) => {
		props.gameSetDifficulty(difficulty);
		props.gameboardGenerateBoard();
	}

    return (
		<div className="screen">
			<h2>Select difficulty</h2>

			<div className="options">
				<Link to="/init/players" onClick={ () => { handleOnClick(1) } }>Easy: You make me sick</Link>
				<Link to="/init/players" onClick={ () => { handleOnClick(2) } }>Medium: Punk!</Link>
				<Link to="/init/players" onClick={ () => { handleOnClick(3) } }>Difficult: Do it</Link>
				<Link to="/init/players" onClick={ () => { handleOnClick(4) } }>Hell Mode: DON'T be a hero</Link>
			</div>


		</div>
    )


}



const ConnectDifficulty = connect(
	mapStateToProps,
	mapDispatchToProps
)(Difficulty)


export default ConnectDifficulty;



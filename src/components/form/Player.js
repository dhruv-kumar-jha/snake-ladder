import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import _ from 'lodash';


const mapStateToProps = ( state, ownProps ) => {
	return {
		game: state.game.get('config'),
		players: state.player.get('all'),
	}
}

const mapDispatchToProps = dispatch => ({
    playerDelete: (data) => dispatch( Action.playerDelete(data) ),
    playerUpdateName: (data) => dispatch( Action.playerUpdateName(data) ),
});



let PlayerInput = ( props ) => {

	const player = props.data;

	let onChange = ( event, id ) => {
		props.playerUpdateName({ id: id, name: event.target.value });
	}

    return (
		<div className="player-input">
			<input placeholder="Player Name" onChange={ (event) => { onChange(event, player.id) } } />
			{ props.delete &&
				<a onClick={ () => { props.playerDelete(player.id) } }>Delete</a>
			}
		</div>
    )

}


const ConnectPlayerInput = connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerInput)


export default ConnectPlayerInput;


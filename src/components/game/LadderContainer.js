import React from 'react';
import { connect } from 'react-redux';
import Ladder from 'app/components/game/Ladder';


const mapStateToProps = ( state, ownProps ) => {
	return {
		ladders: state.gameboard.get('ladders'),
	}
}

const mapDispatchToProps = dispatch => ({
});



let LadderContainer = ( props ) => {

	return (
		<div className="ladders">

			{ props.ladders.map( ladder => {
					return(
						<Ladder key={ 'ladder_' + ladder.id } data={ ladder } />
					)
				})
			}

		</div>
	)

}




const ConnectLadderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LadderContainer)


export default ConnectLadderContainer;


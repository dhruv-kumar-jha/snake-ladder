import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = ( state, ownProps ) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
});



let Card = ( props ) => {

	const { stat, player, winner } = props;

	let class_names = 'card';
	if( winner.id === player.id ) { class_names = class_names + ' winner'; }


	return (
		<div className={class_names}>
			<div className="name">{ player.name }</div>
			<p><span>Total Throws / Dice Rolls</span> { stat.rolls }</p>
			<p><span>Total Number of times Six Rolled</span> { stat.sixes }</p>
			<p><span>Total Ladders Climbed</span> { stat.ladders }</p>
			<p><span>Total Snakes Encountered</span> { stat.snakes }</p>
		</div>
	)


}



const ConnectCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(Card)

export default ConnectCard;


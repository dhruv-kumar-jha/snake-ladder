import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';
import * as Helper from 'app/global/utils/Helper';


const mapStateToProps = ( state, ownProps ) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
});



let Player = ( props ) => {

	const { data } = props;

	let styles = Helper.getPlayerPositionCSSStyles( data );

	return (
		<div className="player" style={styles}>
			<span>{ data.id }</span>
		</div>
	)


}





const ConnectPlayer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Player)


export default ConnectPlayer;


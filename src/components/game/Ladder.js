import React from 'react';
import { connect } from 'react-redux';
import * as Helper from 'app/global/utils/Helper';


const mapStateToProps = ( state, ownProps ) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
});




let Ladder = ( props ) => {

	const { data } = props;

	let styles = Helper.generateLadderStyle( data );

	return (
		<div className="ladder" style={styles}>
		</div>
	)

}



const ConnectLadder = connect(
	mapStateToProps,
	mapDispatchToProps
)(Ladder)


export default ConnectLadder;


import React from 'react';
import { connect } from 'react-redux';
import * as Helper from 'app/global/utils/Helper';


const mapStateToProps = ( state, ownProps ) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
});





let Snake = ( props ) => {

	const { data } = props;

	let styles = Helper.generateSnakeStyle( data );

	return (
		<div className="snake" style={styles}>
		</div>
	)


}





const ConnectSnake = connect(
	mapStateToProps,
	mapDispatchToProps
)(Snake)


export default ConnectSnake;


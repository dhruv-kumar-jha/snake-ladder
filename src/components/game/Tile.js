import React from 'react';
import { connect } from 'react-redux';
import * as Action from 'app/redux/actions';


const mapStateToProps = ( state, ownProps ) => {
	return {}
}

const mapDispatchToProps = dispatch => ({
});





let Tile = ( props ) => {

	const { data } = props;

	return (
		<div className={ 'tile ' + data.style } id={ 'tile_' + data.id }>
			<span className="number">{ data.id }</span>
		</div>
	)


}




const ConnectTile = connect(
	mapStateToProps,
	mapDispatchToProps
)(Tile)


export default ConnectTile;




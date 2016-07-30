import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'app/components/Sidebar';


const mapStateToProps = ( state, ownProps ) => {
	return {
		game_start: state.game.get('config').get('start'),
	}
}

const mapDispatchToProps = dispatch => ({});

let GameLayout = ( props ) => {


    return (
		<div id="wrapper">

			<header id="main">
				<h1>Snakes & Ladders</h1>
			</header>

			{ props.children }

			{ props.game_start &&
				<Sidebar />
			}

		</div>
    )


}



const ConnectGameLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(GameLayout)


export default ConnectGameLayout;


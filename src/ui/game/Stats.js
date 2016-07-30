import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Card from 'app/components/stats/Card';
import Sortable from 'react-sortablejs';


// same func used in Sidebar, if you plan on keeping this func here, place it in a hepler file or delete after testing.
let findPlayerByIndex = (state, index) => {
	if( ! Number.isInteger( index ) ) {
		return { name: 'Undefined' };
	}
	let players = state.player.get('all').toArray();
	return players[index];
}


const mapStateToProps = ( state, ownProps ) => {
	return {
		players: state.player.get('all'),
		stats: state.player.get('stats'),
		winning_player: findPlayerByIndex( state, state.game.get('config').get('winner') ),
	}
}

const mapDispatchToProps = dispatch => ({
	gameSetStart: () => dispatch( Action.gameSetStart() ),
});



let Stats = ( props ) => {

	let findStatByPlayerId = (id) => {
		return props.stats.find(function(obj) { return obj.id == id; });
	}


	return (
		<div className="screen">
			<h2>Game Stats</h2>

			{ props.players.size > 0 &&
				<div className="card-container">
					<Sortable>
					{ props.players.map( player => {
							let stat = findStatByPlayerId( player.id );
							return(
								<Card key={ 'card_' + player.id } player={player} stat={ stat } winner={props.winning_player} />
							)
						})
					}
					</Sortable>
				</div>
			}

		</div>
	)

}



const ConnectStats = connect(
	mapStateToProps,
	mapDispatchToProps
)(Stats)


export default ConnectStats;




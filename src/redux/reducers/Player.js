import {
	PLAYER_CREATE,
	PLAYER_DELETE,
	PLAYER_DELETE_ALL,
	PLAYER_UPDATE_NAME,
	PLAYER_UPDATE_POSITION,
	PLAYER_STATS_UPDATE,
} from '../Constants';
import Immutable from 'immutable';



const player_data = Immutable.Map({
	all: Immutable.List([]),
	count: 0,
	stats: Immutable.List([]),
});



function player( data = player_data, action ) {

	switch (action.type) {

		case PLAYER_CREATE:
			let count = data.get('count') + 1;
			if( action.payload && ! action.payload.id ) {
				action.payload.id = count;
				action.payload.name = `Anonymous#${count}`;
			}
			action.payload.array_index = data.get('all').size;
			data = data.set( 'count', count );
			return data.set( 'all', data.get('all').push( action.payload ) );


		case PLAYER_UPDATE_POSITION:
			let player_index = data.get('all').findIndex( item => { return item.id == action.payload.id; });
			let updatePlayerPos = data.get('all').update(player_index, function( item ) {
				return Object.assign( {}, item, { tile: action.payload.tile, index: action.payload.index } );
			});
			return data.set( 'all', updatePlayerPos );


		case PLAYER_UPDATE_NAME:
			let player_u_index = data.get('all').findIndex( item => { return item.id == action.payload.id; });
			let updatePlayerName = data.get('all').update(player_u_index, function( item ) {
				return Object.assign( {}, item, { name: action.payload.name, array_index: player_u_index } );
			});
			return data.set( 'all', updatePlayerName );


		case PLAYER_DELETE:
			let playerIndex = data.get('all').findIndex( item => { return item.id == action.payload; });
			return data.set('all', data.get('all').delete(playerIndex));


		case PLAYER_DELETE_ALL:
			return data.set('all', Immutable.List([]) );


		case PLAYER_STATS_UPDATE:
			let stats_index = data.get('stats').findIndex( item => { return item.id == action.payload.id; });
			if( stats_index >= 0 ) {
				let updatePlayerStat = data.get('stats').update(stats_index, function( stat ) {
					return Object.assign( {}, stat, {
						rolls: stat.rolls + action.payload.rolls,
						sixes: stat.sixes + action.payload.sixes,
						ladders: stat.ladders + action.payload.ladders,
						snakes: stat.snakes + action.payload.snakes,
					});
				});
				return data.set( 'stats', updatePlayerStat );
			} else {
				return data.set( 'stats', data.get('stats').push( action.payload ) );
			}


		default:
			return data;


	}

}



export default player;


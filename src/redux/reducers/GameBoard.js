import {
	GAMEBOARD_GENERATE_TILES,
	GAMEBOARD_GENERATE_LADDERS,
	GAMEBOARD_GENERATE_SNAKES,
} from '../Constants';
import Immutable from 'immutable';



const game_board_data = Immutable.Map({
	board: Immutable.List([]),
	ladders: Immutable.List([]),
	snakes: Immutable.List(),
});


function game_board( data = game_board_data, action ) {

	switch (action.type) {

		case GAMEBOARD_GENERATE_TILES:
			if( action.payload ) {
				return data.set( 'board', Immutable.List(action.payload) );
			}
			return data;


		case GAMEBOARD_GENERATE_LADDERS:
			return data.set( 'ladders', Immutable.List(action.payload) );


		case GAMEBOARD_GENERATE_SNAKES:
			return data.set( 'snakes', Immutable.List(action.payload) );


		default:
			return data;

	}


}



export default game_board;


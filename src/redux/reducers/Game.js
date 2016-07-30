import {
	GAME_CONFIG_SET_MODE,
	GAME_CONFIG_SET_DIFFICULTY,
	GAME_CONFIG_UPDATE_DICE,
	GAME_CONFIG_RESET_DICE,
	GAME_CONFIG_SET_START,
	GAME_CONFIG_RESET_DICE_SIX_COUNT,
	GAME_CONFIG_SET_CURRENT,
	GAME_CONFIG_SET_WINNER,
	GAME_UPDATE_PERFECT_THROWS,

} from '../Constants';
import Immutable from 'immutable';


const game_data = Immutable.Map({
	config: Immutable.Map({
		mode: '',
		difficulty: '',
		dice: 0,
		dice_six_count: 0,
		current: 0,
		start: false,
		winner: null,
		perfect_throws: null,
    }),
});



function game( data = game_data, action ) {

	switch (action.type) {

        case GAME_CONFIG_SET_MODE:
			return data.setIn(['config', 'mode'], action.payload );


        case GAME_CONFIG_SET_DIFFICULTY:
			return data.setIn(['config', 'difficulty'], action.payload );


        case GAME_CONFIG_SET_START:
			return data.setIn(['config', 'start'], true );


        case GAME_CONFIG_UPDATE_DICE:
        	if( action.payload === 6 ) {
        		let dice_six_count = data.get('config').get('dice_six_count') + 1;
				data = data.setIn(['config', 'dice_six_count'], dice_six_count );
        	}
			return data.setIn(['config', 'dice'], action.payload );


		case GAME_CONFIG_RESET_DICE:
			return data.setIn(['config', 'dice'], 0 );


		case GAME_CONFIG_RESET_DICE_SIX_COUNT:
			return data.setIn(['config', 'dice_six_count'], 0 );


		case GAME_CONFIG_SET_CURRENT:
			return data.setIn(['config', 'current'], action.payload );


		case GAME_CONFIG_SET_WINNER:
			return data.setIn(['config', 'winner'], action.payload );


		case GAME_UPDATE_PERFECT_THROWS:
			return data.setIn(['config', 'perfect_throws'], action.payload );


		default:
			return data;

	}

}



export default game;


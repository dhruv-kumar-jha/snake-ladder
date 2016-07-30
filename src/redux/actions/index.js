import {
	GAME_CONFIG_SET_MODE,
	GAME_CONFIG_SET_DIFFICULTY,
	GAME_CONFIG_SET_START,

	GAMEBOARD_GENERATE_TILES,
	GAMEBOARD_GENERATE_LADDERS,
	GAMEBOARD_GENERATE_SNAKES,

	PLAYER_CREATE,
	PLAYER_DELETE,
	PLAYER_DELETE_ALL,
	PLAYER_UPDATE_NAME,
	PLAYER_UPDATE_POSITION,
	PLAYER_STATS_UPDATE,

	GAME_CONFIG_SET_WINNER,
	GAME_CONFIG_UPDATE_DICE,
	GAME_CONFIG_RESET_DICE,
	GAME_CONFIG_RESET_DICE_SIX_COUNT,
	GAME_CONFIG_SET_CURRENT,
	GAME_UPDATE_PERFECT_THROWS,
} from '../Constants';
import * as Helper from 'app/global/utils/Helper'; 




export function gameSetMode( data ) {
	return { type: GAME_CONFIG_SET_MODE, payload: data }
}


export function gameSetDifficulty( data ) {
	return { type: GAME_CONFIG_SET_DIFFICULTY, payload: data }
}


export function gameboardGenerateTiles() {
	let board_tiles = Helper.generateGameboard();
	return { type: GAMEBOARD_GENERATE_TILES, payload: board_tiles }
}


export function gameboardGenerateLadders( difficulty ) {
	let ladders = Helper.generateLadders(difficulty);
	return { type: GAMEBOARD_GENERATE_LADDERS, payload: ladders }
}

export function gameboardGenerateSnakes( difficulty ) {
	let snakes = Helper.generateSnakes(difficulty);
	return { type: GAMEBOARD_GENERATE_SNAKES, payload: snakes }
}


export function gameboardGenerateBoard( data ) {
	return (dispatch, getState) => {

		dispatch( gameboardGenerateTiles() );

		let difficulty = getState().game.get('config').get('difficulty');
		dispatch( gameboardGenerateLadders( difficulty ) );
		dispatch( gameboardGenerateSnakes( difficulty ) );

	};
}


export function gameRollDice() {
	let random = Math.floor((Math.random() * 6) + 1);
	return { type: GAME_CONFIG_UPDATE_DICE, payload: random }
}

export function gameResetDice() {
	return { type: GAME_CONFIG_RESET_DICE }
}

export function gameResetDiceSixCount() {
	return { type: GAME_CONFIG_RESET_DICE_SIX_COUNT }
}

export function gameSetStart() {
	return { type: GAME_CONFIG_SET_START }
}
export function gameSetWinner( data ) {
	return { type: GAME_CONFIG_SET_WINNER, payload: data }
}


export function gameUpdateCurrentPlayer( player_id ) {
	return { type: GAME_CONFIG_SET_CURRENT, payload: player_id }
}


export function playerCreateNew() {
	let index_position = Helper.getPlayerStartingPosition();
	let data = {
		name: '',
		tile: index_position,
		index: 1,
		perfect_throws: 'calculating...',
	}
	return { type: PLAYER_CREATE, payload: data }
}


export function playerDeleteAll() {
	return { type: PLAYER_DELETE_ALL }
}

export function playerCreateEmpty() {
	return (dispatch, getState) => {
		let gamemode = getState().game.get('config').get('mode');

		if( gamemode === 1 ) {
			dispatch( playerDeleteAll() );
			dispatch( playerCreateNew() );
		} else {
			dispatch( playerDeleteAll() );
			dispatch( playerCreateNew() );
			dispatch( playerCreateNew() );
		}
	}
}



export function playerCreate( data ) {
	return { type: PLAYER_CREATE, payload: data }
}


export function playerDelete( data ) {
	return { type: PLAYER_DELETE, payload: data }
}

export function playerUpdateName( data ) {
	return { type: PLAYER_UPDATE_NAME, payload: data }
}



export function gameUpdateStats( data ) {
	return { type: PLAYER_STATS_UPDATE, payload: data }
}


export function gameUpdatePerfectThrows() {
	let previous_player_data = Helper.getLastCalculatedPlayerPosition();
	let perfect_throws = Helper.calculatePerfectThrowsFromPosition( previous_player_data.index );
	return { type: GAME_UPDATE_PERFECT_THROWS, payload: perfect_throws }
}


export function playerGetNewPosition( data ) {
	let updated_data = Helper.calculatePlayerNewPosition( data );
	updated_data.id = data.id;
	return { type: PLAYER_UPDATE_POSITION, payload: updated_data }
}


export function playerUpdatePosition( data, change=false ) {
	return (dispatch, getState) => {
		dispatch( playerGetNewPosition(data) );

		let previous_player_data = Helper.getLastCalculatedPlayerPosition();

		setTimeout(function() {
			dispatch( gameUpdatePerfectThrows() );
		}, 100);

		// console.log('previous_player_data',previous_player_data);
		if( previous_player_data.index === 100 ) {
			let player_index = Helper.getPlayerIndexBasedOnId( getState().player.get('all'), data.id );
			setTimeout(function() {
				dispatch( gameSetWinner(player_index) );
			}, 500);
		}

		let stats_ladder_count = 0;
		let stats_snake_count = 0;

		let ladders = getState().gameboard.get('ladders');
		ladders.find(function(ladder) {
			if( ladder.from === previous_player_data.index ) {
				stats_ladder_count++;
				setTimeout(function() {
					dispatch( playerUpdatePosition({ id: previous_player_data.id, index: previous_player_data.index, moves: ladder.to-ladder.from }) );
				}, 400);
			}
		});

		let snakes = getState().gameboard.get('snakes');
		snakes.find(function(snake) {
			if( snake.from === previous_player_data.index ) {
				stats_snake_count++;
				setTimeout(function() {
					dispatch( playerUpdatePosition({ id: previous_player_data.id, index: previous_player_data.index, moves: snake.to-snake.from }) );
				}, 400);
			}
		});


		let dice_number = getState().game.get('config').get('dice');
		if( change ) {

			let dice_six_count = getState().game.get('config').get('dice_six_count');

			// reset the dice
			dispatch( gameResetDice() );


			let update_current_player = () => {
				// check which player should play next?
				let total_players = getState().player.get('all').size;
				total_players = total_players - 1; // because we're comparing indexes, and it starts at 0;
				// console.log('total_players',total_players);

				let current_player_index = getState().game.get('config').get('current');
				// console.log('current_player_index',current_player_index);

				let next_player = 0;
				if( current_player_index < total_players ) { next_player = current_player_index + 1; }

				dispatch( gameUpdateCurrentPlayer(next_player) );
			}

			if( dice_number === 6 || dice_six_count <= 3 ) {
				if( dice_six_count >= 3 ) {
					dispatch( gameResetDiceSixCount() );
					update_current_player();
				}
				if( dice_number != 6 ) {
					dispatch( gameResetDiceSixCount() );
					update_current_player();
				}
			}
			else {
				dispatch( gameResetDiceSixCount() );
				update_current_player();
			}

		}

		dispatch(
			gameUpdateStats({
				id: data.id,
				rolls: ( change === true ) ? 1 : 0,
				sixes: ( dice_number === 6 ) ? 1 : 0,
				ladders: stats_ladder_count,
				snakes: stats_snake_count,
			})
		);

	};
}



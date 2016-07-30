'use strict';

function gameModeSelected( nextState, replace, store ) {
	const state = store.getState();
	const game_mode = state.game.get('config').get('mode');

	if ( ! game_mode ) {
		replace({
			pathname: '/init/mode',
			state: { nextPathname: nextState.location.pathname }
		});
	}

}



function gameNotStarted( nextState, replace, store ) {
	const state = store.getState();
	const game_start = state.game.get('config').get('start');

	if ( game_start ) {
		replace({
			pathname: '/',
			state: { nextPathname: nextState.location.pathname }
		});
	}

}



export { gameModeSelected };
export { gameNotStarted };


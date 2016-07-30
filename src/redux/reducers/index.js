import { combineReducers } from 'redux';
import Immutable from 'immutable';
import game from './Game';
import gameboard from './GameBoard';
import player from './Player';


const SnakesAndLaddersGane = combineReducers({
	game,
	gameboard,
	player,
})


export default SnakesAndLaddersGane;


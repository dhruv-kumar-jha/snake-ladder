import config from 'app/global/config';
import _ from 'lodash';


let mapping = []; // store the tile mappings here, for easier access.
let last_calculated_player_details = {};
let gameboard; // this will store positions of the gameboard div.

let all_ladders = [
	{ id: 'df4s',  from: 2,   to: 38 },
	{ id: 'fgh5',  from: 4,   to: 24 },
	{ id: 'io98',  from: 7,   to: 56 },
	{ id: 'ajsd',  from: 8,   to: 13 },
	{ id: 'dfo4',  from: 10,  to: 30 },
	{ id: '12dd',  from: 28,  to: 48 },
	{ id: '4sce',  from: 47,  to: 88 },
	{ id: 'p98d',  from: 57,  to: 81 },
	{ id: 'pwdi',  from: 65,  to: 77 },
	{ id: 'pi3u',  from: 71,  to: 91 },
	{ id: 'tu83',  from: 70,  to: 86 },
	{ id: 'zxs7',  from: 94,  to: 97 },
	{ id: 'weu2',  from: 22,  to: 28 },
];

let all_snakes = [
	{ id: 'sn_1',  from: 25,   to: 9 },
	{ id: 'sn_2',  from: 55,   to: 29 },
	{ id: 'sn_3',  from: 93,   to: 75 },
	{ id: 'sn_4',  from: 99,   to: 58 },
	{ id: 'sn_5',  from: 40,   to: 19 },
	{ id: 'sn_6',  from: 76,   to: 46 },
];

let game_ladders = [];
let game_snakes = [];



let calculated_ladder_styles = [];
let calculated_snake_styles = [];
let calculated_player_positions = [];
let calculated_perfect_throw_positions = [];




/**
 * calculate the total number of perfect throws required to win this game.
 */
export function calculatePerfectThrowsFromPosition( position ) {

	if( calculated_perfect_throw_positions[position] ) {
		return calculated_perfect_throw_positions[position];
	}

	let max_tiles = 100;
	let current_tile = 1;

	let does_this_tile_have_ladder = tileHasLadder(position);
	if( does_this_tile_have_ladder ) {
		return 'calculating..';
	}
	else {
		current_tile = position;
		let data = [];

		for (var i = 0; current_tile <= max_tiles; i++) {
			let result = runTheLoop( current_tile );
			data.push({ from: current_tile, dice: result.dice, position: result.position }); // this is so we can display detailed info if required. Not used currently though.
			current_tile = result.position;
		}

		if( current_tile >= 100 ) {
			// console.log('data',data);
			calculated_perfect_throw_positions[position] = data.length;
			return data.length;
		}

	}

}





const dice = 6;

function runTheLoop( tile ) {
	let ladders = find_ladders_between( tile );
	if( ladders ) {
		return { dice: ladders.dice, position: ladders.position }
	}
	else {
		let snakes = find_snakes_between( tile );
		return { dice: snakes.dice, position: snakes.position }
	}

}






function find_ladders_between( tile ) {
	let found_ladders = _.filter( game_ladders, function( ladder ) {
		return ladder.from >= tile && ladder.from <= tile+dice;
	});

	let ladder;
	if( found_ladders.length > 1 ) {
		ladder = _.orderBy(found_ladders, [ 'to' ], [ 'desc' ] );
		ladder = ladder[0];
	} else { ladder = found_ladders[0]; }

	// if theres a ladder in between use that, ignore about the snakes... they dont matter.
	if( ladder ) {
		return { position: ladder.to, dice: ladder.from - tile }
	} else { return null; }

}


function find_snakes_between( tile ) {
	let moves = dice;
	let check = false;

	while ( ! check ) {
		let snake = _.find( game_snakes, function( snake ) { return snake.from === tile+moves; } );
		if( snake ) {
			moves--;
		} else {
			check = true;
		}
	}

	return { position: tile+moves, dice: moves }
}


function tileHasLadder( tile ) {
	let ladder = _.find( game_ladders, function( ladder ) {
		return ladder.from === tile;
	});

	if( ladder ) { return true; }
	else { return false; }
}




export function generateGameboard() {
	const total_tiles = 100;
	const tile_styles = [ 'yellow', 'white', 'red', 'blue', 'green', 'white', 'red', 'yellow', 'green', 'blue' ];

	let tiles = [];
	let temp = [];
	let reverse = false;
	let count = 0;

	for ( let i = total_tiles; i > 0; i-- ) {
		count++;
		let random = Math.floor((Math.random() * 10));

		let tile = {
			id: i,
			type: 'normal',
			style: tile_styles[random],
		};

		if( reverse ) {
			temp.unshift( tile );
		} else {
			temp.push( tile );
		}

		if( count === 10 ) {
			reverse = !reverse;
			tiles = tiles.concat(temp);
			temp = [];
			count = 0;
		}

	}

	_( tiles ).forEach(function(tile, index) {
		mapping[tile.id] = index;
	});

	return tiles;

}



export function getPlayerStartingPosition() {
	return mapping[1] || 90;
}


export function getPlayerIndexBasedOnId( players, id ) {
	let index = players.findIndex( item => { return item.id == id; });
	return index;
}




export function randomBetweenRange( min, max ) {
	return Math.floor( Math.random() * (max-min+1) + min );
}

export function shuffle( o ) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};


export function generateLadders( difficulty ) {
	// 1: easy, 2: medium, 3: difficult, 4: hell mode
	let total_ladders = 0;

	if( difficulty === 1 ) {
		total_ladders = randomBetweenRange(8, 10);
	}
	if( difficulty === 2 ) {
		total_ladders = randomBetweenRange(4, 7);
	}
	if( difficulty === 3 ) {
		total_ladders = randomBetweenRange(2, 4);
	}
	if( difficulty === 4 ) {
		total_ladders = randomBetweenRange(0, 1);
	}
	if( total_ladders === 0 ) {
		return [];
	}

	let shuffled_array = shuffle( all_ladders );
	let ladders = shuffled_array.slice( 0, total_ladders )
	game_ladders = ladders;
	return ladders;


}




export function generateSnakes( difficulty ) {
	let total_snakes = 0;

	if( difficulty === 1 ) {
		total_snakes = randomBetweenRange(1, 3);
	}
	if( difficulty === 2 ) {
		total_snakes = randomBetweenRange(3, 5);
	}
	if( difficulty === 3 ) {
		total_snakes = randomBetweenRange(5, 7);
	}
	if( difficulty === 4 ) {
		total_snakes = randomBetweenRange(7, 10);
	}

	let shuffled_array = shuffle( all_snakes );
	let snakes = shuffled_array.slice( 0, total_snakes );
	game_snakes = snakes;
	return snakes;


}



export function calculatePlayerNewPosition( data ) {
	let pos = data.index + data.moves;
	if( pos > 100 ) { pos = 100; }

	let new_pos = mapping[pos];

	let result = {
		tile: new_pos,
		index: pos,
	};

	last_calculated_player_details = result;
	return result;
}



export function getLastCalculatedPlayerPosition( data ) {
	if( last_calculated_player_details.index ) {
		return last_calculated_player_details;
	}
	else {
		return {
			index: 1
		}
	}
}



export function getPlayerPositionCSSStyles( data ) {
	if( data.index > 100 ) { data.index = 100; }

	if( ! document.getElementById(`tile_${data.index}`) ) {
		let calculated = calculated_player_positions[data.id];
		return { top: calculated.top, left: calculated.left };
	}

	let tile = document.getElementById(`tile_${data.index}`).getBoundingClientRect();
	let gameboard = document.getElementById('gameboard').getBoundingClientRect();

	let top = tile.top + window.scrollY;
	let left = tile.left;

	top = top - ( gameboard.top + window.scrollY );
	left = left - gameboard.left;

	let padding_left = config.player.width * data.array_index;
	padding_left = padding_left + 8;
	left = left + padding_left + ( data.array_index * 2 );


	let padding_top = ( config.tile.width - config.player.width ) / 2;
	top = top + padding_top;

	let output = {
		top: `${top}px`,
		left: `${left}px`,
	};

	calculated_player_positions[data.id] = output;
	return output;

}




export function generateLadderStyle( data ) {
	let existing = calculated_ladder_styles[data.id];
	if( existing ) {
		return {
			top: existing.top,
			left: existing.left,
			height: existing.height,
			width: existing.width,
			transform: existing.transform || '',
		};
	}

	let from_tile = document.getElementById(`tile_${data.from}`).getBoundingClientRect();
	let to_tile = document.getElementById(`tile_${data.to}`).getBoundingClientRect();

	if( !gameboard ) {
		gameboard = document.getElementById('gameboard').getBoundingClientRect();
	}

	let to_tile_top = to_tile.top + window.scrollY;
	let from_tile_top = from_tile.top + window.scrollY;
	let gameboard_top = gameboard.top + window.scrollY;
	let ladder_position = 1;

	let left_tile = {};
	let right_tile = {};
	if( to_tile.left <= from_tile.left ) {
		left_tile = to_tile;
		right_tile = from_tile;
	} else {
		left_tile = from_tile;
		right_tile = to_tile;
	}

	if( to_tile.left < from_tile.left ) { ladder_position = -1; }

	let top = to_tile_top - gameboard_top;
	let height = from_tile_top - to_tile_top + ( config.tile.height - config.tile.margin );
	let left = left_tile.left - gameboard.left;
	let width = right_tile.left - left_tile.left - config.tile.margin + config.tile.width;

	let tile_css_styles = {
		top,
		left,
		height,
		width,
		ladder_position
	}

	tile_css_styles = getLadderTransformStyles( tile_css_styles );
	calculated_ladder_styles[data.id] = tile_css_styles;  // store this ladders calculated styles

	return tile_css_styles;

}



export function getLadderTransformStyles( div ) {
	let tile_count = ( div.width + config.tile.margin ) / config.tile.width;
	let tile_row_count = ( div.height + config.tile.margin ) / config.tile.height;

	let rotate_deg = 0;
	if( tile_count <= 1 ) { rotate_deg = 0; }
	else if( tile_count <= 2 ) {
		let number = 7;
		if( div.ladder_position === 1 ) {
			if( tile_row_count <= 4 ) { number = 10; }
		} else {
			if( tile_row_count <= 4 ) { number = 20; }
		}
		rotate_deg = number * tile_count;
	}
	else if( tile_count < 4 ) { rotate_deg = 7 * tile_count; }

	else if( tile_count < 5 ) {
		let number = 8;
		if( tile_row_count >= 4 && div.ladder_position != 1 ) { number = 11; }
		rotate_deg = number * tile_count;
	}

	else if( tile_count < 7 ) {
		rotate_deg = 13 * tile_count;
		div.top = div.top - ( 12 * tile_count );
		div.height = div.height + ( 26 * tile_count );
	}

	else { rotate_deg = 7 * tile_count; }

	if( tile_row_count === 1 ) {
		rotate_deg = 90;
		div.top = div.top - ( (div.width-div.height) / 2 );
		div.height = div.height + ( ( tile_count - 1 ) * config.tile.height );
	}

	let transform = `rotate(${ rotate_deg * div.ladder_position }deg)`;

	let styles = {
		top: `${div.top}px`,
		left: `${div.left}px`,
		height: `${div.height}px`,
		width: `${div.width}px`,
	}
	if( transform ) { styles.transform = transform; }

	return styles;

}




export function generateSnakeStyle( data ) {
	let existing = calculated_snake_styles[data.id];
	if( existing ) {
		return {
			top: existing.top,
			left: existing.left,
			height: existing.height,
			width: existing.width,
		};
	}

	let from_tile = document.getElementById(`tile_${data.to}`).getBoundingClientRect();
	let to_tile = document.getElementById(`tile_${data.from}`).getBoundingClientRect();
	if( !gameboard ) {
		gameboard = document.getElementById('gameboard').getBoundingClientRect();
	}

	let to_tile_top = to_tile.top + window.scrollY;
	let from_tile_top = from_tile.top + window.scrollY;
	let gameboard_top = gameboard.top + window.scrollY;
	let snake_position = -1;

	let left_tile = {};
	let right_tile = {};
	if( to_tile.left <= from_tile.left ) {
		left_tile = to_tile;
		right_tile = from_tile;
	} else {
		left_tile = from_tile;
		right_tile = to_tile;
	}

	if( to_tile.left < from_tile.left ) { snake_position = 1; }

	let top = to_tile_top - gameboard_top;
	let height = from_tile_top - to_tile_top + ( config.tile.height - config.tile.margin );
	let left = left_tile.left - gameboard.left;
	let width = right_tile.left - left_tile.left - config.tile.margin + config.tile.width;


	let tile_css_styles = {
		top: `${top}px`,
		left: `${left}px`,
		height: `${height}px`,
		width: `${width}px`,
	}

	if( snake_position === -1 ) {
		let tile_count = ( width + config.tile.margin ) / config.tile.width;
		tile_css_styles.transform = `rotate(${ tile_count * 30  }deg)`;
	}


	calculated_snake_styles[data.id] = tile_css_styles; // store this snake's calculated styles



	return tile_css_styles;

}






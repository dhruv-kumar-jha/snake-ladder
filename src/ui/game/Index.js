import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Action from 'app/redux/actions';
import Tile from 'app/components/game/Tile';
import Player from 'app/components/game/Player';
import Snake from 'app/components/game/Snake';
import LadderContainer from 'app/components/game/LadderContainer';


const mapStateToProps = ( state, ownProps ) => {
	return {
		gameboard: state.gameboard.get('board'),
		players: state.player.get('all'),
		start: state.game.get('config').get('start'),
		ladders_size: state.gameboard.get('ladders').size,
		snakes: state.gameboard.get('snakes'),
		winner: state.game.get('config').get('winner'),
	}
}

const mapDispatchToProps = dispatch => ({
	gameSetStart: () => dispatch( Action.gameSetStart() ),
});



let Game = ( props ) => {

	// delay a little so the html is rendered and we can access div/tile positions
	// this is definitely not required, but doing it this way i was able to get rid of some boilerplate code.
	setTimeout( () => {
		props.gameSetStart();
	}, 10 );



    return (
		<div>
		{ props.gameboard.size > 0 ?
			(
			<div className="gameboard-container">

				<div id="gameboard" className="gameboard flex row">
				{ props.gameboard.map( tile => {
						return(
							<Tile key={ tile.id } data={tile} />
						)
					})
				}
				</div>

				{ props.ladders_size > 0 && props.start &&
					<LadderContainer />
				}

				{ props.snakes.size > 0 && props.start &&
					<div className="snakes">
						{ props.snakes.map( snake => {
								return <Snake key={ 'snake_' + snake.id } data={ snake } />
							})
						}
					</div>
				}

				{ props.players.size > 0 && props.start &&
					<div className="players">
						{ props.players.map( player => {
								return(
									<Player key={ 'player_' + player.id } data={ player } />
								)
							})
						}
					</div>
				}

				{ props.winner !== null &&
					<div className="game-over flex">
						<h2>Game Over</h2>
					</div>
				}

			</div>
			)
			:
			(
			<div className="screen">
				<p>The board is empty right now, Please generate the board first.</p>
			</div>
			)

		}
		</div>
    )


}




const ConnectGame = connect(
	mapStateToProps,
	mapDispatchToProps
)(Game)


export default ConnectGame;


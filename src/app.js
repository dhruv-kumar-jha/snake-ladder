import React from 'react';
import { render } from 'react-dom';
import { Router, Redirect, Route, Link, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import store from './redux/stores';
import * as RouteMiddleware from 'app/global/middlewares/RouteMiddleware'


import GameLayout from './ui/layout/Game';
import Game from './ui/game';
import PageNotFound from './ui/all/PageNotFound';
import Stats from './ui/game/Stats';

import SelectMode from 'app/ui/init/Mode';
import SelectDifficulty from 'app/ui/init/Difficulty';
import SelectPlayers from 'app/ui/init/Players';


render(
	(
		<Provider store={ store }>
			<Router history={ browserHistory }>

				<Route path="init" component={ GameLayout } onEnter={ (nextState,replace) => { RouteMiddleware.gameNotStarted(nextState, replace, store) } }>
					<Route path="mode" component={ SelectMode } />
					<Route path="difficulty" component={ SelectDifficulty } />
					<Route path="players" component={ SelectPlayers } />
				</Route>

				<Route path="/" component={ GameLayout }>
					<IndexRoute component={ Game } onEnter={ (nextState,replace) => { RouteMiddleware.gameModeSelected(nextState, replace, store) } } />
					<Route path="stats" component={ Stats } onEnter={ (nextState,replace) => { RouteMiddleware.gameModeSelected(nextState, replace, store) } } />
					<Route path="*" component={ PageNotFound }/>
				</Route>

			</Router>
		</Provider>
	),
	document.getElementById('root')
);



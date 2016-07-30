import React from 'react';
import { Link, browserHistory } from 'react-router';

let PageNotFound = () => {

	let gotoGameScreen = (mode) => {
		browserHistory.push('/');
	}

	return (
		<div className="screen">

			<div className="page-not-found">
				<div className="heading m-0">
					<h2>The page you are looking for Doesn't exist or you dont have permissions to access it.</h2>
					<div className="m-t-20">
						<button onClick={ gotoGameScreen }>Back Home</button>
		        	</div>
		        </div>
	        </div>

		</div>
	)

}

export default PageNotFound;

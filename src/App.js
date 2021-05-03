import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import login from '../src/screens/login'
import signup from '../src/screens/signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import dashboard from './screens/dashboard';
import ProfileDetails from './screens/profile_details';
import '../src/assets/css/main.css'
import '../src/assets/css/color_skins.css'
import '../src/assets/css/custom.css'
import '../src/assets/css/chatapp.css'

// import '../src/assets/css/flaticon.css'
// import '../src/assets/css/owl.theme.default.min.css'
// import '../src/assets/css/owl.carousel.min.css'
import {useEffect} from 'react'
import StartAnswering from './screens/start-answering';
import BookQuestionList from './screens/book-question-list';
import Profile from './screens/profile';
import Answer from './screens/answer';

function App() {
	useEffect(() => {
		document.querySelector("body").classList.add("theme-blush")
	});

	return (
		<BrowserRouter>
			<Switch>
				
				<PublicRoute path="/signup" component={signup} />{' '}
				<PrivateApprovedRoute path="/dashboard" component={dashboard} />{' '}
				<PrivateRoute path="/profile-details/:page" component={ProfileDetails} />{' '}
				<PrivateApprovedRoute path="/start-answering" component={StartAnswering} />{' '}
				<PrivateApprovedRoute path="/book-question-list/:isbn" component={BookQuestionList} />{' '}
				<PrivateApprovedRoute path="/answer-question/:questionId" component={Answer} />{' '}
				<PrivateApprovedRoute path="/profile" component={Profile} />{' '}
				{/* <Route path="/product/:productId" component={ProductDetail} /> */}
				<PublicRoute path="/" exact component={login} />{' '}
			</Switch>
		</BrowserRouter>
	);
}

function PrivateRoute({ component, ...rest }) {
	let isAuthenticated = localStorage.getItem('tutor_token') && localStorage.getItem('tutor_token') !== 'undefined' ? true : false;
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					React.createElement(component, props)
				) : (
					<Redirect
						to={{
							pathname: '/',
						}}
					/>
				)
			}
		/>
	);
}

function PublicRoute({ component, ...rest }) {
	let isAuthenticated = localStorage.getItem('tutor_token') && localStorage.getItem('tutor_token') !== 'undefined' ? true : false;
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Redirect
						to={{
							pathname: '/dashboard',
						}}
					/>
				) : (
					React.createElement(component, props)
				)
			}
		/>
	);
}

function PrivateApprovedRoute({ component, ...rest }) {
	let isAuthenticated = localStorage.getItem('tutor_token') && localStorage.getItem('tutor_token') !== 'undefined' && localStorage.getItem('tutor_approve') == 1 ? true : false;
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					React.createElement(component, props)
				) : (
					<Redirect
						to={{
							pathname: '/profile-details/5',
						}}
					/>
				)
			}
		/>
	);
}

export default App;

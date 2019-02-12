import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../dux/reducer';
import './header.scss';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			showMenu: false
		};
		this.login = this.login.bind(this);
	}

	componentDidMount() {
		axios.get('/api/user-data').then(res => {
			// console.log("res", res);
			this.props.setUser(res.data.user);
		});
	}

	login() {
		let redirectUri = encodeURIComponent(
			window.location.origin + '/auth/callback'
		);
		window.location = `https://${
			process.env.REACT_APP_AUTH0_DOMAIN
		}/authorize?client_id=${
			process.env.REACT_APP_AUTH0_CLIENT_ID
		}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
		console.log('redirectUri', redirectUri);
	}

	logout = () => {
		axios.post('/api/logout').then(res => {
			this.props.setUser(null);
			this.props.history.push('/');
		});
	};

	toggleMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu
		});
	};

	render() {
		const { user } = this.props;
		return (
			<div className='header-container'>
				<NavLink to={'/'} className='header-homepage-navlink'>
					<div className='header-logo-container'>
						<img
							className='header-logo'
							src='./images/music-tree5.png'
							alt='Tree with music notes as leaves'
						/>
						<p className='header-name'>MELO-TREE</p>
					</div>
				</NavLink>
				<div className='menu-container'>
					<button className='display-menu-button' onClick={this.toggleMenu}>
						Menu
					</button>
				</div>
				<div
					className={
						this.state.showMenu ? 'show-menu-container' : 'hide-menu-container'
					}
				>
					{user ? (
						<>
							<ul>
								<li>
									<a href={`/user/${user.username}`}>{user.first_name}</a>
								</li>
								<li>
									<a href='/contact'>Contact</a>
								</li>
								<li>
									<a href='/about'>About</a>
								</li>
							</ul>
							<div className='log-btn-container'>
								<button className='logout-button' onClick={this.logout}>
									Logout
								</button>
							</div>
						</>
					) : (
						<>
							<ul>
								<li>
									<a href='/contact'>Contact</a>
								</li>
								<li>
									<a href='/about'>About</a>
								</li>
							</ul>
							<div className='log-btn-container'>
								<button className='login-button' onClick={this.login}>
									Login
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = {
	setUser: setUser
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Header)
);

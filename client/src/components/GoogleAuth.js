import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    }

    componentDidMount() {
        // google oauth initialization 
        window.gapi.load( 'client:auth2', () => {
            window.gapi.client.init({
                clientId: '1004066954193-aj4do6i98makjcjondf9l2c56104dc74.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    };

    // sign in and out button functions 
    onSignIn = () => {
        this.auth.signInClick();
    }

    onSignOut = () => {
        this.auth.signOutClick();
    }

    // automatically updates the login status
    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    // display of sign in/sign out buttons
    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

export default connect(null, { signIn, signOut })(GoogleAuth);
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        // google oauth initialization 
        window.gapi.load( 'client:auth2', () => {
            window.gapi.client.init({
                clientId: '1004066954193-aj4do6i98makjcjondf9l2c56104dc74.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    // sign in and out button functions 
    onSignInClick = () => {
        this.auth.signIn(this.auth.currentUser.get().getId());
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    // automatically updates the current login status through action creators
    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    // display of sign in/sign out buttons
    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
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
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                <div>{this.renderAuthButton()}</div>
                <div>{this.props.isSignedIn}</div>
            </div>
        
        )
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}


export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
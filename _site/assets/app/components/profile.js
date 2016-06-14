import React, { Component } from "react"
import fetch from "isomorphic-fetch"
import PubSub from "pubsub-js"
import Cache from "../cache"

class RegistrationForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <p>registrera dig eller logga in för att se din profil</p>
    }
}

class UserStats extends Component {
    render() {
        const { code } = this.props

        // TODO show points

        return (
            <ul>
                <li>Användarkod: <b>{code}</b></li>
            </ul>
        )
    }
}

// Main component
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: Cache.user,
            answers: []
        };
        // Re-bind methods
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        // Subscribe to events
        PubSub.subscribe("user.login", this.loginUser);
        PubSub.subscribe("user.logout", this.logoutUser);
    }

    // Fetch data
    componentDidMount() {
        this.fetchDomains();
        this.fetchQuizAnswers();
    }

    fetchAnswers() {
        // TODO: error handling?
        Cache.getAnswers(a => this.setState({ answers: a }));
    }

    loginUser(msg, user) {
        this.setState({ user: user });
    } 

    logoutUser() {
        this.setState({ user: null });
    }

    render() {
        if (!this.state.user) {
            // TODO register
            return (
                <div className="user-profile">
                    <RegistrationForm />
                </div>
            )
        }

        return (
            <div className="user-profile">
                <UserStats user={this.state.user} />
            </div>
        )
    }
}

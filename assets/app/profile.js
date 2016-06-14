import React, { Component } from "react"
import fetch from "isomorphic-fetch"
import PubSub from "pubsub-js"
import Cache from "./cache"

import { CREATE_USER_ENDPOINT } from "./endpoints"

const RegistrationForm = ({ setMessage }) => {
    let data = { email: "" }

    const submit = e => {
        e.preventDefault()

        if (data.email.length == 0 || data.email.indexOf("@") < 0) {
            setMessage("Vänligen fyll i en korrekt Epost")
            return false
        }

        const payload = {
            method: "POST",
            headers: new Headers({ 'Content-type': "application/json" }),
            body: JSON.stringify(data)
        }

        return fetch(CREATE_USER_ENDPOINT, payload)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        if (json.exists) {
                            setMessage("Eposten är redan registrerad")
                        } 

                        if (json.hasOwnProperty('user')) {
                            setMessage("")
                            Cache.updateUser(json.user)
                            PubSub.publish("user.login", json.user)
                        }
                    })
                } else {
                    setMessage("")
                    console.log("Error", res)
                }
            })
    }

    const setData = e => data[e.target.name] = e.target.value

    return (
        <div className="actions registration-form">
            <h5>Registrera dig eller logga in för att visa din profil</h5>

            <form onSubmit={submit}>
                <input
                    onChange={setData}
                    type="text"
                    name="email"
                    placeholder="Epost" />
                <button type="submit">Registrera</button>
            </form>
        </div>
    )
}

class UserStats extends Component {
    render() {
        const { code } = this.props.user

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
            answers: [],
            message: ""
        };
        // Re-bind methods
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        // Subscribe to events
        PubSub.subscribe("user.login", this.loginUser);
        PubSub.subscribe("user.logout", this.logoutUser);
    }

    // Fetch data
    componentDidMount() {
        this.fetchAnswers();
    }

    fetchAnswers() {
        Cache.getAnswers(a => this.setState({ answers: a }));
    }

    loginUser(msg, user) {
        this.setState({ user: user });
    } 

    logoutUser() {
        this.setState({ user: null });
    }

    setMessage(msg) {
        this.setState({ message: msg })
    }

    render() {
        if (!this.state.user) {
            return (
                <div className="user-profile">
                    <p className="registration-message">{this.state.message.length > 0 ? this.state.message : ''}</p>
                    <RegistrationForm setMessage={this.setMessage} />
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

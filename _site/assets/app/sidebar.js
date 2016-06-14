import React, { Component } from "react"
import fetch from "isomorphic-fetch"
import PubSub from "pubsub-js"
import Cache from "./cache"

// Message constants
const MESSAGE = {
    ERRCODE: "Inkorrekt användarkod"
}

// Login component
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { message : "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Get user code from form
        let code = this.refs.code.value;
        // If there is none, exit
        if (!code) {
            return false;
        }
        // Fetch user (from server or cache)
        Cache.getUser(code, user => {
            if (user instanceof Error) {
                this.setState({ message: MESSAGE.ERRCODE });
                return;
            }

            this.props.loginHandler(user);
        })
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <p>{this.state.message}</p>
                <input ref="code" type="text" placeholder="Användarkod" />
                <button type="submit">Logga in</button>
            </form>
        );
    }
}

// Logout component
class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    // Passed down from parent
    handleLogout() {
        this.props.logoutHandler();
    }

    render() {
        return <button type="submit" className="logout-button" onClick={this.handleLogout}>Logga ut</button>;
    }
}

// Helper function for returning a module
// function renderModule(m) {
//     return <Module module={m} />;
// }

// Component for a module
// class Module extends React.Component {
//     render() {
//         let href = "/domains/" + this.props.module.domain + "/modules/" + this.props.module.mid + ".html";
// 
//         return (
//             <li className={this.props.module.done ? "done" : ""}>
//                 <a href={href}>{this.props.module.name}</a>
//             </li>
//         );
//     }
// }

// Container component for all modules
// class Modules extends React.Component {
//     render() {
//         return <ol className="modules">{this.props.path.modules.map(renderModule)}</ol>;
//     }
// }


const MaterialItem = (m, i) => <li key={i}><a href={`/material/${m.id}.html`}>{m.name}</a></li>
const MaterialList = ({ items }) => <ol className="modules">{items.map(MaterialItem)}</ol>

// Main component
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: Cache.user,
            loggedin: Cache.userExists(),
            visible: true
        };
        // Re-bind methods
        this.loginUser = this.loginUser.bind(this);
        this.listenToUserLogin = this.listenToUserLogin.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.toggleVisible = this.toggleVisible.bind(this);
        this.updateUser = this.updateUser.bind(this);

        PubSub.subscribe("user.quiz.done", this.updateUser);
        PubSub.subscribe("user.login", this.listenToUserLogin);
    }

    updateUser(msg, u) {
        this.setState({ user: u });
    }

    loginUser(u) {
        this.setState({
            user: u,
            loggedin: true
        });

        PubSub.publish("user.login", u);
    }

    listenToUserLogin(u) {
        this.setState({
            user: u,
            loggedin: true
        });
    }

    logoutUser() {
        this.setState({
            user: null,
            loggedin: false
        });

        // Clear user from the cache
        Cache.updateUser(null);
        PubSub.publish("user.logout", null);
    }
    // Toggles visibility of the sidebar
    toggleVisible() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        // If the user is not logged in
        if (!this.state.loggedin) {
            return <Login loginHandler={this.loginUser} />;
        }

        return (
            <div className={this.state.visible ? "show" : "hide"}>
                <h5 onClick={this.toggleVisible} className="sidebar-links-header">
                    Material <span className="show-hide">{this.state.visible ? "dölj" : "visa"}</span>
                </h5>
                <MaterialList items={Cache.material} />
                <Logout logoutHandler={this.logoutUser} />
            </div>
        );
    }
}

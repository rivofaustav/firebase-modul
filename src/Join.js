import React, {useState, useContext} from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then (res => {
                if (res.user) Auth.setLoggedIn(true);
            })
            .catch(e => {
                setErrors(e.message);
            });
    };

    const joinGoogle = e => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    return (
        <div>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="email"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                />
                <hr />
                <button class="googleBtn" type="button" onClick={joinGoogle}>
                    <img
                         src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                         alt="logo"
                    />
                    Join With Google
                </button>

                <button type="submit">Login</button>

                <span>{error}</span>
            </form>
        </div>
    );
}

export default Join;
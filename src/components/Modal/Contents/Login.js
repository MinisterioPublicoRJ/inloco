import React from 'react'

const Login = ({ onLoginClick }) => {
    let userNameInput;
    let passwordInput;

    const handleLoginClick = () => {
        let data = {
            "username": userNameInput.value,
            "password": btoa(passwordInput.value),
        }
        onLoginClick(data)
    }

    return (
        <article className="login-container">
            <form>
                <fieldset>
                    <span>
                        <label> Nome de usuário </label>
                        <input type="text" required ref={(input) => { userNameInput = input; }} />
                    </span>
                    <span>
                        <label> Senha </label>
                        <input type="password" required ref={(input) => { passwordInput = input; }}/>
                    </span>
                    <a role="button" className="login-button" onClick={() => handleLoginClick()}>Entrar</a>
                </fieldset>
            </form>
        </article>
    )
}

export default Login

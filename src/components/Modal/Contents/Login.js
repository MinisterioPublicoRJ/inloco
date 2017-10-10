import React from 'react'

const Login = () => {

    return (
        <article className="login-container">
            <form>
                <fieldset>
                    <span>
                        <label> Nome de usuário </label>
                        <input required />
                    </span>
                    <span>
                        <label> Senha </label>
                        <input required />
                    </span>
                    <a role="button" className="login-button">Entrar</a>
                </fieldset>
            </form>
        </article>
    )
}

export default Login

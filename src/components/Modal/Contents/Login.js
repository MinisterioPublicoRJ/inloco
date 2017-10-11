import React from 'react'

const Login = ({ loginError, loginStatus, onLoginClick }) => {
    let userNameInput;
    let passwordInput;

    const handleKeyPress = (target) => {
        if(target.charCode === 13){
            console.log('Enter clicked!!!')
            let data = {
                "username": userNameInput.value,
                "password": btoa(passwordInput.value),
            }
            onLoginClick(data)
        }
    }
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
                        <input type="text" onKeyPress={handleKeyPress} ref={(input) => { userNameInput = input; }} />
                    </span>
                    <span>
                        <label> Senha </label>
                        <input type="password" onKeyPress={handleKeyPress} ref={(input) => { passwordInput = input; }}/>
                    </span>
                    <a role="button" className="login-button" onClick={() => handleLoginClick()}>Entrar</a>
                    {loginError ? <span className="error"> Credenciais erradas. Tente novamente. </span> : null}
                </fieldset>
            </form>
        </article>
    )
}

export default Login

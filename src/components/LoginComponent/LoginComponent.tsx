import React from 'react'
import './LoginComponent.scss'
import { Link } from "react-router-dom";

const LoginComponent : React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="header_container">
          <p id="loginAlert" className="header-loginText"><i className="fa fa-check" aria-hidden="true"></i> You've
            successfully entered in your account!
            <Link to={'/messages/'}>Messages</Link></p>
        </div>
      </header>

      <main className="main">
        <div className="main_container">
          <div className="main_left">
            <img src="https://image.prntscr.com/image/cYwsoo9lSCSvjsRnp1tAHg.png" alt="Square" />
          </div>
          <div className="main_right">
            <h3 className="main_right-title">Log in</h3>
            <Link to={'/register/'} className="main_right-link">Not a member?</Link>
            <form className="main_form">
              <input type="email" name="email" id="email" placeholder="Email..." className="main_form-input" />
              <input type="password" name="password" id="password" placeholder="Password..."
                     className="main_form-input" />
              <p className="main_form-error" id="loginError"></p>
              <div className="main_form_bottom loginMain_form_bottom">
                <input type="button" name="login" id="login" className="main_form-btn" value="Log in" />
                <div id="loginInputBlocker" className="login-inputBlocker"></div>
                <Link to={'/reset/'}>Forgot password?</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginComponent
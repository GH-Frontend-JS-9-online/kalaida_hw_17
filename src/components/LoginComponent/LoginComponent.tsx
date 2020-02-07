import React, { useState, useEffect, ComponentState } from 'react'
import './LoginComponent.scss'
import { Link } from "react-router-dom";

const LoginComponent : React.FC = () => {
  const [emailLogin, setEmailLogin] : React.ComponentState = useState('');
  const [passwordLogin, setPasswordLogin] : React.ComponentState = useState('');
  const [loginBlocker, setLoginBlocker] : React.ComponentState = useState('login-inputBlocker');
  const [loginError, setLoginError] : React.ComponentState = useState('');
  const [showNumber, setShowNumber] : React.ComponentState = useState(0);
  const emailTestString : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const testLetters : RegExp= /[a-zA-Z]/;
  const testNumber : RegExp = /[0-9]/;
  let dbUsers : any = [];

  const sendRequest = (url : string, body = null) => {
    return fetch(url)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        return response.json().then(error => {
          const err : any = new Error('Something went wrong');
          err.data = error;
          throw err;
        })
      });
  }

  const handleEmailChange = (e : any) => {
    setEmailLogin(e.target.value);
  }

  useEffect(() => {
    if(!emailTestString.test(emailLogin)) {
      setLoginBlocker('login-inputBlocker');
      setLoginError('Oops, looks like email or password is incorrect. Please try again.');
    } else {
      setLoginBlocker('login-inputBlocker login-inputBlockerNo');
      setLoginError('');
    }
  }, [emailLogin, emailTestString, loginBlocker]);

  const handlePasswordChange = (e : any) => {
    setPasswordLogin(e.target.value);
  }

  useEffect(() => {
    if(passwordLogin.length < 4 || !testLetters.test(passwordLogin) || !testNumber.test(passwordLogin) || passwordLogin.length > 16) {
      setLoginBlocker('login-inputBlocker');
      setLoginError('Oops, looks like email or password is incorrect. Please try again.');
    } else {
      setLoginBlocker('login-inputBlocker login-inputBlockerNo');
      setLoginError('');
    }
  }, [passwordLogin, testLetters, testNumber, loginBlocker])

  const handleLoginSubmit = (e : any) => {
    sendRequest('http://localhost:3000/users')
      .then(data => {
        let checkUserNumber : number = -1,
          checkEmailNumber : number = 0,
          decryptedPass : string = '';
        dbUsers = data;
        for(let i = 0; i < dbUsers.length; i++) {
          if(emailLogin === dbUsers[i].email) {
            checkEmailNumber = i;
            i = dbUsers.length - 1;
          }
        }
        if(checkEmailNumber !== -1) {
          for(let i = 0; i < dbUsers[checkEmailNumber].password.length; i++) {
            decryptedPass += dbUsers[checkEmailNumber].password[i];
            i += 7;
          }
          if(passwordLogin === decryptedPass) {
            checkUserNumber = 1;
          } else {
            checkUserNumber = 0;
          }
        }
        if(checkUserNumber === 1) {
          setShowNumber(1);
          setEmailLogin('');
          setPasswordLogin('');
          sessionStorage.setItem('login_user_id', '');
          sessionStorage.setItem('login_user_id', dbUsers[checkEmailNumber].id)
        } else {
          alert('Account was not found');
          document.location.reload();
        }
      })
      .catch(err => console.log(err))
  }

  const showHeader = () => {
    return (
      <header className="header">
        <div className="header_container">
          <p id="loginAlert" className="header-loginText header-loginTextLogin"><i className="fa fa-check" aria-hidden="true"></i> You've
            successfully entered in your account!
            <Link to={'/messages/'} className="header-link">Messages</Link></p>
        </div>
      </header>
    )
  }

  return (
    <>
      { showNumber === 1 ? showHeader() : null }

      <main className="main">
        <div className="main_container">
          <div className="main_left">
            <img src="https://image.prntscr.com/image/cYwsoo9lSCSvjsRnp1tAHg.png" alt="Square" />
          </div>
          <div className="main_right">
            <h3 className="main_right-title">Log in</h3>
            <Link to={'/register/'} className="main_right-link">Not a member?</Link>
            <form className="main_form">
              <input type="email" name="email" id="email" value={emailLogin} placeholder="Email..." onChange={handleEmailChange} className="main_form-input" />
              <input type="password" name="password" id="password" value={passwordLogin} placeholder="Password..." onChange={handlePasswordChange} className="main_form-input" />
              <p className="main_form-error" id="loginError">{loginError}</p>
              <div className="main_form_bottom loginMain_form_bottom">
                <input type="button" name="login" id="login" className="main_form-btn" onClick={handleLoginSubmit} value="Log in" />
                <div id="loginInputBlocker" className={loginBlocker}></div>
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
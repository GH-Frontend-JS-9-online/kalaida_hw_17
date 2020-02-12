import React, { useState, useEffect } from 'react'
import './ChangePasswordComponent1.scss'
import './ChangePasswordComponent2.scss'
import {Link} from "react-router-dom";

const ChangePasswordComponent : React.FC = () => {
  const [resetEmail, setResetEmail] : React.ComponentState = useState('');
  const [reset2Password, setReset2Password] : React.ComponentState = useState('');
  const [reset2ConfirmPassword, setReset2ConfirmPassword] : React.ComponentState = useState('');
  const [reset1InputBlocker, setReset1InputBlocker] : React.ComponentState = useState('reset1-inputBlocker');
  const [reset2InputBlocker, setReset2InputBlocker] : React.ComponentState = useState('reset2-inputBlocker');
  const [reset1Error, setReset1Error] : React.ComponentState = useState('');
  const [reset2Error, setReset2Error] : React.ComponentState = useState('');
  const [showNumber, setShowNumber] : React.ComponentState = useState(0)
  const emailTestString : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const testLetters : RegExp = /[a-zA-Z]/;
  const testNumber : RegExp = /[0-9]/;

  const sendRequest = (url : string, body = null) => {
    return fetch(url,{
      method : 'GET',
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU'
      },
    })
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

  const sendRequestPost = (url : string, myPass : string, myConfirmPass : string, myEmail : string) => {
    return fetch(url, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU'
      },
      body : JSON.stringify({
        password: myPass,
        confirmationPassword: myConfirmPass,
        email: myEmail,
        // id: myId
      }),
    })
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

  const showMainForm1 = () => {
    return(
      <form className="main_form" id="resetForm">
        <input type="email" name="resetEmail" id="resetEmail" value={resetEmail} onChange={handleResetEmailChange} placeholder="Email..." className="main_form-input resetMain_form-input" />
        <p className="main_form-error" id="reset1Error">{reset1Error}</p>
        <div className="main_form_bottom resetMain_form_bottom">
          <p className="resetMain_form-text">You'll receive an email with a link reset password. Link is valid for
            30 min only.</p>
          <input type="button" name="reset1" id="reset1" className="main_form-btn" onClick={handleReset1Btn} value="Reset" />
          <div id="reset1InputBlocker" className={reset1InputBlocker}></div>
        </div>
      </form>
    )
  }

  const handleResetEmailChange = (e : any) => {
    setResetEmail(e.target.value);
  }

  useEffect(() => {
    if(!emailTestString.test(resetEmail)) {
      setReset1InputBlocker('signup-inputBlocker');
      setReset1Error('Email is incorrect');
    } else {
      setReset1InputBlocker('signup-inputBlocker signup-inputBlockerNo');
      setReset1Error('');
    }
  }, [resetEmail, emailTestString, reset1InputBlocker])

  const handleCheckEmail = () => {
    setShowNumber(2);
  }

  const showResetMainMessage = () => {
    return (
      <div className="resetMain_message" id="resetMainMessage">
        <p className="resetMain_message-text">Please check your email for a reset link. It is valid for 30 min
          only.</p>
        <div className="resetMain_message_bottom">
          <button id="checkEmailBtn" className="resetMain_message-btn" onClick={handleCheckEmail}>Check</button>
        </div>
      </div>
    )
  }

  const handleReset1Btn = (e : any) => {
    e.preventDefault();

    sendRequest( 'https://geekhub-frontend-js-9.herokuapp.com/api/users/all')
      .then(data => {
        let resetNumber : number = 0;
        let resetEmailId : number = 0;
        let dbEmails = data;
        for(let i = 0; i < dbEmails.length; i++) {
          if(resetEmail === dbEmails[i].email) {
            resetNumber = 1;
            resetEmailId = i;
            i = dbEmails.length - 1;
          } else {
            resetNumber = 0
          }
        }
        if(resetNumber === 1) {
          setShowNumber(1);
        } else {
          alert('Account was not found!');
          document.location.reload();
        }
      })
      .catch(error => console.log(error))
  }

  const showResetMain2Form = () => {
    return (
      <form className="main_form" id="resetMain2Form">
        <input type="password" name="reset2Pass" id="reset2Pass" value={reset2Password} onChange={handleResetPass2} placeholder="Password" className="main_form-input" />
        <input type="password" name="reset2ConfirmPass" id="reset2ConfirmPass" value={reset2ConfirmPassword} onChange={handleResetConfirmPass2} placeholder="Confirm Password..." className="main_form-input" />
        <p className="main_form-error" id="reset2Error">{reset2Error}</p>
        <div className="main_form_bottom">
          <input type="button" name="change" id="change" onClick={handleReset2Btn} className="main_form-btn" value="Change" />
          <div id="reset2InputBlocker" className={reset2InputBlocker}></div>
        </div>
      </form>
    )
  }

  const handleResetPass2 = (e : any) => {

    setReset2Password(e.target.value);

  }

  useEffect(() => {
    sendRequest( 'http://localhost:3000/users')
      .then(data => {
        if(reset2ConfirmPassword !== reset2Password || (reset2Password.length < 4 || !testLetters.test(reset2Password) || !testNumber.test(reset2Password) || reset2Password.length > 16)) {
          setReset2InputBlocker('reset2-inputBlocker');
          setReset2Error('Password is incorrect!');
        } else {
          setReset2InputBlocker('reset2-inputBlocker reset2-inputBlockerNo');
          setReset2Error('');
        }
      })
      .catch(error => console.log(error))
  })
  


  const handleResetConfirmPass2 = (e : any) => {
    setReset2ConfirmPassword(e.target.value);

  }

  const handleReset2Btn = (e : any) => {
    e.preventDefault();

    sendRequestPost('https://geekhub-frontend-js-9.herokuapp.com/api/users/reset_password', reset2Password, reset2ConfirmPassword, resetEmail)
      .then(data => {
        console.log(data)
        alert('Password was changed!');
        document.location.reload();
      })
      .catch(error => {
        console.log(error)
        alert('Account was not found');
        document.location.reload();
      })

    // sendRequest( 'http://localhost:3000/users')
    //   .then(data => {
    //     let emailId : number = -1,
    //       userNum : number = 0;
    //     const dbEmails = data;
    //     let decryptedPass : string = '';
    //     for(let i = 0; i < dbEmails.length; i++) {
    //       if(resetEmail === dbEmails[i].email) {
    //         emailId = dbEmails[i].id;
    //         userNum = i;
    //         i = dbEmails.length - 1;
    //       }
    //     }
    //     if(emailId !== -1) {
    //       console.log(emailId);
    //       for(let i = 0; i < dbEmails[userNum].password.length; i++) {
    //         decryptedPass += dbEmails[userNum].password[i];
    //         i += 7;
    //       }
    //       alert('Password was changed!(It doesn\'t work! I am sorry but I dont know how to do this((( )');
    //       alert(`Your password: ${decryptedPass}`);
    //       document.location.reload();
    //     } else {
    //       alert('Account was not found');
    //       document.location.reload();
    //     }
    //   })
    //   .catch(error => console.log(error))
  }

  return (
    <main className="main">
      <div className="main_container">
        <div className="main_left">
          <img src="https://image.prntscr.com/image/cYwsoo9lSCSvjsRnp1tAHg.png" alt="Square" />
        </div>
        <div className="main_right">
          <h3 className="main_right-title">Reset password</h3>
          <Link to={'/register/'} className="main_right-link">Not a member?</Link>
          <p className="reset2Main_right-text" id="reset2MainRightText">Please enter your new password.</p>

          { showNumber === 0 ? showMainForm1() : null }

          { showNumber === 1 ? showResetMainMessage() : null }

          <div className="resetMain2">

            { showNumber === 2 ? showResetMain2Form() : null }

          </div>
        </div>
      </div>
    </main>
  )
}

export default ChangePasswordComponent
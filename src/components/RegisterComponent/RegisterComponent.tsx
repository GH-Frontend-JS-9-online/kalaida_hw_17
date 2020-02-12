import React, {useState, useEffect, ComponentState} from 'react'
import './RegisterComponent.scss'
import { Link } from "react-router-dom";
import validator from "validator";

const RegisterComponent : React.FC = () => {
  const [nameRegister, setNameRegister] : React.ComponentState = useState('');
  const [emailRegister, setEmailRegister] : React.ComponentState = useState('');
  const [passwordRegister, setPasswordRegister] : React.ComponentState = useState('');
  const [registerBlocker, setRegisterBlocker] : React.ComponentState = useState('signup-inputBlocker');
  const [registerError, setRegisterError] : React.ComponentState = useState('');
  // const encryptSymbols : string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890_#$/';
  const idSymbols : string = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const userPosts : Array<string> = ['UX/UI Designer', 'Java Developer', 'Mobile Developer', 'Graphics Developer', 'Data Scientist', 'Security Developer', 'High-Level Developer',
    'Low-Level Developer', 'Big Data Developer', 'DevOps Developer', 'CRM Developer',  'Desktop Developer', 'Wordpress Developer', 'App Developer', 'Game Developer',
    'JavaScript Developer', 'Ruby Developer', 'QA', 'Backend Developer', 'Frontend Developer', 'Full-stack Developer', 'Manager', 'Investor Platinum', 'Investor Gold',
    'Investor Silver', 'GeekHub Student'];
  const userAddresses = ["17 Poplar Dr. Modesto, CA 95350", "855 Peg Shop Ave. Salinas, CA 93906", "143 Ann Dr. Los Angeles, CA 90066",
    "25 Rockville St. San Jose, CA 95123", "992 County Road Chula Vista, CA 91911", "5 Marshall Lane Flushing, NY 11354", "7 Linden St. Rego Park, NY 11374",
    "7042 Shore St. Brooklyn, NY 11203", "7938 Chapel Street Orlando, FL 32812", "74 Mayflower Drive Panama City, FL 32404"]
  // const emailTestString : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const testLetters : RegExp = /[a-zA-Z]/;
  const testNumber : RegExp = /[0-9]/;
  const testName : RegExp = /^[A-Za-z][A-Za-z0-9]*$/;
  let dbUsers : any, secondDbUsers : any;

  function sendRequest(url : string, myJob : string, myPhone : string, myAddress : string, myName : string, myEmail : string, myPass : string) {
    return fetch(url, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        position: myJob,
        description: 'Master/Lomaster.',
        phone: myPhone,
        address: myAddress,
        organization: 'GeekHub Corp',
        name: myName,
        email: myEmail,
        password: myPass,
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

  const handleNameRegisterChange = (e : any) => {
    setNameRegister(e.target.value);
  }

  const handleEmailRegisterChange = (e : any) => {
    setEmailRegister(e.target.value);
  }

  useEffect(() => {
    if(!testName.test(nameRegister) || nameRegister.length < 4 || nameRegister.length > 36 || !validator.isEmail(emailRegister) || passwordRegister.length < 4 || !testLetters.test(passwordRegister) || !testNumber.test(passwordRegister) || passwordRegister.length > 24) {
      setRegisterBlocker('signup-inputBlocker');
      setRegisterError('Oops, looks like name, email or password is incorrect. Please try again.');
    } else {
      setRegisterBlocker('signup-inputBlocker signup-inputBlockerNo');
      setRegisterError('');
    }
  }, [passwordRegister, testLetters, testNumber, emailRegister, registerBlocker, testName, nameRegister]);

  const handlePasswordRegisterChange = (e : any) => {
    setPasswordRegister(e.target.value);
  }

  const handleSubmitRegister = (e : any) => {
    e.preventDefault();
    // const registerId : string = `f${(~~(Math.random()*1e8)).toString(16)}`;
    let registerName : string = '',
      registerPhone : string = '+48 ',
      encryptedPass : string = '',
      // encryptString : string = '',
      // userId : string = '',
      registerJob : string = userPosts[Math.floor(Math.random() * userPosts.length)],
      registerAddress : string = userAddresses[Math.floor(Math.random() * userAddresses.length)];

    // for(let i = 0; i < emailRegister.length; i++) {
    //   if(emailRegister[i] !== '@') {
    //     registerName += emailRegister[i];
    //   } else {
    //     i = emailRegister.length - 1
    //   }
    // }

    for(let i = 0; i < 9; i++) {
      registerPhone += Math.floor((Math.random() * 9));
    }

    // for(let i = 0; i < passwordRegister.length; i++) {
    //   encryptedPass += passwordRegister[i];
    //
    //   for(let j = 0; j < 7; j++) {
    //     encryptString += encryptSymbols[Math.floor(Math.random() * encryptSymbols.length)];
    //   }
    //
    //   encryptedPass += encryptString;
    //   encryptString = '';
    // }
    //
    // for(let i = 0; i < 16; i++) {
    //   userId += idSymbols[Math.floor(Math.random() * idSymbols.length)];
    // }

    sendRequest('https://geekhub-frontend-js-9.herokuapp.com/api/users/', registerJob, registerPhone, registerAddress, nameRegister, emailRegister, passwordRegister)
      .then((data) => {
        alert('You\'ve successfully registered!');
        console.log(data)
        // document.location.reload();
      })
      .catch(error => {
        console.log(error)
        alert('Account already exist');
      })
  }

  return (
    <main className="main">
      <div className="main_container">
        <div className="main_left">
          <img src="https://image.prntscr.com/image/cYwsoo9lSCSvjsRnp1tAHg.png" alt="Square" />
        </div>
        <div className="main_right">
          <h3 className="main_right-title">Sign Up</h3>
          <Link to={'/'} className="main_right-link">Existing member?</Link>
          <form className="main_form">
            <input type="text" name="regName" id="regName" placeholder="Name..." value={nameRegister} onChange={handleNameRegisterChange} className="main_form-input"/>
            <input type="email" name="regEmail" id="regEmail" placeholder="Email..." value={emailRegister} onChange={handleEmailRegisterChange} className="main_form-input"/>
            <input type="password" name="regPassword" id="regPassword" placeholder="Password..." value={passwordRegister} onChange={handlePasswordRegisterChange} className="main_form-input" />
            <p className="main_form-error" id="regError">{registerError}</p>
            <div className="main_form_bottom signupMain_form_bottom">
              <input type="button" name="signup" id="signup" className="main_form-btn" onClick={handleSubmitRegister} value="Sign Up" />
              <div id="signupInputBlocker" className={registerBlocker}></div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default RegisterComponent
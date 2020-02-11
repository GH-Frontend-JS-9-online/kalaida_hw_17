import React, { useState, useEffect, ComponentState } from 'react'
import './MessagesComponent.scss'
import { Link } from "react-router-dom";

const MessagesComponent : React.FC = () => {
  // const [ asideName, setAsideName ] =  useState('');
  // const [ asidePosition, setAsidePosition ] =  useState('');
  // const [ asideDescription, setAsideDescription ] =  useState('');
  // const [ asideEmail, setAsideEmail ] =  useState('');
  // const [ asidePhone, setAsidePhone ] =  useState('');
  // const [ asideAddress, setAsideAddress ] =  useState('');
  // const [ asideOrganization, setAsideOrganization ] =  useState('');
  const [ showNumber, setShowNumber ] = useState(0);
  // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const idSymbols = 'abcdefghijklmnopqrstuvwxyz1234567890';
  // const wordsTemplates = ['Hello! How r u doing?', 'Hi! How was your day?', 'What\'s up bro!', 'Yo man!!'];




  const showMainMessages = () => {
    return (
      <>
        <header className="messagesHeader">
          <div className="messagesHeader_container">
            <div className="messagesHeader_left">
              <img src="https://image.prntscr.com/image/qKdNjt1VQcaxYyMVA3vEmg.png" alt="Logo" />
            </div>
            <div className="messagesHeader_right">
              <button className="messagesHeader_right-btn">Add <span> +</span></button>
              <Link to={'#'} className="messagesHeader_right-search"><i className="fa fa-search" aria-hidden="true"></i></Link>
              <Link to={'#'} className="messagesHeader_right-notifications"><i className="fa fa-bell-o" aria-hidden="true"></i></Link>
              <Link to={'#'} className="messagesHeader_right-profile">
                <div className="messagesHeader_right-profile-avatar"></div>
                <i className="fa fa-chevron-down" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </header>

        <main className="mainMessages">
          <div className="mainMessages_sidebar">
            <div className="mainMessages_sidebar_links">
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-home" aria-hidden="true"></i></Link>
              <Link to={'/projects'} className="mainMessages_sidebar-link"><i className="fa fa-bars" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-line-chart" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-linkActive"><i className="fa fa-envelope" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-users" aria-hidden="true"></i></Link>
            </div>
          </div>
          <div className="mainMessages_content">
            <div className="mainMessages_bar">
              <div className="mainMessages_bar_left">
                <div className="mainMessages_bar_links">
                  <Link to={'#'} className="mainMessages_bar-link mainMessages_bar-linkActive"><i className="fa fa-inbox" aria-hidden="true"></i> Inbox</Link>
                  <Link to={'#'} className="mainMessages_bar-link"><i className="fa fa-paper-plane" aria-hidden="true"></i> Sent</Link>
                  <Link to={'#'} className="mainMessages_bar-link"><i className="fa fa-trash" aria-hidden="true"></i> Trash</Link>
                </div>
              </div>
              <div className="mainMessages_bar_right">
                <form>
                  <label htmlFor="filterSelect" className="mainMessages_bar-filterText">Filter messages:</label>
                  <select name="filterSelect" id="filterSelect">
                    <option value="Date">Date</option>
                  </select>
                </form>
              </div>
            </div>
            <div className="mainMessages_bottom">
              <div className="conversations">
                <button className="conversations-btn" id="newConversationBtn"><span>+</span> New Conversation</button>
              </div>
              <div className="messaging">
                <form id="messagingForm">
                  <div className="messaging-inputBlocker"></div>
                  <input type="text" name="message" id="messageInput" className="messaging-input"
                         placeholder="Write a message" />
                </form>
                <div className="messaging_content">
                  <div className="messaging_content_left">
                    {/* <div class="messaging_content_left_comment">*/}
                    {/* <div class="messaging_content_left-avatar"></div>*/}
                    {/* <div class="messaging_content_left_content">*/}
                    {/*  <p class="messaging_content_left-message">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ulla pariatur.</p>*/}
                    {/*<p class="messaging_content_left-date">4 April 2016, 5:32 PM</p>*/}
                    {/* </div>*/}
                    {/* </div>*/}
                  </div>
                  <div className="messaging_content_right">
                    {/*<div class="messaging_content_right_comment">*/}
                    {/*<div class="messaging_content_right_content">*/}
                    {/*<p class="messaging_content_right-message">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>*/}
                    {/*<p class="messaging_content_right-date">4 April 2016, 5:32 PM</p>*/}
                    {/*</div>*/}
                    {/*<div class="messaging_content_right-avatar"></div>*/}
                    {/* </div>*/}
                  </div>
                </div>
              </div>
              <div className="aside">


              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  const showNeedLoginSection = () => {
    return (
      <>
        <div id="needLogin">
          <Link to={'/'}>Please login in your account!</Link>
        </div>
      </>
    )
  }


  return (
    <>
      { showNumber === 0 ? showMainMessages() : null}
      { showNumber === 1 ? showNeedLoginSection() : null }
    </>
  )
}

export default MessagesComponent
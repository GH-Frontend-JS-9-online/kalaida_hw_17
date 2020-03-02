import React, { useState, useEffect } from 'react';
import './HomeComponent.scss';
import Calendar from 'react-calendar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from "react-router-dom";

const HomeComponent : React.FC = () => {
  const [ showNumber, setShowNumber ] : React.ComponentState = useState(0);
  let projectIndex = -1;
  const projects : any = localStorage.getItem('sorted_projects_array');
  let parsedProjects : any = JSON.parse(projects);
  let loginUserId : any = localStorage.getItem('login_user_id');

  useEffect(() => {

    if(loginUserId.length < 1) {
      setShowNumber(1)
    } else {
      setShowNumber(0)
    }
  }, [showNumber, loginUserId]);

  const sendRequest = (url : string, method : any, body = null) => {
    return fetch(url, {
      method: method,
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU'
      }
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        return response.json()
          .then(error => {
            const err : any = new Error('Something went wrong');
            err.data = error;
            throw err;
          })
      })
  };

  const sendRequestDel = (url : string, body = null) => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        return response.json()
          .then(error => {
            const err : any = new Error('Something went wrong');
            err.data = error;
            throw err;
          })
      })
  };

  setInterval(function () {
    sendRequest('https://geekhub-frontend-js-9.herokuapp.com/api/projects', 'GET')
      .then(data => {
        localStorage.setItem('projects_array', JSON.stringify(data));
        return data;
      })
      .catch(error => console.log(error));

    let projectsArray : any = [];

    let localStorageProjects : any = localStorage.getItem('projects_array');
    let parsedLocalStorageProjects : any = JSON.parse(localStorageProjects);

    for(let i : number = 0; i < parsedLocalStorageProjects.length; i++) {
      if(parsedLocalStorageProjects[i].assigned !== null) {
        projectsArray.push(parsedLocalStorageProjects[i])
      }
    }

    localStorage.setItem('sorted_projects_array', JSON.stringify(projectsArray));

    let projectsArrayLength : any = projectsArray.length;

    localStorage.setItem('projects_count', projectsArrayLength)
  }, 500);

  const deleteProject = () => {
    let projectId = parsedProjects[projectIndex]._id;
    sendRequestDel(`https://geekhub-frontend-js-9.herokuapp.com/api/projects/${projectId}`)
      .then(data => {
        console.log(data);
        alert('Project was deleted! Please reload webpage to see changes!');
      })

  };

  const showHome = () => {

    return (
      <>
        <header className="messagesHeader">
          <div className="messagesHeader_container">
            <div className="messagesHeader_left">
              <img src="https://image.prntscr.com/image/qKdNjt1VQcaxYyMVA3vEmg.png" alt="Logo" />
            </div>
            <div className="messagesHeader_right">
              <Link to={'/add_project'} className="messagesHeader_right-btn">Add <span> +</span></Link>
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
              <Link to={'#'} className="mainMessages_sidebar-linkActive"><i className="fa fa-home" aria-hidden="true"></i></Link>
              <Link to={'/projects'} className="mainMessages_sidebar-link"><i className="fa fa-bars" aria-hidden="true"></i></Link>
              <Link to={'/insights'} className="mainMessages_sidebar-link"><i className="fa fa-line-chart" aria-hidden="true"></i></Link>
              <Link to={'/messages'} className="mainMessages_sidebar-link"><i className="fa fa-envelope" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-users" aria-hidden="true"></i></Link>
            </div>
          </div>
          <div className="mainMessages_content">

          </div>
        </main>
      </>
    )
  };

  const showNeedLoginSection = () => {
    return (
      <>
        <div id="needLogin">
          <Link to={'/'}>Please login in your account!</Link>
        </div>
      </>
    )
  };

  return(
    <>
      { showNumber === 1 ? showNeedLoginSection() : showHome() }
    </>
  );
};

export default HomeComponent;

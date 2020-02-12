import React, {useEffect, useState} from 'react'
import './ProjectsComponent.scss'
import { Link } from "react-router-dom";

const ProjectsComponent : React.FC = () => {
  const [ showNumber, setShowNumber ] : React.ComponentState = useState(0);

  const sendRequest = (url : string, body = null) => {
    return fetch(url, {
      method: 'GET',
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
  }

  const sendRequestPost = (url : string) => {
    return fetch(url, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        email: "john.marston@email.com",
        password: "11111111",
        name: "John Marston"
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

  useEffect(() => {
    sendRequest('https://geekhub-frontend-js-9.herokuapp.com/api/projects')
      .then(data => {
        localStorage.setItem('projects_array', JSON.stringify(data));
        return data;
      })
      .catch(error => console.log(error))
    let projectsArray : any = [];

    let localStorageProjects : any = localStorage.getItem('projects_array')
    let parsedLocalStorageProjects : Array<any> = JSON.parse(localStorageProjects);

    for(let i : number = 0; i < parsedLocalStorageProjects.length; i++) {
      if(parsedLocalStorageProjects[i].assigned !== null) {
        projectsArray.push(parsedLocalStorageProjects[i])
      }
    }

    localStorage.setItem('sorted_projects_array', JSON.stringify(projectsArray))

    let projectsArrayLength : any = projectsArray.length;

    localStorage.setItem('projects_count', projectsArrayLength)
    console.log(projectsArray)
  })


  const showMainProjects = () => {

    return (
      <>
        <header className="messagesHeader">
          <div className="messagesHeader_container">
            <div className="messagesHeader_left">
              <img src="https://image.prntscr.com/image/qKdNjt1VQcaxYyMVA3vEmg.png" alt="Logo" />
            </div>
            <div className="messagesHeader_right">
              <button className="messagesHeader_right-btn" onClick={() => {
                sendRequest('https://geekhub-frontend-js-9.herokuapp.com/api/users/all')
                  .then(data => {
                    console.log(data)
                  })
                  .catch(error => console.log(error))
              }}>Add <span> +</span></button>
              <Link to={'#'} className="messagesHeader_right-search" onClick={() => {
                sendRequestPost('https://geekhub-frontend-js-9.herokuapp.com/api/users/')
              }}><i className="fa fa-search" aria-hidden="true"></i></Link>
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
              <Link to={'#'} className="mainMessages_sidebar-linkActive"><i className="fa fa-bars" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-line-chart" aria-hidden="true"></i></Link>
              <Link to={'/messages'} className="mainMessages_sidebar-link"><i className="fa fa-envelope" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-users" aria-hidden="true"></i></Link>
            </div>
          </div>
          <div className="mainMessages_content">
            <div className="mainMessages_bar">
              <div className="mainMessages_bar_left">
                <div className="mainMessages_bar_links">
                  <Link to={'#'} className="mainMessages_bar-link mainMessages_bar-linkActive">All Projects({localStorage.getItem('projects_count')})</Link>
                  <Link to={'#'} className="mainMessages_bar-link">Workflow</Link>
                </div>
              </div>
              <div className="mainMessages_bar_right">
                <form>
                  <label htmlFor="filterSelect" className="mainMessages_bar-filterText">Show projects:</label>
                  <select name="filterSelect" id="filterSelect">
                    <option value="All">All</option>
                  </select>
                </form>
              </div>
            </div>
            <div className="mainProjects_bottom">

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
      { showNumber === 0 ? showMainProjects() : null}
      { showNumber === 1 ? showNeedLoginSection() : null }
    </>
  )
}


export default ProjectsComponent
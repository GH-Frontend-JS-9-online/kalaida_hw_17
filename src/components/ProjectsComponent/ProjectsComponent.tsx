import React, { useEffect, useState, useRef } from 'react'
import './ProjectsComponent.scss'
import './ProjectsWorkFlowComponent.scss'
import { Link } from "react-router-dom";
import useDraggable from "../../services/useDraggable";

const ProjectsComponent : React.FC = () => {
  const [ showNumber, setShowNumber ] : React.ComponentState = useState(0);
  const [ showContentNumber, setShowContentNumber ] : React.ComponentState = useState(0);
  let projectIndex : number = -1;
  const projects: any = localStorage.getItem('sorted_projects_array');
  let parsedProjects : any = JSON.parse(projects);
  let loginUserId : any = localStorage.getItem('login_user_id');

  useEffect(() => {

    if(loginUserId.length < 1) {
      setShowNumber(1)
    } else {
      setShowNumber(0)
    }
  }, [showNumber, loginUserId])

  const formatDate = (customDate : string) : string => {
    const months : Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date : Date = new Date(customDate);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }


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

  }

  const showProjects = () => {
    return(
      <>
        <div className="mainProjects_bottom_posts">
          { parsedProjects.map( (project : any, index : number) => <div className={`mainProjects_bottom_project 
                ${project.progress > 0 ? 'mainProjects_bottom_projectBlueBorder' : 'mainProjects_bottom_projectWhiteBorder'}
                 ${project.progress === 100 ? 'mainProjects_bottom_projectGreenBorder' : null}`} key={index}>

            <div className="mainProjects_bottom_project_container">
              <p className={'project-paragraph project-title'}>
                { project.title }
                <span>{ project.company }</span>
              </p>
              <p className={'project-paragraph project-cost'}>{project.cost}</p>
              <p className={'project-paragraph project-deadline'}>{formatDate(project.deadline)}</p>
              <p className={'project-paragraph project-spentTime'}>{project.timeSpent} hours</p>
              <div className={'project-paragraph2 project-progress'}><span>{project.progress}%</span>
                <div className={'project-progress-bar'}>
                  <div className={`project-progress-bar_container ${project.progress === 100 ? 'project-progress-bar_containerGreen' : null}`} style={{width: `${project.progress}%`}}></div>
                </div>
              </div>
              <p className={'project-paragraph project-status'}>{project.status}</p>
              <div className={'project-user'}>
                <div className="project-user-avatar" style={project.assigned._id === localStorage.getItem('login_user_id') ? {background: '#fff'} : {background: '#BBBBBB'}}></div>
                <div className={'project-user_information'}>
                  <p className={'project-user-name'}>{project.assigned.name}</p>
                  <p className={'project-user-position'}>{project.assigned._id === localStorage.getItem('login_user_id') ? 'Account' : project.assigned.position}</p>
                </div>
              </div>
              <p className={'project-menu'} onClick={() => {projectIndex = index; deleteProject();}}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></p>
            </div>

          </div> ) }

        </div>
      </>
    );
  }

  const showWorkflow = () => {
    const DraggableCard = ({ children } : any) => {
      const cardRef = useRef(null);
      useDraggable(cardRef);

      return(
        <div className={'mainProjects_workflow_item'} ref={cardRef}>
          {children}
        </div>
      );
    }

    return(
      <div className={'mainProjects_workflow'}>
        { parsedProjects.map( (project : any, index : number) => <DraggableCard key={index}>
          <div className={'mainProjects_workflow_item-avatar'} style={project.assigned._id === localStorage.getItem('login_user_id') ? {background: '#fff'} : {background: '#BBBBBB'}}></div>
          <div className={'mainProjects_workflow_item_text'}>
            <p className={'mainProjects_workflow_item-name'}>{project.title}</p>
            <p className={'mainProjects_workflow_item-info'}>{project.company} * {project.cost}</p>
          </div>
          <p className={'mainProjects_workflow_item-menu'} onClick={() => {projectIndex = index; deleteProject();}}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></p>
        </DraggableCard> ) }

      </div>
    );
  }

  const showMainProjects = () => {

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
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-home" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-linkActive"><i className="fa fa-bars" aria-hidden="true"></i></Link>
              <Link to={'/insights'} className="mainMessages_sidebar-link"><i className="fa fa-line-chart" aria-hidden="true"></i></Link>
              <Link to={'/messages'} className="mainMessages_sidebar-link"><i className="fa fa-envelope" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-users" aria-hidden="true"></i></Link>
            </div>
          </div>
          <div className="mainMessages_content">
            <div className="mainMessages_bar">
              <div className="mainMessages_bar_left">
                <div className="mainMessages_bar_links">
                  <p onClick={() => {
                    setShowContentNumber(0);
                  }} className={`mainMessages_bar-link ${ showContentNumber === 0 ? 'mainMessages_bar-linkActive' : null }`}>All Projects({localStorage.getItem('projects_count')})</p>
                  <p onClick={() => {
                    setShowContentNumber(1);
                  }} className={`mainMessages_bar-link ${ showContentNumber === 1 ? 'mainMessages_bar-linkActive' : null }`}>Workflow</p>
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
            <div className="mainProjects_bottom" onClick={() => console.log(parsedProjects)}>

              { showContentNumber === 0 ? showProjects() : showWorkflow() }

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
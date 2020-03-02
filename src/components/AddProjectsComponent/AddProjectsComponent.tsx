import React, {useEffect, useState} from 'react'
import './AddProjectsComponent.scss'
import { Link } from "react-router-dom";

const AddProjectsComponent : React.FC = () => {
  const [ showNumber, setShowNumber ] : React.ComponentState = useState(0);
  const [ showLink, setShowLink ] : React.ComponentState = useState(0);
  const [ projectTitle, setProjectTitle ] : React.ComponentState = useState('');
  const [ projectCompany, setProjectCompany ] : React.ComponentState = useState('');
  const [ projectCost, setProjectCost ] : React.ComponentState = useState('');
  const [ projectDeadline, setProjectDeadline ] : React.ComponentState = useState('');
  const [ loginError, setLoginError ] : React.ComponentState = useState('');
  const [ addProjectBlocker, setAddProjectBlocker ] : React.ComponentState = useState('addProject-blocker');
  let loginUserId : any = localStorage.getItem('login_user_id');
  let checkDate : RegExp = /^\d{4}\-\d{2}\-\d{2}$/;

  useEffect(() => {

    if(loginUserId.length < 1) {
      setShowNumber(1)
    } else {
      setShowNumber(0)
    }
  }, [showNumber, loginUserId]);

  const sendRequestGet = (url : string, body = null) => {
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

  const sendRequestPost = (url : string, myTitle : string, myCompany : string, myCost : string, myDeadline : string, userId : any) => {
    return fetch(url, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        title : myTitle,
        company : myCompany,
        cost : myCost,
        deadline : myDeadline,
        assigned : userId
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

  const handleProjectTitleInput = (e : any) => {
    setProjectTitle(e.target.value);
  };

  const handleProjectCompanyInput = (e : any) => {
    setProjectCompany(e.target.value);
  };

  const handleProjectCostInput = (e : any) => {
    setProjectCost(e.target.value);
  };

  const handleProjectDeadlineInput = (e : any) => {
    setProjectDeadline(e.target.value);
  };

  useEffect(() => {
    if(!/^[A-Za-z\s][A-Za-z0-9/!_.\s-]*$/.test(projectTitle) || projectTitle.search(/[A-Z]/) < 0 || projectTitle.length < 1 || projectTitle.length > 28 || !/^[A-Za-z\s][A-Za-z0-9/!_.\s-]*$/.test(projectCompany) || projectCompany.search(/[A-Z]/) < 0 || projectCompany.length < 1 || projectCompany.length > 28 || projectCost.length < 1 || projectCost.length > 10 || !/^[0-9]*$/.test(projectCost) || !checkDate.test(projectDeadline)) {
      setAddProjectBlocker('addProject-blocker');
      setLoginError('Oops, looks like title, company, cost or deadline is incorrect. Please try again.');
    } else {
      setAddProjectBlocker('addProject-blocker addProject-blockerNo');
      setLoginError('');
    }
  }, [checkDate, projectTitle, projectCost, projectCompany, projectDeadline]);

  const createProject = (e : any) => {
    e.preventDefault();

    let myTimeSpent : number = Math.floor(Math.random() * 101),
      myProgress : number = Math.floor(Math.random() * 101),
      myStatus : string;
    const statusesArray = ['Planning', 'Working', 'Designing', 'Testing'];

    if(myProgress === 0) {
      myStatus = 'Queued';
    } else if (myProgress === 100) {
      myStatus = 'Completed';
    } else if (myProgress > 85 && myProgress < 100) {
      myStatus = 'Quality Control';
    } else {
      myStatus = statusesArray[Math.floor(Math.random() * statusesArray.length)];
    }

    sendRequestPost('https://geekhub-frontend-js-9.herokuapp.com/api/projects/', projectTitle, projectCompany, '$' + projectCost, projectDeadline, localStorage.getItem('login_user_id'))
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error);
      })

    setShowLink(1);
    setProjectTitle('');
    setProjectCompany('');
    setProjectCost('');
    setProjectDeadline('');
  }

  useEffect(() => {
    sendRequestGet('https://geekhub-frontend-js-9.herokuapp.com/api/projects')
      .then(data => {
        localStorage.setItem('projects_array', JSON.stringify(data));
        return data;
      })
      .catch(error => console.log(error))

    let projectsArray : any = [];

    let localStorageProjects : any = localStorage.getItem('projects_array')
    let parsedLocalStorageProjects : any = JSON.parse(localStorageProjects);

    for(let i : number = 0; i < parsedLocalStorageProjects.length; i++) {
      if(parsedLocalStorageProjects[i].assigned !== null) {
        projectsArray.push(parsedLocalStorageProjects[i])
      }
    }

    localStorage.setItem('sorted_projects_array', JSON.stringify(projectsArray))

    let projectsArrayLength : any = projectsArray.length;

    localStorage.setItem('projects_count', projectsArrayLength);
  })

  const gotoProjects = () => {
    document.location.href = '/projects';
  }

  const showMainContent = () => {
    return (
      <>
        <div className='addProject'>
          <form className="addProject_form">
            <h1 className={'addProject_form-title'}>Add Project</h1>
            <input type="text" name="projectTitle" id="projectTitle" value={projectTitle} onChange={handleProjectTitleInput} placeholder={'...Title(length can\'t be more than 32)'} className={'addProject_form-input'}/>
            <input type="text" name="projectCompany" id="projectCompany" value={projectCompany} onChange={handleProjectCompanyInput} placeholder={'...Company(length can\'t be more than 32)'} className={'addProject_form-input'}/>
            <input type="text" name="projectCost" id="projectCost" value={projectCost} onChange={handleProjectCostInput} placeholder={'...Cost(only numbers)'} className={'addProject_form-input'}/>
            <input type="text" name="projectDeadline" id="projectDeadline" value={projectDeadline} onChange={handleProjectDeadlineInput} placeholder={'...Deadline(example: 2020-01-28)'} className={'addProject_form-input'}/>
            <p className="addProject_form-error" id="addProjectError">{loginError}</p>
            <button id={'projectCreate'} className={'addProject_form-btn'} onClick={createProject}>Create</button>
            <div id="loginInputBlocker" className={addProjectBlocker}></div>
          </form>
          { showLink === 1 ? <p className={'addProject-link'} onClick={gotoProjects}>Go to Projects</p> : null}
        </div>
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
      { showNumber === 0 ? showMainContent() : showNeedLoginSection() }
    </>
  )
};

export default AddProjectsComponent
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './HomeComponent.scss';
import Calendar from 'react-calendar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, CartesianGrid } from 'recharts';
import { Link } from "react-router-dom";

const HomeComponent : React.FC = () => {
  const [ showNumber, setShowNumber ] : React.ComponentState = useState(0);
  let projectIndex = -1;
  const projects : any = localStorage.getItem('sorted_projects_array');
  let parsedProjects : any = JSON.parse(projects);
  let loginUserId : any = localStorage.getItem('login_user_id');
  let unsortedUserProjects : any = localStorage.getItem('user_projects');
  let userProjects : any = JSON.parse(unsortedUserProjects);
  const chartData : any = [
    {
      uv: 1950
    },
    {
      uv: 2200
    },
    {
      uv: 3500
    },
    {
      uv: 2500
    },
    {
      uv: 3000
    },
    {
      uv: 2000
    },
    {
      uv: 3500
    },
    {
      uv: 3500
    },
    {
      uv: 2300
    },
    {
      uv: 3000
    },
    {
      uv: 2300
    },
    {
      uv: 2200
    }
  ];
  const barData = [
    {
      name: '1',
      uv: 2000
    },
    {
      name: '2',
      uv: 3300
    },
    {
      name: '3',
      uv: 2500
    },
    {
      name: '4',
      uv: 1600
    },
    {
      name: '5',
      uv: 900
    },
    {
      name: '6',
      uv: 1600
    },
    {
      name: '7',
      uv: 1600
    },
    {
      name: '8',
      uv: 2200
    },
    {
      name: '9',
      uv: 1800
    },
    {
      name: '10',
      uv: 2490
    },
    {
      name: '11',
      uv: 2100
    },
    {
      name: '12',
      uv: 500
    }
  ];

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
    let userProjectsArray : any = [];

    let localStorageProjects : any = localStorage.getItem('projects_array');
    let parsedLocalStorageProjects : any = JSON.parse(localStorageProjects);

    for(let i : number = 0; i < parsedLocalStorageProjects.length; i++) {
      if(parsedLocalStorageProjects[i].assigned !== null) {
        projectsArray.push(parsedLocalStorageProjects[i])
      }
      if(parsedLocalStorageProjects[i].assigned._id === loginUserId) {
        userProjectsArray.push(parsedLocalStorageProjects[i]);
      }
    }

    localStorage.setItem('sorted_projects_array', JSON.stringify(projectsArray));
    localStorage.setItem('user_projects', JSON.stringify(userProjectsArray));


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
          <div className="home_content">
            <div className="home_content_blocks">

              <div className="home_content_block home_content_insights">
                <div className="mainInsights_top">
                  <div className="home_content_circles">

                    <div className="mainInsights_top_statistic home_content_statistic">
                      <CircularProgressbar className={'mainInsights_top-circle'} value={75} text={`75%`} styles={buildStyles({trailColor: '#4A5162', pathColor: '#2997EC', textSize: 24, textColor: '#2997EC'})} strokeWidth={5} />
                      <div className="mainInsights_top_statistic_text" style={{ marginLeft: '125px' }}>
                        <p className={'mainInsights_top_statistic-number'}>1 300</p>
                        <p className={'mainInsights_top_statistic-title'}>Views</p>
                      </div>
                    </div>

                    <div className="mainInsights_top_statistic home_content_statistic">
                      <CircularProgressbar className={'mainInsights_top-circle'} value={35} text={`35%`} styles={buildStyles({trailColor: '#4A5162', pathColor: '#2997EC', textSize: 24, textColor: '#2997EC'})} strokeWidth={5} />
                      <div className="mainInsights_top_statistic_text" style={{ marginLeft: '125px' }}>
                        <p className={'mainInsights_top_statistic-number'}>800</p>
                        <p className={'mainInsights_top_statistic-title'}>Visitors</p>
                      </div>
                    </div>

                    <div className="mainInsights_top_statistic home_content_statistic">
                      <CircularProgressbar className={'mainInsights_top-circle'} value={62} text={`62%`} styles={buildStyles({trailColor: '#4A5162', pathColor: '#2997EC', textSize: 24, textColor: '#2997EC'})} strokeWidth={5} />
                      <div className="mainInsights_top_statistic_text" style={{ marginLeft: '125px' }}>
                        <p className={'mainInsights_top_statistic-number'}>3 800</p>
                        <p className={'mainInsights_top_statistic-title'}>Impressions</p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="home_content_insights_rechart">
                  <ResponsiveContainer>
                    <AreaChart data={chartData}>
                      <Area type="monotone" dataKey="uv" stroke="#2994EE" fill="#2A496D" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="home_content_block home_content_smallBlock home_content_projects">
                <div className="home_content_projects_top">
                  <h3 className={'home_content_projects-title'}>Your Projects</h3>
                </div>
                <div className="home_content_projects_blocks">
                  { userProjects.map( (project : any, index : number) => <div className="home_content_projects_project" key={index}>
                    <div className={'home_content_projects-avatar'}></div>
                    <div className={'home_content_projects_text'}>
                      <p className={'home_content_projects-name'}>{project.title}</p>
                      <p className={'home_content_projects-info'}>{project.company} * {project.cost}</p>
                    </div>
                    <p className={'mainProjects_workflow_item-menu'} onClick={() => {projectIndex = index; deleteProject();}}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></p>
                  </div> ) }
                </div>
              </div>

              <div className="home_content_block home_content_chart">
                <div className="home_content_chart_top">
                  <div className="home_content_chart_left">
                    <h3 className="home_content_chart-title">Sales report</h3>
                  </div>
                  <div className="home_content_chart_right">
                    <form>
                      <label htmlFor="filterSelectBarChart" className="home_content_chart-label">Show:</label>
                      <select name="filterSelectBarChart" id="filterSelectBarChart">
                        <option value="All">Year</option>
                      </select>
                    </form>
                  </div>
                </div>
                <div className="home_content_chart_barchart">
                  <ResponsiveContainer>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" stroke={'#989AA8'} />
                      <CartesianGrid horizontal={true} vertical={false} stroke="#404150" />
                      <Bar dataKey="uv" barSize={50} fill="#4F5564"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="home_content_block home_content_smallBlock home_content_inbox">
                <div className="home_content_projects_top">
                  <h3 className={'home_content_projects-title'}>Inbox(<span className={'home_content_inbox_span'}>2</span>)</h3>
                </div>
              </div>

              <div className="home_content_block home_content_smallBlock home_content_calendar">
                <Calendar calendarType={'US'} locale={'en-EN'} className={'home_content_calendarBlock'} />
              </div>

            </div>
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

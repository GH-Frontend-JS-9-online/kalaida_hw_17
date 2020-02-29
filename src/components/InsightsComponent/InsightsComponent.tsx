import React, {useEffect, useState} from 'react';
import './InsightsComponent.scss'
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const InsightsComponent : React.FC = () => {
  const [ showNumber, setShowNumber ] : React.ComponentState = useState(2);
  let loginUserId : any = localStorage.getItem('login_user_id');
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
  ]

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

  const loadProjects = () => {
    sendRequestGet('https://geekhub-frontend-js-9.herokuapp.com/api/projects')
      .then(data => {
        localStorage.setItem('projects_array', JSON.stringify(data));
        return data;
      })
      .catch(error => console.log(error))
  }

  const showMainBlock = () => {
    return(
      <>
        <header className="messagesHeader">
          <div className="messagesHeader_container">
            <div className="messagesHeader_left">
              <img src="https://image.prntscr.com/image/qKdNjt1VQcaxYyMVA3vEmg.png" alt="Logo" />
            </div>
            <div className="messagesHeader_right">
              <Link to={'/add_project'} className="messagesHeader_right-btn" onClick={loadProjects}>Add <span> +</span></Link>
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
              <Link to={'#'} className="mainMessages_sidebar-linkActive"><i className="fa fa-line-chart" aria-hidden="true"></i></Link>
              <Link to={'/messages'} className="mainMessages_sidebar-link"><i className="fa fa-envelope" aria-hidden="true"></i></Link>
              <Link to={'#'} className="mainMessages_sidebar-link"><i className="fa fa-users" aria-hidden="true"></i></Link>
            </div>
          </div>
          <div className="mainInsights_content">
            <div className="mainInsights_top">
              <div className="mainInsights_top_circles">

                <div className="mainInsights_top_statistic">
                  <CircularProgressbar className={'mainInsights_top-circle'} value={75} text={`75%`} />
                  <div className="mainInsights_top_statistic_text" style={{ marginLeft: '125px' }}>
                    <p className={'mainInsights_top_statistic-number'}>1 300</p>
                    <p className={'mainInsights_top_statistic-title'}>Views</p>
                  </div>
                </div>

                <div className="mainInsights_top_statistic">
                  <CircularProgressbar className={'mainInsights_top-circle'} value={35} text={`35%`} />
                  <div className="mainInsights_top_statistic_text" style={{ marginLeft: '125px' }}>
                    <p className={'mainInsights_top_statistic-number'}>800</p>
                    <p className={'mainInsights_top_statistic-title'}>Visitors</p>
                  </div>
                </div>

                <div className="mainInsights_top_statistic">
                  <CircularProgressbar className={'mainInsights_top-circle'} value={62} text={`62%`} />
                  <div className="mainInsights_top_statistic_text" style={{ marginLeft: '125px' }}>
                    <p className={'mainInsights_top_statistic-number'}>3 800</p>
                    <p className={'mainInsights_top_statistic-title'}>Impressions</p>
                  </div>
                </div>

              </div>
              <div className="mainInsights_top_right">
                <form>
                  <label htmlFor="filterSelectInsight" className="mainInsights_top_right-label">Show:</label>
                  <select name="filterSelectInsight" id="filterSelectInsight" className={'mainInsights_top_right-select'}>
                    <option value="Week">Week</option>
                  </select>
                </form>
              </div>
            </div>
            <div className="mainInsights_rechart">
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <Area type="monotone" dataKey="uv" stroke="#2994EE" fill="#2A496D" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mainInsights_bottom">
              <div className="mainInsights_bottom_item mainInsights_bottom_info">
                <div className="mainInsights_bottom_left">
                  <p className={'mainInsights_bottom-text mainInsights_bottom-mainParagraph'}>Campaing <i className="fa fa-angle-up" aria-hidden="true"></i></p>
                </div>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">Time <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">Views <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">Visitors <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">CTR <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">CPC <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">CPV <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">CPM <i className="fa fa-angle-down" aria-hidden="true"></i></p>
                <p className="mainInsights_bottom-text mainInsights_bottom_info-text">Status <i className="fa fa-angle-down" aria-hidden="true"></i></p>
              </div>
              <div className="mainInsights_bottom_item">
                <div className="mainInsights_bottom_left">
                  <p className={'mainInsights_bottom-text mainInsights_bottom-mainParagraph'}>Lorem ipsum dolor sit amet tetur</p>
                </div>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">6 days</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">358 000</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">58 200</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">25%</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$3.02</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$2.51</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$28.35</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">
                  <div id="greenCircle"></div> Active

                </p>
              </div>
              <div className="mainInsights_bottom_item">
                <div className="mainInsights_bottom_left">
                  <p className={'mainInsights_bottom-text mainInsights_bottom-mainParagraph'}>Sed do eiusmod tempor</p>
                </div>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">7 hours</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">1 200</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">800</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">10%</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$8.45</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$6.13</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$45.22</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">
                  <div id="redCircle"></div> Disable

                </p>
              </div>
              <div className="mainInsights_bottom_item">
                <div className="mainInsights_bottom_left">
                  <p className={'mainInsights_bottom-text mainInsights_bottom-mainParagraph'}>Consectetur adipisicing elit sed</p>
                </div>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">3 days</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">69 000</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">7 300</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">19%</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$6.22</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$3.90</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">$37.80</p>
                <p className="mainInsights_bottom-text mainInsights_bottom_item-text">
                  <div id="greenCircle"></div> Active

                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
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

  return(
    <>
      { showNumber === 1 ? showNeedLoginSection() : showMainBlock() }
    </>
  );
};

export default InsightsComponent;
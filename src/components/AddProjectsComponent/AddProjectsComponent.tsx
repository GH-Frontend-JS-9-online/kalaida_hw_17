import React, {useEffect, useState} from 'react'
import './AddProjectsComponent.scss'
import { Link } from "react-router-dom";

const AddProjectsComponent : React.FC = () => {
  const [ projectTitle, setProjectTitle ] : React.ComponentState = useState('');
  const [ projectCompany, setProjectCompany ] : React.ComponentState = useState('');
  const [ projectCost, setProjectCost ] : React.ComponentState = useState('');
  const [ projectDeadline, setProjectDeadline ] : React.ComponentState = useState('');

  return(
    <>
      <div className='addProject'>
        <form className="addProject_form">
          <h1 className={'addProject_form-title'}>Add Project</h1>
        </form>
      </div>
    </>
  )
}

export default AddProjectsComponent
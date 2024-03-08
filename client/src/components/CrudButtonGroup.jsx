import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomModal from './CustomModal';

/**
 * Renders a group of buttons for CRUD operations.
 * 
 * @param {Array<Object>} actions - List of action objects defining the buttons.
 * @param {string} actions.text - Text displayed on the button.
 * @param {Function} actions.navFunc - Function to be executed when the button is clicked.
 * @param {string} [actions.style] - Additional Tailwind CSS classes for styling the button.
 * @param {boolean} [actions.isNavPath] - Navigate to a link instead of executing a function. (Overrides navFunc)
 * @param {Object} [actions.data] - Object containing id and name.
 * @param {string} [actions.modalMsg] - Message to be displayed in a modal if provided.
 * 
 * @returns {JSX.Element} React component representing the CRUD button group.
 */
function CrudButtonGroup({ actions }) {
  const navigate = useNavigate();

  return (
    <div className='flex'>
      {actions.map((action) => (
        action.modalMsg ? (
          // Render button with modal if modal message is provided
          <CustomModal
            onClickFunc={action.navFunc}
            key={action.text}
            id={action.data.id}
            name={action.data.name}
            msg={action.modalMsg}
            buttonStyle={action.style}
            text={action.text}
          />
        ) : (
          // Render button with regular onClick function
          <Button
            key={action.text}
            className={`border border-solid hover:text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${action.style}`}
            onClick={action.isNavPath ? () => navigate(action.navFunc, { state: action }) : () => action.navFunc("hello world")}
          >
            {action.text}
          </Button>
        )
      ))}
    </div>
  );
}

export default CrudButtonGroup
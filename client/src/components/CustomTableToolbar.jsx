import { Button } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


/**
 * Custom toolbar component for a data grid table.
 * 
 * @param {Object[]} buttons - List of button objects to be displayed in the toolbar.
 * @param {string} buttons[].title - Title of the button.
 * @param {Function} [buttons[].func] - Function to be executed when the button is clicked.
 * @param {string} [buttons[].link] - URL to navigate to when the button is clicked.
 * 
 * @returns {JSX.Element} React component representing the custom table toolbar.
*/

export function CustomTableToolbar({ buttons }) {

  return (
    <GridToolbarContainer className="mx-4 pt-4">
      {buttons.map(button => {
        return button.func ?
          <Button key={button.title} onClick={button.func} className={`dark:bg-orange-50 text-orange-600 border-orange-600 hover:bg-orange-600 border border-solid hover:text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>{button.title}</Button>
          : <Link to={button.link} key={button.title}>
            <Button key={button.title} className={`dark:bg-orange-50 text-orange-600 border-orange-600 hover:bg-orange-600 border border-solid hover:text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>{button.title}</Button>
          </Link>
      })}

      <GridToolbarQuickFilter sx={{
                '& input:where(.dark, .dark *)': {
                  color: 'white',
                },'& svg:where(.dark, .dark *)': {
                  color: 'white',
                },
              }} className="!border-0 !outline-none focus:!outline-none focus:!border-0" />
    </GridToolbarContainer>
  );
}

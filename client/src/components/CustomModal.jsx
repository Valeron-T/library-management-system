import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { notify, timeout } from '../services/helpers';

/**
 * Custom Modal component for displaying a modal dialog with a button.
 * 
 * @param {string} buttonStyle - Additional Tailwind CSS classes for styling the button.
 * @param {string} text - Text displayed on the button.
 * @param {string} msg - Message displayed in the modal dialog.
 * @param {Function} onClickFunc - Function to be executed when the button is clicked.
 * @param {string} [id=""] - Optional ID parameter.
 * @param {string} [name=""] - Optional name parameter.
 * @returns {JSX.Element} React component representing the custom modal.
 */
export default function CustomModal({ buttonStyle, text, msg, onClickFunc, id = "", name = "" }) {
    const [open, setOpen] = useState(false);

    // Function to handle opening the modal
    const handleOpen = () => setOpen(true);

    // Function to handle closing the modal
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* Button to trigger the modal */}
            <Button
                className={`border border-solid hover:text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${buttonStyle}`}
                onClick={handleOpen}
            >
                {text}
            </Button>
            {/* Modal dialog */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* Modal title */}
                    <Typography id="modal-modal-title" variant="h4" component="h2" className='font-poppins'>
                        Confirmation
                    </Typography>
                    {/* Modal message */}
                    <Typography sx={{ my: 2 }} variant="body1" component="p" className='font-poppins'>
                        {msg}
                    </Typography>
                    {/* Additional content (e.g., Book Name, Member Name) */}
                    <Typography sx={{ my: 2 }} variant="h6" component="p" className='font-poppins font-extrabold'>
                        {name}
                    </Typography>
                    {/* Confirm button */}
                    <Button
                        sx={{ "color": "red" }}
                        className={`border border-solid hover:text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${buttonStyle}`}
                        onClick={async () => {
                            // Execute onClickFunc and handle result
                            onClickFunc(id).then(result => {
                                // Notify user based on result
                                result['message'] ? notify(result['message']) : notify(result['error'], "error")
                            });
                            // Close modal
                            handleClose();
                            // Wait for 2 seconds before reloading the page for notification to display
                            await timeout(2000);
                            // Reload the page
                            window.location.reload();
                        }}
                    >
                        {text}
                    </Button>
                    {/* Cancel button */}
                    <Button
                        className={`border border-solid hover:text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${buttonStyle}`}
                        onClick={handleClose}
                    >
                        {"Cancel"}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

// Styles for the modal dialog
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

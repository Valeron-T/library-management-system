import React, { useEffect, useState } from 'react'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import CenteredText from '../components/CenteredText';
import CrudButtonGroup from '../components/CrudButtonGroup';
import * as API from '../services/API';
import TitleText from '../components/TitleText';
import { CustomTableToolbar } from '../components/CustomTableToolbar';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { notify, timeout } from '../services/helpers';

/** Page to display all books matching filters in a data grid and configure before importing */
function Import() {
    const location = useLocation();
    var books = location.state
    const navigate = useNavigate()

    useEffect(() => {
      if (books['books'].length == 0) {
        toast.error("No Books Found !")
      }

      if (books['filteredCount'] != 0) {
        notify(`Filtered ${books['filteredCount']} duplicates.`, '')
      }
    }, [])
    

    async function submitImports() {
        const booksToImport = books['books'].filter(book => rowSelectionModel.includes(book.bookID));
        
        // Send toast if user didn't select any book
        if (booksToImport.length > 0) {
            await API.importBooks({'books': booksToImport}).then(res => res.error ? notify(res.error, "error") : notify(res.message, "success"))
            await timeout(2000)
            navigate('/books')
        } else {
            toast("No Books Selected")
        }
        
    }

    // Update book qty in books
    function updateTotalQty(books, bookID, newQty) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].bookID === bookID) {
                books[i].total_qty = newQty;
                // console.log(`Book ${bookID} total_qty updated to ${newQty}`);
                return; // Exit the loop after finding the match
            }
        }
    }

    const columns = [
        {
            field: 'bookID',
            headerName: 'ID',
            minWidth: 50,
            headerAlign: 'center',
            renderCell: ({ row }) =>
                <CenteredText text={row.bookID} />,
        },
        { field: 'title', headerName: 'Title', minWidth: 150, flex: 0.2 },
        { field: 'authors', headerName: 'Author', minWidth: 150, flex: 0.2 },
        { field: 'average_rating', headerName: 'Rating', minWidth: 100 },
        { field: 'isbn', headerName: 'ISBN', minWidth: 100, flex: 0.1, editable: true },
        { field: 'publisher', headerName: 'Publisher', minWidth: 150, flex: 0.15 },
        {
            field: 'total_qty', headerName: 'Quantity', minWidth: 50, flex: 0.2,  renderCell: ({ row }) =>
                <input type='number' defaultValue={1} key={row.bookID} name={`${row.bookID}-qty`} onChange={e => {
                    updateTotalQty(books['books'], row.bookID, e.target.value)
                }} />
        },
    ]

    const [rowSelectionModel, setRowSelectionModel] = useState(books['books'].map(e => e.bookID));
    const apiRef = useGridApiRef();

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster/>
            <TitleText text={"Review Imports"} />
            {/* Wait for books to be fetched before rendering */}
            {books && <div className='rounded-2xl bg-white mt-0 m-4'>
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    getRowId={(row) => row.bookID}
                    pageSizeOptions={[5, 10, 25, 100]}
                    className='!border-0 max-w-[100%]'
                    rows={books['books']} columns={columns} sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        }
                    }}
                    slots={{ toolbar: CustomTableToolbar }}
                    slotProps={{
                        toolbar: {
                            buttons: [
                                { title: "Confirm Import", func: submitImports },
                                { title: "Cancel Import", link: "/books/" }
                            ]
                        }
                    }} />
            </div>}

        </div>
    )
}

export default Import
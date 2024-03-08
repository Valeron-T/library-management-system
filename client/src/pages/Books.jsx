import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import CenteredText from '../components/CenteredText';
import CrudButtonGroup from '../components/CrudButtonGroup';
import * as API from '../services/API';
import TitleText from '../components/TitleText';
import { CustomTableToolbar } from '../components/CustomTableToolbar';
import { Toaster } from 'react-hot-toast';
import { parseAsInt } from '../services/helpers';

/** Page to display all books in a data grid and perform various operations */
function Books() {
    const [books, setBooks] = useState(null);

    useEffect(() => {
        API.getBooks().then(books => setBooks(books))
    }, []);


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: 50,
            headerAlign: 'center',
            renderCell: ({ row }) =>
                <CenteredText text={row.id} />,
        },
        { field: 'title', headerName: 'Title', minWidth: 150, flex: 0.2 },
        { field: 'author', headerName: 'Author', minWidth: 150, flex: 0.2 },
        { field: 'average_rating', headerName: 'Rating', minWidth: 100 },
        { field: 'isbn', headerName: 'ISBN', minWidth: 100, flex: 0.1 },
        { field: 'total_qty', headerName: 'Total Quantity', minWidth: 50 },
        { field: 'available_qty', headerName: 'Available', minWidth: 50 },
        { field: 'currently_rented', headerName: 'Rented', minWidth: 50 },
        {
            field: "action",
            headerName: "",
            sortable: false,
            flex: 0.3,
            renderCell: ({ row }) =>
                <CrudButtonGroup actions={[
                    { text: "Edit", style: "text-sea-green border-sea-green hover:bg-sea-green", data: row, isNavPath: true, navFunc: `/books/${row.id}` },
                    { text: "Delete", style: "ml-1 text-red-500 border-red-500 hover:bg-red-500", data: row, isNavPath: false, navFunc: API.deleteBook, modalMsg: "Are you sure you want to delete the following member?" },
                    { text: "Info", style: "ml-1 text-blue-500 border-blue-500 hover:bg-blue-500", data: row, isNavPath: true, navFunc: `/books/${row.id}/details` }
                ]} />,
            minWidth: 250
        },
    ]

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster/>
            <TitleText text={"Books"} />
            {/* Wait for books to be fetched before rendering */}
            {books && <div className='rounded-2xl bg-white mt-0 m-4'>
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
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
                                { title: "Add Book Manually", link: "/books/new" },
                                { title: "Import Using API", link: "/books/search" }
                            ]
                        }
                    }} />
            </div>}

        </div>
    )
}
export default Books
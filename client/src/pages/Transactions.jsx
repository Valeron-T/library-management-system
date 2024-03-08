import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import CenteredText from '../components/CenteredText';
import CrudButtonGroup from '../components/CrudButtonGroup';
import * as API from '../services/API';
import TitleText from '../components/TitleText';
import { CustomTableToolbar } from '../components/CustomTableToolbar';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { parseAsInt } from '../services/helpers';

/** Page to display all transactions in a data grid and perform various operations */
function Transactions() {
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        API.getTransactions().then(transactions => setTransactions(transactions))
    }, []);


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: 50,
            headerAlign: 'center',
            valueGetter: params => parseAsInt(params),
            renderCell: ({ row }) =>
                <CenteredText text={row.id} />,
        },
        {
            field: 'member_id', headerName: 'Member ID', minWidth: 50, valueGetter: params => parseAsInt(params), renderCell: ({ row }) =>
                row.member_id ? <Link to={`/members/${row.member_id}/details`}><CenteredText text={row.member_id} /></Link>:<p>NA</p>,
        },
        {
            field: 'book_id', headerName: 'Book ID', minWidth: 50, valueGetter: params => parseAsInt(params), renderCell: ({ row }) =>
                row.book_id ? <Link to={`/books/${row.book_id}/details`}><CenteredText text={row.book_id} /></Link>:<p>NA</p>
        },
        { field: 'per_day_fee', headerName: 'Per Day Fee', minWidth: 50 },
        { field: 'amount_paid', headerName: 'Amount Paid', minWidth: 50 },
        { field: 'total', headerName: 'Total', minWidth: 50 },
        { field: 'borrowed_date', headerName: 'Borrowed Date', minWidth: 200, flex: 0.3 },
        { field: 'returned_date', headerName: 'Returned Date', minWidth: 200, flex: 0.3 },
        {
            field: "action",
            headerName: "",
            sortable: false,
            flex: 0.3,
            renderCell: ({ row }) =>
                !row.returned_date ? <CrudButtonGroup actions={[
                    { text: "Return", style: "text-red-500 border-red-500 hover:bg-red-500", data: row, isNavPath: true, navFunc: `/transactions/${row.id}/return` },
                ]} /> : <p className='font-semibold'>Book Returned</p>,
            minWidth: 250
        },
    ]

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster />
            <TitleText text={"Transactions"} />
            {/* Wait for transactions to be fetched before rendering */}
            {transactions && <div className='rounded-2xl bg-white mt-0 m-4'>
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
                    rows={transactions['transactions']} columns={columns} sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        }
                    }}
                    slots={{ toolbar: CustomTableToolbar }}
                    slotProps={{
                        toolbar: {
                            buttons: [
                                { title: "Issue Book", link: "/transactions/new" }
                            ]
                        }
                    }} />
            </div>}

        </div>
    )
}

export default Transactions
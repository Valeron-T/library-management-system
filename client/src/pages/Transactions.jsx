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
import DataGridWrapper from '../components/DataGridWrapper';

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
                row.member_id ? <Link className='duration-0 hover:text-gray-600 dark:text-pink-magenta-light dark:visited:text-pink-magenta-light text-pink-magenta visited:text-pink-magenta' to={`/members/${row.member_id}/details`}><CenteredText text={row.member_id} /></Link> : <p>NA</p>,
        },
        {
            field: 'book_id', headerName: 'Book ID', minWidth: 50, valueGetter: params => parseAsInt(params), renderCell: ({ row }) =>
                row.book_id ? <Link className='duration-0 hover:text-gray-600 dark:text-pink-magenta-light dark:visited:text-pink-magenta-light text-pink-magenta visited:text-pink-magenta' to={`/books/${row.book_id}/details`}><CenteredText text={row.book_id} /></Link> : <p>NA</p>
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
                    { text: "Return", style: " dark:bg-red-50 text-red-500 border-red-500 hover:bg-red-500", data: row, isNavPath: true, navFunc: `/transactions/${row.id}/return` },
                ]} /> : <p className='font-semibold'>Book Returned</p>,
            minWidth: 250
        },
    ]

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster />
            <TitleText text={"Transactions"} />
            {/* Wait for transactions to be fetched before rendering */}
            {transactions && <DataGridWrapper
                rows={transactions['transactions']} columns={columns}
                slots={{ toolbar: CustomTableToolbar }}
                slotProps={{
                    toolbar: {
                        buttons: [
                            { title: "Issue Book", link: "/transactions/new" }
                        ]
                    }
                }} />}

        </div>
    )
}

export default Transactions
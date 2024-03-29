import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import CenteredText from '../components/CenteredText';
import CrudButtonGroup from '../components/CrudButtonGroup';
import * as API from '../services/API';
import TitleText from '../components/TitleText';
import { CustomTableToolbar } from '../components/CustomTableToolbar';
import { Toaster } from 'react-hot-toast';
import { parseAsInt } from '../services/helpers';
import DataGridWrapper from '../components/DataGridWrapper';

/** Page to display all members in a data grid and perform various operations */
function Members() {
  // State variable to hold members data
  const [members, setMembers] = useState(null);

  // Fetch members data from API on component mount
  useEffect(() => {
    API.getMembers().then(members => setMembers(members));
  }, []);

  // Column configuration for the DataGrid component
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 50, headerAlign: 'center', valueGetter: params => parseAsInt(params), renderCell: ({ row }) => <CenteredText text={row.id} /> },
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 0.2 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 0.2, sortable: false },
    { field: 'phone', headerName: 'Phone', minWidth: 200, sortable: false },
    { field: 'reg_date', headerName: 'Registered On', minWidth: 200, flex: 0.2 },
    { field: 'debt', headerName: 'Debt', minWidth: 75, valueGetter: params => parseAsInt(params), renderCell: ({ row }) => <div className={`${row.debt >= 500 ? "text-red-600" : ""}`}>{row.debt}</div> },
    { field: 'amount_spent', headerName: 'Amount Spent', minWidth: 75 },
    {
      field: "action", headerName: "", sortable: false, flex: 0.2, renderCell: ({ row }) => <CrudButtonGroup actions={[
        { text: "Edit", style: "text-sea-green border-sea-green hover:bg-sea-green", data: row, isNavPath: true, navFunc: `/members/${row.id}` },
        { text: "Delete", style: "ml-1 text-red-500 border-red-500 hover:bg-red-500", data: row, isNavPath: false, navFunc: API.deleteMember, modalMsg: "Are you sure you want to delete the following member?" }
      ]} />, minWidth: 200
    },
  ];

  return (
    <div className='flex flex-col font-poppins w-full'>
      <Toaster />
      {/* Title text for the page */}
      <TitleText text={"Members"} />

      {/* Render DataGrid once members data is fetched */}
      {members &&
        <DataGridWrapper
          rows={members['members']}
          columns={columns}
          slots={{ toolbar: CustomTableToolbar }}
          slotProps={{
            toolbar: {
              buttons: [
                { title: "Add Member", link: "/members/new" }
              ]
            }
          }}
        />
      }
    </div>
  );
}

export default Members;
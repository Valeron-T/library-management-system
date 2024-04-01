import React, { useEffect, useState } from 'react';
import TitleText from '../components/TitleText';
import Card from '../components/Card';
import { FaBook, FaUsers } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import * as API from '../services/API';
import { CustomTableToolbar } from '../components/CustomTableToolbar';
import DataGridWrapper from '../components/DataGridWrapper';
import CenteredText from '../components/CenteredText';
import LinkWrapper from '../components/LinkWrapper';
import BookCard from '../components/BookCard';
import SubTitleText from '../components/SubTitleText';

/** Home Page */
function Home() {

  const [books, setBooks] = useState(null);
  const [latestBooks, setLatestBooks] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    API.getTop5BooksByRevenue().then(books => setBooks(books))
    API.getLatestMemberDetails().then(members => setMembers(members))
    API.getLatestBooksIssued().then(latestBooks => setLatestBooks(latestBooks))
  }, []);


  const bookColumns = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      headerAlign: 'center',
      renderCell: ({ row }) =>
        <CenteredText text={row.id} />,
    },
    { field: 'title', headerName: 'Title', minWidth: 150, flex: 0.2 },
    { field: 'total', headerName: 'Revenue', minWidth: 150, flex: 0.1 }
  ]

  const memberColumns = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      headerAlign: 'center',
      renderCell: ({ row }) =>
        <CenteredText text={row.id} />,
    },
    { field: 'name', headerName: 'Name', minWidth: 200, flex: 0.1 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 0.2, sortable: false },
    { field: 'spending', headerName: 'Spending', minWidth: 75, flex: 0.1 },
  ];

  return (
    <div className='flex flex-col font-poppins w-full'>

      {/* Display API Loadtime message if hidemsg key is not present */}
      {
        !localStorage.getItem('hideApiLoadMsg') &&
        <div onClick={() => {
          localStorage.setItem("hideApiLoadMsg", true)
          window.location.reload()
        }}>
          <p className='text-white bg-pink-magenta hover:opacity-75 rounded-2xl cursor-pointer text-center p-4 m-4'>Due to usage of render.com for free hosting of the API, Please allow 1-2 mins for data to load upon sending the first API call if not running locally. Click to hide this message. </p>
        </div>
      }

      {/* Title for the page */}
      <TitleText style={'pb-0'} text={"Hello, John"} />

      {/* Cards for different functionalities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-2">
        {/* Card for managing books */}
        <Card link={'/books'} value={"100"} title={"Borrowed Books"} icon={<FaBook fill='white' size={24} className='self-center' />} />

        {/* Card for managing members */}
        <Card link={'/members'} value={"2000"} title={"New Members"} icon={<FaUsers fill='white' size={24} className='' />} />

        {/* Card for managing transactions */}
        <Card link={'/transactions'} value={"350"} title={"Issue books and returns"} icon={<FaMoneyBillTransfer fill='white' size={24} className='' />} />

        {/* Card for generating reports */}
        <Card link={'/reports'} value={"124"} title={"Visualise Data"} icon={<MdAnalytics fill='white' size={24} className='' />} />

        {books && <DataGridWrapper styles={"sm:col-span-2 col-span-1 !m-4"} pageSize={5} rows={books['result']} columns={bookColumns} slots={{ toolbar: CustomTableToolbar, pagination: LinkWrapper }} slotProps={{
          toolbar: {
            buttons: [
              { title: "Import Using API", link: "/books/search" }
            ],
            search: false,
            title: "Top Grossing Books"
          },
          pagination: {
            text: "See all",
            link: "/books",
            styles: "text-pink-magenta dark:text-white hover:opacity-70"
          }
        }} />}

        {members && <DataGridWrapper styles={"sm:col-span-2 col-span-1 !m-4"} pageSize={5} rows={members['result']} columns={memberColumns} slots={{ toolbar: CustomTableToolbar, pagination: LinkWrapper }} slotProps={{
          toolbar: {
            buttons: [
              { title: "Add Member", link: "/members/new" }
            ],
            search: false,
            title: "Newest Members"
          },
          pagination: {
            text: "See all",
            link: "/members",
            styles: "text-pink-magenta dark:text-white hover:opacity-70"
          }
        }} />}

        <div className="flex flex-col lg:col-span-4 sm:col-span-2 col-span-1 bg-white shadow-soft dark:bg-light-gray m-4 rounded-2xl">
          <SubTitleText style={'pb-2'} text={"Recently Issued Books"} />
          { latestBooks ? <div className="flex flex-row overflow-x-scroll m-4 scrollbar-thin scrollbar-track-[#efefef] dark:scrollbar-thumb-[#201C1D] scrollbar-thumb-gray-300 dark:scrollbar-track-dark-gray">
             {latestBooks['result'].map(item => {
              return <BookCard key={item.isbn} title={item.title} author={item.author} isbn={item.isbn}/>
             })}
          </div> : "Loading"}
        </div>


      </div>

    </div>
  )
}

export default Home;
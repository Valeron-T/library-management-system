import React, { useState } from 'react';
import TitleText from '../components/TitleText';
import Card from '../components/Card';
import { FaBook, FaUsers } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";

/** Home Page */
function Home() {

  // State variables for member and book IDs
  const [memberId, setMemberId] = useState(0);
  const [bookId, setBookId] = useState(0);

  return (
    <div className='flex flex-col font-poppins w-full'>
      {/* Title for the page */}
      <TitleText text={"Library Management System"} />

      {/* Cards for different functionalities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-2">
        {/* Card for managing books */}
        <Card link={'/books'} title={"Books"} text={"View, Import, Add or Delete books"} icon={<FaBook size={64} className='p-8 group-hover:text-white duration-500' />} />

        {/* Card for managing members */}
        <Card link={'/members'} title={"Members"} text={"View, Add or Delete members"} icon={<FaUsers size={64} className='p-8 group-hover:text-white duration-500' />} />

        {/* Card for managing transactions */}
        <Card link={'/transactions'} title={"Transactions"} text={"Issue books and returns"} icon={<FaMoneyBillTransfer size={64} className='p-8 group-hover:text-white duration-500' />} />

        {/* Card for generating reports */}
        <Card link={'/reports'} title={"Reports"} text={"Visualise Data"} icon={<MdAnalytics size={64} className='p-8 group-hover:text-white duration-500' />} />
      </div>

      {/* Title for quick actions section */}
      <TitleText text={"Quick Actions"} />

      {/* Input fields for fetching individual details */}
      <div className="flex sm:flex-row flex-col m-4 justify-center items-center align-middle">
        <label className='font-semibold max-sm:py-1'>Individual Details for: </label>
        {/* Input field for member ID */}
        <input type='text' className='rounded-lg p-2 border-none mx-4' placeholder='Member ID' onChange={e => setMemberId(e.target.value)}></input>
        <label className='font-semibold max-sm:py-1'> or </label>
        {/* Input field for book ID */}
        <input type='text' className='rounded-lg p-2 border-none mx-4' placeholder='Book ID' onChange={e => setBookId(e.target.value)}></input>
      </div>

      {/* Display API Loadtime message if hidemsg key is not present */}
      {
        !localStorage.getItem('hideApiLoadMsg') &&
        <div onClick={() => {
          localStorage.setItem("hideApiLoadMsg", true)
          window.location.reload()
        }}>
          <p className='text-white bg-licorice hover:bg-black rounded-2xl cursor-pointer text-center p-4 m-4'>Due to usage of render.com for free hosting of the API, Please allow 1-2 mins for data to load upon sending the first API call if not running locally. Click to hide this message. </p>
        </div>
      }

      {/* Cards for quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-2">
        {/* Card for fetching member details */}
        <Card link={`/members/${memberId}/details`} title={"Fetch Member Details"} />

        {/* Card for fetching book details */}
        <Card link={`/books/${bookId}/details`} title={"Fetch Book Details"} />

        {/* Card for importing books using API */}
        <Card link={'/books/search'} title={"Import Books Using API"} />

        {/* Card for issuing books */}
        <Card link={'/transactions/new'} title={"Issue Book"} />
      </div>
    </div>
  )
}

export default Home;
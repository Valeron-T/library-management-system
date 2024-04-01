import React, { useEffect, useState } from 'react'
import TitleText from '../components/TitleText'
import LineChart from '../components/LineChart'
import { getAvgDaysBookHeld, getBooksByRating, getLatestNewUsers, getLatestTransactions } from '../services/API'
import BarChart from '../components/BarChart'
import DaysFilter from '../components/DaysFilter'

/** Page to display all analytics */
function Reports() {

  const [latestTransactions, setLatestTransactions] = useState([])
  const [latestNewUsers, setLatestNewUsers] = useState([])
  const [avgDaysBookHeld, setAvgDaysBookHeld] = useState([])
  const [booksByRating, setBooksByRating] = useState([])
  const [daysFilter, setDaysFilter] = useState(30)

  // Refetch data whenever days filter is changed
  useEffect(() => {
    getLatestTransactions(daysFilter).then(res => setLatestTransactions(res['transactions']))
    getLatestNewUsers(daysFilter).then(res => setLatestNewUsers(res['members']))
  }, [daysFilter])

  // Only fetch on load
  useEffect(() => {
    getAvgDaysBookHeld().then(res => setAvgDaysBookHeld(res['result']))
    getBooksByRating().then(res => setBooksByRating(res['result']))
  }, [])

  return (
    <div className='flex flex-col font-poppins w-full'>

      <TitleText text={"Reports"} />
      <div className="flex sm:flex-row flex-col items-center justify-center">
        
        {/* Days Filter */}
        <label className='font-semibold mx-4 dark:text-white'> Time Range </label>
        <DaysFilter setter={setDaysFilter} />
      </div>

      {/* Charts */}
      <div className="flex sm:flex-row flex-col max-sm:m-4">
        {latestTransactions && <LineChart data={latestTransactions} title={"Books Borrowed"} dataSetTitle={"Books"} xKey={'date'} yKey={'count'} />}
        {latestNewUsers && <LineChart data={latestNewUsers} title={"Members Registered"} dataSetTitle={"Members"} xKey={'date'} yKey={'count'} />}
      </div>
      <div className="flex sm:flex-row flex-col max-sm:m-4">
        {avgDaysBookHeld && <BarChart data={avgDaysBookHeld} title={"Average Duration Book Held (All time)"} dataSetTitle={"Days"} xKey={'book_id'} yKey={'average_days_held'} />}
        {booksByRating && <BarChart data={booksByRating} title={"Titles Held By Rating (All time)"} dataSetTitle={"Books"} xKey={'rating'} yKey={'count'} />}
      </div>
    
    </div>
  )
}

export default Reports
import React, { useEffect, useState } from 'react'
import TitleText from '../components/TitleText'
import LineChart from '../components/LineChart'
import { getAvgDaysBookHeld, getBooksByRating, getLatestNewUsers, getLatestTransactions } from '../services/API'
import BarChart from '../components/BarChart'
import Select from 'react-select';

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

  // Options for days filter dropdown
  const daysOptions = [
    { value: 1, label: "Past 24 hours" },
    { value: 7, label: "Past 7 Days" },
    { value: 30, label: "Past 30 Days" },
    { value: 180, label: "Past 180 Days" },
    { value: 365, label: "Past 365 Days" },
  ]


  return (
    <div className='flex flex-col font-poppins w-full'>

      <TitleText text={"Reports"} />
      <div className="flex sm:flex-row flex-col items-center justify-center">
        
        {/* Days Filter */}
        <label className='font-semibold mx-4'> Time Range </label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={7}
          isClearable={false}
          name="days"
          options={daysOptions}
          onChange={e => setDaysFilter(e['value'])}
          placeholder="Past 30 Days"
        />
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
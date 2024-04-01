import React from 'react'
import Select from 'react-select';

function DaysFilter({ setter }) {

    // Options for days filter dropdown
    const daysOptions = [
        { value: 1, label: "Past 24 hours" },
        { value: 7, label: "Past 7 Days" },
        { value: 30, label: "Past 30 Days" },
        { value: 180, label: "Past 180 Days" },
        { value: 365, label: "Past 365 Days" },
    ]

    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={7}
                isClearable={false}
                name="days"
                options={daysOptions}
                onChange={e => setter(e['value'])}
                placeholder="Past 30 Days"
                classNames={{
                    menu: () => "dark:bg-dark-gray",
                    option: () => "bg-gray-50 dark:text-white dark:bg-dark-gray text-gray-900 text-sm dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ",
                }}
            />
        </>
    )
}

export default DaysFilter
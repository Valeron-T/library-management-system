import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { lineOptions } from '../services/chartconfig';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Creates a custom formatted Line Chart using Chart.js library.
 * @param {Object} lineConfig 
 * @param {Array<Object>} lineConfig.data - List containing key-value pairs representing the dataset.
 * @param {string} lineConfig.title - Title for the chart.
 * @param {string} lineConfig.dataSetTitle - Title for the dataset being displayed (e.g., books, days).
 * @param {string} lineConfig.xKey - Key representing the X-axis data in each item of the dataset.
 * @param {string} lineConfig.yKey - Key representing the Y-axis data in each item of the dataset.
 * @returns {JSX.Element} React component representing the Line Chart.
 */
function LineChart({ data, title, dataSetTitle, xKey, yKey }) {

    const [options, setOptions] = useState(lineOptions)

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            plugins: {
                ...prevOptions.plugins,
                title: {
                    ...prevOptions.plugins.title,
                    text: title
                }
            }
        }));
    }, [])
    

    var formatted_data = {
        labels: data.map(item => item[xKey]),
        datasets: [
            {
                label: dataSetTitle,
                data: data.map(item => item[yKey]),
                borderColor: 'rgb(207,68,100)',
                backgroundColor: 'rgba(207,68,100, 0.5)',
            }
        ],
    };

    return (
        <div className='flex justify-center shadow-soft bg-rose-50 rounded-xl m-4 items-center self-center w-full'>
            <div className="sm:h-[30vh] h-[25vh] min-w-[30vw] p-4 w-full">
                <Line options={options} data={formatted_data} />
            </div>

        </div>

    )
}

export default LineChart
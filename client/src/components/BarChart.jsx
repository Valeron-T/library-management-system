import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { barOptions } from '../services/chartconfig';

// Initialise ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

/**
 * Creates a custom formatted Bar Chart using Chart.js library.
 * @param {Object} barConfig 
 * @param {Array<Object>} barConfig.data - List containing key-value pairs representing the dataset.
 * @param {string} barConfig.title - Title for the chart.
 * @param {string} barConfig.dataSetTitle - Title for the dataset being displayed (e.g., books, days).
 * @param {string} barConfig.xKey - Key representing the X-axis data in each item of the dataset.
 * @param {string} barConfig.yKey - Key representing the Y-axis data in each item of the dataset.
 * @returns {JSX.Element} React component representing the Bar Chart.
 */
function BarChart({ data, title, dataSetTitle, xKey, yKey }) {

    const [options, setOptions] = useState(barOptions)

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
        labels: data.map(item => {
            var formattedLabel = String(item[xKey]).split("  ")
            return formattedLabel
        }),
        datasets: [
            {
                label: dataSetTitle,
                data: data.map(item => item[yKey]),
                backgroundColor: 'rgb(207,68,100)',
            }
        ],
    };

    return (
        <div className='flex justify-center shadow-soft bg-rose-50 rounded-xl m-4 items-center self-center w-full'>
            <div className="sm:h-[30vh] h-[25vh] min-w-[30vw] p-4 w-full">
                <Bar options={options} data={formatted_data} />
            </div>

        </div>

    )
}

export default BarChart
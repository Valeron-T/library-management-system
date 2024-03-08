/** Configurable options for chart.js bar chart */
export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: "",
        },
    },
    scales: {
        x: {  
            ticks: {
                callback(val, index) {
                    var showLabel = true
                    this.getLabelForValue(val).some(item => {
                        if (item.length > 30) {
                            showLabel = false
                            return false
                        }
                    })
                    return showLabel ? this.getLabelForValue(val) : '';
                  },
            }         
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            },
        }
    },
    
};

/** Configurable options for chart.js line chart */
export const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: "",
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            },
        }
    },
};
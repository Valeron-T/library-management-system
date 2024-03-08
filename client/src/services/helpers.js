import moment from 'moment-timezone';
import toast from 'react-hot-toast';

/**
 * Toast notification wrapper which provides success or error styled notifications
 * @param {string} msg - Message to display 
 * @param {string} msgType - Will style as error message if set to "error". By default, styles as success.
 */
export function notify(msg, msgType) {
    const toast_config = {
        duration: 4000,
        position: 'top-right',
    }

    msgType === "error" ? toast.error(msg, toast_config) : toast.success(msg, toast_config)
}

/**
 * Helper function to delay for x time.
 * @param {number} delay - Time to sleep in ms
 */
export function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

/** Wrapper for parsing nested value as int */
export function parseAsInt(params) {
    if (params.value) {
        return parseInt(params.value);
    }
}

/** Filter duplicates in an array */
export function filterDuplicates(arr, prop) {
    let seen = new Set();
    return arr.filter(obj => !seen.has(obj[prop]) && seen.add(obj[prop]));
};

/** Fixes Date in form control */
export function formatDate(rawDate, field, stateDictionary) {
    var formattedDateString

    if (rawDate) {
        const date = new Date(rawDate);
        formattedDateString = date.toISOString().substring(0, 19);
    } else{
        formattedDateString = moment().utcOffset("+05:30").format().substring(0,19)
    }

    stateDictionary[field]['setter'][1](formattedDateString)
}
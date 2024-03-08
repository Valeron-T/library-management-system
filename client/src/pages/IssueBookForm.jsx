import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FormElement from '../components/FormElement';
import TitleText from '../components/TitleText';
import { TransactionModel } from '../services/models';
import toast, { Toaster } from 'react-hot-toast';
import * as API from '../services/API'
import { notify, timeout } from '../services/helpers';
import moment from 'moment-timezone';

/** Form to issue a book to a member */
function IssueBookForm({ operationToPerform, view = false }) {
    const location = useLocation();
    const navigate = useNavigate();

    var formData = location.state?.data || TransactionModel;

    const dateKeys = ['borrowed_date']

    const stateDictionary = {
        member_id: { value: formData.member_id, setter: useState(formData.member_id), type: 'text', selectData: true, myfunc: API.getMembers, selectLabel: ['members','name']},
        book_id: { value: formData.book_id, setter: useState(formData.book_id), type: 'text', selectData: true, myfunc: API.getBooks, selectLabel: ['books','title']},
        per_day_fee: { value: formData.per_day_fee, setter: useState(formData.per_day_fee), type: 'text' },
        borrowed_date: { value: formData.borrowed_date, setter: useState(formData.borrowed_date), type: 'datetime-local' },
    };

    function formatDate(rawDate, field) {
        var formattedDateString

        if (rawDate) {
            const date = new Date(rawDate);
            formattedDateString = date.toISOString().substring(0, 19);
        } else{
            formattedDateString = moment().utcOffset("+05:30").format().substring(0,19)
        }

        stateDictionary[field]['setter'][1](formattedDateString)
    }

    


    useEffect(() => {
        // If data is not received from previous page, fetch using API. Format the dates in any case.
        formData.member_id == '' && operationToPerform != "Issue" ? API.getTransaction(location.pathname.split('/')[2]).then(res => {
            Object.entries(stateDictionary).map(([key, { value, setter, type }]) => (
                setter[1](res.transaction[key])
            ))
            return res
        }) 
        .then(res => dateKeys.forEach(e => formatDate(res.transaction[e], e))) :
        dateKeys.forEach(e => formatDate(formData[e], e))

    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target)

        if (event.nativeEvent.submitter.name == 'issue') {
            const requestBody = {};
            const fields = ['member_id','book_id','per_day_fee','borrowed_date']
            // Loop through form fields
            fields.map(field => {
                console.log(field)
                // Assign field values to requestBody
                requestBody[field] = event.target[field].value;
                console.log(event.target[field].value)
            })
                
            document.getElementById("transactionForm").reset();
            console.log(requestBody)
            API.issueBook(requestBody)
                .then(result => {
                    result['message'] ? notify(result['message']) : notify(result['error'], "error")
                });

            await timeout(2000)
            navigate('/transactions')
            
        }
    };

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster />
            <TitleText text={`${operationToPerform} Book`} />
            <form className="ml-4 grid lg:grid-cols-3 sm:grid-cols-2" onSubmit={handleSubmit} id='transactionForm'>
                {Object.entries(stateDictionary).map(([key, value]) => (
                    <FormElement key={key} text={key} value={value.setter[0]} selectLabel={value.selectLabel} myfunc={value.myfunc} selectData={value.selectData} readOnly={value.view} isDisabled={value.disabled} type={value.type} onchange={value.setter[1]} />
                ))}
                {!view && <div className="flex flex-row lg:col-span-3 sm:col-span-2">
                    {operationToPerform == "Return" && <button type="submit" name='calculate' value='submit' className="capitalize ml-2 text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Calculate</button>}
                    <button type="submit" name='issue' value='submit' className="capitalize ml-2 text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{operationToPerform}</button>
                </div>}

            </form>
        </div>
    );
}

export default IssueBookForm
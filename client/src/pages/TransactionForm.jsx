import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FormElement from '../components/FormElement';
import TitleText from '../components/TitleText';
import { TransactionModel } from '../services/models';
import toast, { Toaster } from 'react-hot-toast';
import * as API from '../services/API'
import { formatDate, notify, timeout } from '../services/helpers';

/** Form to return book or view transaction information */
function TransactionForm({ operationToPerform, view = false }) {
    const location = useLocation();
    const navigate = useNavigate()

    var formData = location.state?.data || TransactionModel;

    const dateKeys = ['borrowed_date', 'returned_date']

    const stateDictionary = {
        member_id: { value: formData.member_id, setter: useState(formData.member_id), type: 'text', disabled: true },
        book_id: { value: formData.book_id, setter: useState(formData.book_id), type: 'text', disabled: true },
        total: { value: formData.total, setter: useState(formData.total), type: 'text', disabled: true },
        amount_paid: { value: formData.amount_paid, setter: useState(formData.amount_paid || 0), type: 'text', isRequired: true },
        per_day_fee: { value: formData.per_day_fee, setter: useState(formData.per_day_fee), type: 'text' },
        borrowed_date: { value: formData.borrowed_date, setter: useState(formData.borrowed_date), type: 'datetime-local' },
        returned_date: { value: formData.returned_date, setter: useState(formData.returned_date || Date.now().toString()), type: 'datetime-local' }
    };


    useEffect(() => {
        // If data is not received from previous page, fetch using API. Format the dates in any case.
        formData.member_id == '' && operationToPerform != "Issue" ? API.getTransaction(location.pathname.split('/')[2]).then(res => {
            Object.entries(stateDictionary).map(([key, value]) => (
                value.setter[1](res.transaction[key])
            ))
            return res
        }).then(res => dateKeys.forEach(e => formatDate(res.transaction[e], e, stateDictionary))) :
        dateKeys.forEach(e => formatDate(formData[e], e, stateDictionary))

    }, [])

    const calculateTotal = (event) => {
        const hoursBorrowed = (new Date(event.target['returned_date'].value) - new Date(event.target['borrowed_date'].value)) / 36e5
        if (hoursBorrowed < 0) {
            toast.error("Return Date has to be after Borrow Date")
        } else {
            const daysBorrowed = Math.ceil(hoursBorrowed/24)
            const total = daysBorrowed * event.target['per_day_fee'].value
            stateDictionary['total']['setter'][1](total)
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        await calculateTotal(event)

        if (event.nativeEvent.submitter.name == 'modify') {
            const requestBody = {};
            // Loop through form fields
            for (const field in TransactionModel) {
                // Assign field values to requestBody
                requestBody[field] = event.target[field].value;
                console.log(event.target[field].value)
            }
            document.getElementById("transactionForm").reset();

            (operationToPerform === "Return" ? API.modifyTransaction(formData.id, requestBody) : API.addTransaction(requestBody))
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
                    <FormElement key={key} text={key} value={value.setter[0]} isRequired={value.isRequired} readOnly={value.view} isDisabled={value.disabled} type={value.type} onchange={value.setter[1]} />
                ))}
                {!view && <div className="flex flex-row lg:col-span-3 sm:col-span-2">
                    {operationToPerform == "Return" && <button type="submit" name='calculate' value='submit' className="capitalize ml-2 text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Calculate</button>}
                    <button type="submit" name='modify' value='submit' className="capitalize ml-2 text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{operationToPerform}</button>
                </div>}

            </form>
        </div>
    );
}

export default TransactionForm
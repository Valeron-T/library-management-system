import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FormElement from '../components/FormElement';
import TitleText from '../components/TitleText';
import { MemberModel } from '../services/models';
import { Toaster } from 'react-hot-toast';
import * as API from '../services/API'
import { formatDate, notify, timeout } from '../services/helpers';

/** Form to create, edit or view member information */
function MemberForm({ operationToPerform, view = false }) {
    const location = useLocation()
    const navigate = useNavigate()

    var formData = location.state?.data || MemberModel

    const stateDictionary = {
        name: { value: formData.name, setter: useState(formData.name), type: 'text' },
        email: { value: formData.email, setter: useState(formData.email), type: 'text' },
        phone: { value: formData.phone, setter: useState(formData.phone), type: 'text' },
        debt: { value: formData.debt, setter: useState(formData.debt), type: 'text' },
        reg_date: { value: formData.reg_date, setter: useState(formData.reg_date), type: 'datetime-local' },
        amount_spent: { value: formData.amount_spent, setter: useState(formData.amount_spent), type: 'text' },
    };

    useEffect(() => {
        // If data is not received from previous page, fetch using API. Format the date in any case.
        formData.name == '' && operationToPerform != "Create" ? API.getMember(location.pathname.split('/')[2]).then(res => {
            Object.entries(stateDictionary).map(([key, value]) => (
                value.setter[1](res.member[key])
            ))
            return res
        }).then(res => formatDate(res.member['reg_date'], "reg_date", stateDictionary)) : formatDate(formData.reg_date, "reg_date", stateDictionary)
    }, [])




    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {};
        // Loop through form fields
        for (const field in MemberModel) {
            // Assign field values to requestBody
            requestBody[field] = event.target[field].value;
        }
        
        document.getElementById("memberForm").reset();

        (operationToPerform === "Update" ? API.updateMember(formData.id, requestBody) : API.createMember(requestBody))
            .then(async result => {
                result['message'] ? notify(result['message']) : notify(result['error'], "error")
                await timeout(2000)
                navigate('/members')
            })

    };

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster />
            <TitleText text={`${operationToPerform} Member`} />
            {(view == true && stateDictionary.name.setter[0] == "") ? <p className='m-4 p-4 text-2xl bg-red-700 rounded-2xl text-white'>Invalid Member ID</p> : <form className="ml-4" onSubmit={handleSubmit} id='memberForm'>
                {Object.entries(stateDictionary).map(([key, { value, setter, type }]) => (
                    <FormElement key={key} text={key} value={setter[0]} readOnly={view} type={type} onchange={setter[1]} />
                ))}
                {!view && <div className="flex flex-row">
                    <button type="submit" value='submit' className="capitalize text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{operationToPerform}</button>
                </div>}

            </form>}

        </div>
    );
}

export default MemberForm
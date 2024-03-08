import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormElement from '../components/FormElement';
import TitleText from '../components/TitleText';
import {  ImportModel } from '../services/models';
import { Toaster } from 'react-hot-toast';
import * as API from '../services/API'
import { filterDuplicates } from '../services/helpers';

/** Initial import form to specify filters */
function ImportForm({ operationToPerform }) {
    var formData = ImportModel;

    const navigate = useNavigate()

    const stateDictionary = {
        title: { value: formData.title, setter: useState(formData.title), type: 'text', isRequired: false },
        author: { value: formData.author, setter: useState(formData.author), type: 'text', isRequired: false },
        isbn: { value: formData.isbn, setter: useState(formData.isbn), type: 'text', isRequired: false },
        publisher: { value: formData.publisher, setter: useState(formData.publisher), type: 'text', isRequired: false },
        quantity: { value: formData.quantity, setter: useState(formData.quantity), type: 'text', isRequired: true }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target)

        const requestBody = {};
        // Loop through form fields
        for (const field in ImportModel) {
            // Assign field values to requestBody
            requestBody[field] = event.target[field].value;
            // console.log(event.target[field].value)
        }
        document.getElementById("bookForm").reset();

        API.previewImportBooks(requestBody)
            .then(result => {
                result['books'].map(e => e['total_qty']=1)
                const bookCount = result['books'].length
                // API returns duplicates in some case. Eg: "ghost" keyword
                result['books'] = filterDuplicates(result['books'], 'bookID')
                // console.log(bookCount)
                result['filteredCount'] = bookCount - result['books'].length
                navigate('/books/import', {state: result})
            })

        
    };

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster />
            <TitleText text={`${operationToPerform} book`} />
            <form className="ml-4 grid sm:grid-cols-2" onSubmit={handleSubmit} id='bookForm'>
                {Object.entries(stateDictionary).map(([key, { value, setter, type, isRequired }]) => (
                    <FormElement key={key} text={key} value={setter[0]} type={type} isRequired={isRequired} onchange={setter[1]} />
                ))}
                <div className="flex sm:col-span-2 flex-row">
                    <button type="submit" value='submit' className="capitalize text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{operationToPerform}</button>
                </div>

            </form>
        </div>
    );
}

export default ImportForm
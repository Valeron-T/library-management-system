import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FormElement from '../components/FormElement';
import TitleText from '../components/TitleText';
import { BookModel } from '../services/models';
import { Toaster } from 'react-hot-toast';
import * as API from '../services/API'
import { notify, timeout } from '../services/helpers';

/** Form to create, edit or view book information */
function BookForm({ operationToPerform, view=false }) {
    const location = useLocation();
    const navigate = useNavigate();
    
    var formData = location.state?.data || BookModel;

    const stateDictionary = {
        title: { value: formData.title, setter: useState(formData.title), type: 'text' },
        author: { value: formData.author, setter: useState(formData.author), type: 'text' },
        average_rating: { value: formData.average_rating, setter: useState(formData.average_rating), type: 'text' },
        isbn: { value: formData.isbn, setter: useState(formData.isbn), type: 'text' },
        isbn13: { value: formData.isbn13, setter: useState(formData.isbn13), type: 'text' },
        language_code: { value: formData.language_code, setter: useState(formData.language_code), type: 'text' },
        num_pages: { value: formData.num_pages, setter: useState(formData.num_pages), type: 'text' },
        ratings_count: { value: formData.ratings_count, setter: useState(formData.ratings_count), type: 'text' },
        text_reviews_count: { value: formData.text_reviews_count, setter: useState(formData.text_reviews_count), type: 'text' },
        publication_date: { value: formData.publication_date, setter: useState(formData.publication_date), type: 'date' },
        publisher: { value: formData.publisher, setter: useState(formData.publisher), type: 'text' },
        total_qty: { value: formData.total_qty, setter: useState(formData.total_qty), type: 'text' },
        available_qty: { value: formData.available_qty, setter: useState(formData.available_qty), type: 'text' },
        currently_rented: { value: formData.currently_rented, setter: useState(formData.currently_rented), type: 'text' },
        // Add more properties here
    };

    function formatDate(rawDate) {
        const date = new Date(rawDate || Date.now());
        var formattedDateString = date.toISOString().substring(0, 10);
        stateDictionary['publication_date']['setter'][1](formattedDateString)
    }


    useEffect(() => {
        // If data is not received from previous page, fetch using API. Format the date in any case.
        formData.title == '' && operationToPerform != "Create" ? API.getBook(location.pathname.split('/')[2]).then(res => {
            Object.entries(stateDictionary).map(([key, { value, setter, type }]) => (
                setter[1](res.book[key])
            ))
        }).then(() => formatDate(formData.publication_date)) : formatDate(formData.publication_date)
        
    }, [])




    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target)

        const requestBody = {};
        // Loop through form fields
        for (const field in BookModel) {
            // Assign field values to requestBody
            requestBody[field] = event.target[field].value;
            // console.log(event.target[field].value)
        }
        document.getElementById("bookForm").reset();

        (operationToPerform === "Update" ? API.updateBook(formData.id, requestBody) : API.createBook(requestBody))
            .then(async result => {
                result['message'] ? notify(result['message']) : notify(result['error'], "error")
                await timeout(2000)
                navigate('/books')
            });
    };

    return (
        <div className='flex flex-col font-poppins w-full'>
            <Toaster />
            <TitleText text={`${operationToPerform} Book`} />
            {(view == true && stateDictionary.title.setter[0] == "") ? <p className='m-4 p-4 text-2xl bg-red-700 rounded-2xl text-white'>Invalid Book ID</p> : <form className="ml-4 grid lg:grid-cols-3 sm:grid-cols-2" onSubmit={handleSubmit} id='bookForm'>
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

export default BookForm
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

/**
 * Component for rendering form elements, either a text input or select dropdowns.
 * @param {Object} elementConfig
 * @param {string} elementConfig.text - Label for the form element.
 * @param {string} elementConfig.type - Type of the input element (e.g., text, number).
 * @param {string} elementConfig.value - Value of the input element.
 * @param {Function} elementConfig.onchange - Function to handle changes in the input element.
 * @param {string} [elementConfig.pattern=null] - Regex pattern for input validation.
 * @param {boolean} elementConfig.isRequired - Indicates whether the input is required. Defaults to false if not provided.
 * @param {boolean} elementConfig.isDisabled - Indicates whether the input is disabled. Defaults to false if not provided.
 * @param {boolean} elementConfig.readOnly - Indicates whether the input is read-only. Defaults to false if not provided.
 * @param {boolean} elementConfig.selectData - Indicates whether the form element is a select dropdown. Defaults to false if not provided.
 * @param {Function} [elementConfig.myfunc=null] - Function to fetch select data from API.
 * @param {Array} [elementConfig.selectLabel=null] - Labels to identify select data in the API response.
 * @returns {JSX.Element} React component representing the form element.
 */
function FormElement({ text, type, value, onchange, pattern = null, isRequired = false, isDisabled = false, readOnly = false, selectData = false, myfunc = null, selectLabel = null }) {
    // Options for select
    const [data, setData] = useState([]);

    // Fetch Select values from API
    useEffect(() => {
        if (selectData) {
            myfunc().then(res => res[selectLabel[0]].map(e => ({ value: e.id, label: e[selectLabel[1]] }))).then(e => setData(e));
        }
    }, []);

    return (
        !selectData ? (
            <div className="mb-2">
                <label htmlFor={text} className="capitalize sm:text-md font-medium text-gray-900 dark:text-white">
                    {text.replaceAll("_", " ")}
                </label>
                {readOnly ? (
                    <p className='text-xl text-licorice font-semibold'>{value}</p>
                ) : (
                    <input
                        type={type}
                        name={text}
                        id={text}
                        onChange={e => onchange(e.target.value)}
                        disabled={isDisabled}
                        pattern={pattern}
                        className={`sm:text-md ${isDisabled ? "bg-licorice" : "bg-gray-700"} min-w-[90%] mt-2 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 border-gray-600 placeholder-gray-400 text-white`}
                        value={value}
                        required={isRequired}
                    />
                )}
            </div>
        ) : (
            <div className="mb-2">
                <label htmlFor={text} className="capitalize sm:text-md font-medium text-gray-900 dark:text-white">
                    {text.replaceAll("_", " ")}
                </label>
                {readOnly ? (
                    <p className='text-xl text-licorice font-semibold'>{value}</p>
                ) : (
                    data && (
                        <Select
                            name={text}
                            id={text}
                            className='mt-2 mr-2.5 placeholder:text-white [&>*]:bg-black rounded-lg [&>*]:text-white [&>*]:focus:bg-black'
                            options={data}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'mediumpurple',
                                    primary: 'skyblue',
                                },
                            })}
                            classNames={{ singleValue: (state) => 'text-white', input: (state) => 'text-white' }}
                            isSearchable={true}
                        />
                    )
                )}
            </div>
        )
    );
}

export default FormElement;
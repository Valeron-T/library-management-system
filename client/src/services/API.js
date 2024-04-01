// Import API URL from env vars
var BaseAPI_URL = import.meta.env.VITE_BASEAPI_URL

// NOTE: TRAILING SLASH omition on endpoints that are the root of their blueprint will break the request. 
// Can be changed by disabling strict checking server side.

/** Wrapper to simplify passing body and headers in a request 
 * @param {String} method - Method type (Eg: GET, POST, PUT, DELETE)
 * @param {string} path - Path to fetch
 * @param {Object} [requestBody=null] - Body to be used for POST or other such requests. By default, it is null
 * @returns - Response recieved
*/
async function fetchWithParams(path, method, requestBody = null) {
  const url = `${BaseAPI_URL}${path}`;
  const response = await fetch(url, method && {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return jsonData;
}

// Member operations
export const getMembers = async () => await fetchWithParams('/members');

export const getMember = async (id) => await fetchWithParams(`/members/${id}`);

export const createMember = async (requestBody) =>
  await fetchWithParams('/members/', 'POST', requestBody);

export const updateMember = async (id, requestBody) =>
  await fetchWithParams(`/members/${id}`, 'PUT', requestBody);

export const deleteMember = async (id) => await fetchWithParams(`/members/${id}`, 'DELETE');

// Book operations
export const getBooks = async () => await fetchWithParams('/books');

export const getBook = async (id) => await fetchWithParams(`/books/${id}`);

export const createBook = async (requestBody) =>
  await fetchWithParams('/books/', 'POST', requestBody);

export const updateBook = async (id, requestBody) =>
  await fetchWithParams(`/books/${id}`, 'PUT', requestBody);

export const previewImportBooks = async (requestBody) =>
  await fetchWithParams('/books/import/preview', 'POST', requestBody);

export const importBooks = async (requestBody) =>
  await fetchWithParams('/books/import', 'POST', requestBody);

export const deleteBook = async (id) => await fetchWithParams(`/books/${id}`, 'DELETE');

// Transaction operations
export const getTransactions = async () => await fetchWithParams('/transactions');

export const getTransaction = async (id) => await fetchWithParams(`/transactions/${id}`);

export const modifyTransaction = async (id, requestBody) =>
  await fetchWithParams(`/transactions/${id}/return`, 'PUT', requestBody);

export const issueBook = async (requestBody) =>
  await fetchWithParams('/transactions/', 'POST', requestBody);

// Reports
export const getLatestTransactions = async (daysFilter) => await fetchWithParams(`/transactions/latest/${daysFilter}`);

export const getLatestNewUsers = async (daysFilter) => await fetchWithParams(`/members/latest/${daysFilter}`);

export const getAvgDaysBookHeld = async () => await fetchWithParams('/transactions/avg-days-book-held');

export const getBooksByRating = async () => await fetchWithParams('/books/by/rating');

export const getTop5BooksByRevenue = async () => await fetchWithParams('/books/by/revenue');

export const getLatestMemberDetails = async () => await fetchWithParams('/members/new');

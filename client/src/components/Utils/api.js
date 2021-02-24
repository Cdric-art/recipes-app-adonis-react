/**
 *
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<void>}
 */

export async function apiFetch(endpoint, options = {}) {
  options = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    ...options,
  }
  if (options.body !== null && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body)
    options.headers['Content-Type'] = 'application/json'
  }
  const response = await fetch(`http://127.0.0.1:3333${endpoint}`, options);
  if (response.status === 204) {
    return null;
  }
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    if (responseData.errors) {
      throw new ApiErrors(responseData.errors)
    }
  }
}

/**
 *
 */
export class ApiErrors {
  constructor(errors) {
    this.errors = errors
  }

  get errorsPerField() {
    return this.errors.reduce((acc, error) => {
      acc[error.field] = error.message
      return acc
    }, {})
  }

}

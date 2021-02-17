/**
 *
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<void>}
 */

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`http://127.0.0.1:3333${endpoint}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    ...options,
  });
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
}

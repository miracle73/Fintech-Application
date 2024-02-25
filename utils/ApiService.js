export default FetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    // Handle server errors
    const errorData = await response.json();
    console.log(response)
    throw new Error(errorData.message || 'An error occurred while activating the token.');
  }

  // Handle successful response
  const data = await response.json();

  if (data.status === 'Success') {
    // console.log('Post request data:', data);
    return { data: data.data, error: false, errorMessage: null, successMessage: data.message, token: data.token };
  }

  console.log(response)
  throw new Error(data?.message)
}
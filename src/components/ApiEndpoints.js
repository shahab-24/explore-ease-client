

export const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
  params: {
    query: 'eiffel tower',
    lang: 'en_US',
    units: 'km'
  },
  headers: {
    'x-rapidapi-key':import.meta.env.VITE_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
};

// export async function fetchData() {
// 	try {
// 		const response = await axios.request(options);
// 		console.log(response.data);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }


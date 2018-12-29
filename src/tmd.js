import axios from 'axios';

const api = 'a74416065ae05c7418abdae7c3f938a4';

/**
 * Uses themoviedb search API for the passed query
 * @param {String} query
 * @return {Promise} Promise containing the JSON result of the API request.
 */
async function search(query = '') {
    query = query.length > 0 ? query : ' ';

    const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${encodeURIComponent(
            query
        )}`
    );
    return await response.data.results;
}

export { search };

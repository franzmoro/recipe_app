import axios from 'axios';
import qs from 'querystring';
import config from '../../config';

const { baseAPIUrl } = config;

const handleAPIResponse = ({ status, data }) => {
  if (status === 404 || !(data && data.length)) {
    throw new Error('not found');
  }
  if (status !== 200) {
    throw new Error('error retrieving recipes');
  }
  return data;
};

export const getRecipes = (filterParams = {}) => {
  const { search, maxCookingTimeMinutes } = filterParams;
  const stringifiedQuery = qs.stringify({ search, maxCookingTimeMinutes });

  return axios.get(`${baseAPIUrl}/recipes?${stringifiedQuery}`)
    .then(handleAPIResponse);
};

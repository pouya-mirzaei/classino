import { iranLocations } from './axios/instances';

const getAllStates = async () => {
  try {
    const response = await iranLocations.get('/states');
    return response;
  } catch (err) {
    throw err;
  }
};

const getCitiesWithStateId = async (stateId) => {
  try {
    const response = await iranLocations.get(`cities?state_id=${stateId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export { getAllStates, getCitiesWithStateId };

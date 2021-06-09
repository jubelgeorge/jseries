import axios from "axios";


export const getSearchShows = async (arg) => {
  return await axios.post(
      '/api/search/shows',      
      arg      
  );
};


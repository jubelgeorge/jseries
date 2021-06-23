import axios from "axios";


export const getSearchShows = async (arg) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/search-shows`,      
      arg      
  );
};
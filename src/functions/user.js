import axios from "axios";


export const addShow = async (show, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/show`,
    show,
    {
      headers: {
        authtoken,
      },
    }
);

export const getShows = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/shows`, {
    headers: {
      authtoken,
    },
});

export const removeShow = async (IMDB, authtoken) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/user/show/${IMDB}`,
    {
      headers: {
        authtoken,
      },
    },
    {}
);

export const getShow = async (id, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/show/${id}`, {
    headers: {
      authtoken,
    },
});

export const updateShow = async (showWatchStatus, id, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/show/${id}`,
    {showWatchStatus},
    {
      headers: {
        authtoken,
      },
    }    
);

export const updateShowByIMDB = async (showWatchStatus, IMDB, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/show-byimdb/${IMDB}`,
    {showWatchStatus},
    {
      headers: {
        authtoken,
      },
    }    
);

export const getShowsByText = async (text, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/search-shows`, 
    {text}, 
    {
      headers: {
        authtoken,
      },
    }
);

export const getLoggedInUser = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user`, {
    headers: {
      authtoken,
    },
});

export const updateLoggedInUserProfile = async (userProfileStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user`,
    {userProfileStatus},
    {
      headers: {
        authtoken,
      },
    }    
);

export const getUsers = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/users`, {
    headers: {
      authtoken,
    },
});

export const getUserShows = async (userId, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/${userId}`, {
    headers: {
      authtoken,
    },
});  
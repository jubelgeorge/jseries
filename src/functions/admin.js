import axios from "axios";


export const getUsers = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/users`, {
    headers: {
      authtoken,
    },
});

export const removeUser = async (userId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/admin/user/${userId}`, {
    headers: {
      authtoken,
    },
});

export const getUserShows = async (userId, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/user-shows/${userId}`, {
    headers: {
      authtoken,
    },
}); 

export const removeUserShow = async (userId, showId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/user-show/${userId}`,
    {showId},
    {
      headers: {
        authtoken,
      },
    }    
);
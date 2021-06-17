import axios from "axios";

export const getUpcomingShows = async () =>
  await axios.get(`${process.env.REACT_APP_API}/upcoming-shows`);

export const removeUpcomingShow = async (upcomingShowId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/admin/upcoming-show/${upcomingShowId}`, {
    headers: {
      authtoken,
    },
  });

export const createUpcomingShow = async (formData, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/admin/upcoming-show`,
    formData,
    {
      headers: {
        authtoken,
      },
    }
  );


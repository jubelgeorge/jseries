import axios from "axios";

export const getTrendingShows = async () =>
  await axios.get(`${process.env.REACT_APP_API}/trending-shows`);

export const removeTrendingShow = async (trendingShowId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/admin/trending-show/${trendingShowId}`, {
    headers: {
      authtoken,
    },
  });

export const createTrendingShow = async (formData, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/admin/trending-show`,
    formData,
    {
      headers: {
        authtoken,
      },
    }
  );


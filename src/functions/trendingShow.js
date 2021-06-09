import axios from "axios";

export const getTrendingShows = async () =>
  await axios.get('/api/admin/trending-shows');

export const removeTrendingShow = async (trendingShowId, authtoken) =>
  await axios.delete(`/api/admin/trending-show/${trendingShowId}`, {
    headers: {
      authtoken,
    },
  });

export const createTrendingShow = async (formData, authtoken) =>
  await axios.post(
    '/api/admin/trending-show',
    formData,
    {
      headers: {
        authtoken,
      },
    }
  );


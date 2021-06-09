import axios from "axios";

export const getUpcomingShows = async () =>
  await axios.get('/api/admin/upcoming-shows');

export const removeUpcomingShow = async (upcomingShowId, authtoken) =>
  await axios.delete(`/api/admin/upcoming-show/${upcomingShowId}`, {
    headers: {
      authtoken,
    },
  });

export const createUpcomingShow = async (formData, authtoken) =>
  await axios.post(
    '/api/admin/upcoming-show',
    formData,
    {
      headers: {
        authtoken,
      },
    }
  );


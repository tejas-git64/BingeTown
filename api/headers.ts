export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY as string,
  },
};

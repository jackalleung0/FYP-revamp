export const getArtistName = (artist_display: string) => {
  if (!artist_display)
    return "";
  return artist_display.split("\n")[0];
};

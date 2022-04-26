import { Artwork } from "./Artwork";
import { instance } from "./AboutArtist";

export const getArtworkDetails = async (id: string) => {
  const fields = ["artist_display", "artist_id", "term_titles"]
    .join(",")
    .replaceAll(" ", "");

  const { data } = await instance.get<{ data: Artwork }>(`/artworks/${id}`, {
    params: {
      fields: fields,
    },
  });
  return data.data;
};

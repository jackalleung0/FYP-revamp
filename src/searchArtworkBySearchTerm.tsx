import { instance } from "./SearchResult";

export const searchArtworkBySearchTerm = async (term: string, limit = 100) => {
  if (!term) return [];
  return (
    await instance.get("artworks/search", {
      params: {
        limit,
        // just put all the author in the search list, and let the search do its thing
        // the array is for readability
        q: term,
        fields: [
          "image_id",
          "title",
          "thumbnail",
          "id",
          "artist_display",
          "term_titles",
        ].join(","),
      },
    })
    // ensure there are image_id for search result
  ).data.data.filter((e:any) => !!e.image_id);
};

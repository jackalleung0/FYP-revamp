const axios = require("axios");

function buildHTML({ title, url, alt, id }) {
  console.log({ title, url, alt, id });
  const template = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title} | AR Art Gallery</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:image" content="${url}" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="${alt}" />
        <meta name="description" content="${alt}" />
        <link rel="icon" href="/favicon.ico">
      </head>
      <body>
        <script>
          window.location="https://final-year-project-revamp.web.app/artwork/${id}";
        </script>
      </body>
    </html>
    `;
  return template;
}

const searchFields = [
  "id",
  "title",
  "image_id",
  "artist_display",
  "publication_history",
  "exhibition_history",
  "provenance_text",
  "inscriptions",
  "api_model",
  "api_link",
  "is_boosted",
  "alt_titles",
  "thumbnail",
  "main_reference_number",
  "has_not_been_viewed_much",
  "boost_rank",
  "date_start",
  "date_end",
  "date_display",
  "date_qualifier_title",
  "date_qualifier_id",
  "place_of_origin",
  "dimensions",
  "medium_display",
  "inscriptions",
  "credit_line",
  "publication_history",
  "exhibition_history",
  "provenance_text",
  "publishing_verification_level",
  "internal_department_id",
  "fiscal_year",
  "fiscal_year_deaccession",
  "is_public_domain",
  "is_zoomable",
  "max_zoom_window_size",
  "copyright_notice",
  "has_multimedia_resources",
  "has_educational_resources",
  "colorfulness",
  "color",
  "latitude",
  "longitude",
  "latlon",
  "is_on_view",
  "on_loan_display",
  "gallery_title",
  "gallery_id",
  "artwork_type_title",
  "artwork_type_id",
  "department_title",
  "department_id",
  "artist_id",
  "artist_title",
  "alt_artist_ids",
  "artist_ids",
  "artist_titles",
  "category_ids",
  "category_titles",
  "artwork_catalogue_ids",
  "term_titles",
  "style_id",
  "style_title",
  "alt_style_ids",
  "style_ids",
  "style_titles",
  "classification_id",
  "classification_title",
  "alt_classification_ids",
  "classification_ids",
  "classification_titles",
  "subject_id",
  "alt_subject_ids",
  "subject_ids",
  "subject_titles",
  "material_id",
  "alt_material_ids",
  "material_ids",
  "material_titles",
  "technique_id",
  "alt_technique_ids",
  "technique_ids",
  "technique_titles",
  "theme_titles",
  "image_id",
  "alt_image_ids",
  "alt_image_ids",
  "document_ids",
  "sound_ids",
  "video_ids",
  "text_ids",
  "section_ids",
  "section_titles",
  "site_ids",
  "suggest_autocomplete_boosted",
  "suggest_autocomplete_all",
  "last_updated_source",
  "last_updated",
  "timestamp",
].join(",");

const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

const express = require("express");
const exp = express();
const { logs } = require("./log");
exp.get("/:artworkID", logs, async (req, res) => {
  const { artworkID } = req.params;
  // reject if there are no enough parameter
  if (!artworkID || isNaN(Number.parseInt(artworkID))) {
    console.log(`incorrect artworkID ${artworkID}`);
    return res.sendStatus(400);
  }

  const {
    data: { data },
  } = await instance.get(`/artworks/${artworkID}`, {
    params: {
      ids: artworkID,
      fields: searchFields,
    },
  });

  if (data.length === 0) return res.status(400);

  const { title, image_id, thumbnail } = data;
  const htmlString = buildHTML({
    title: title,
    url: `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`,
    alt: thumbnail?.alt_text || "",
    id: artworkID,
  });

  return res.status(200).send(htmlString);
});

// adapted from https://hackernoon.com/firebase-to-the-rescue-dynamic-routing-via-hosting-functions-integration-aef888ddf311
exports.pageMetadata = exp;

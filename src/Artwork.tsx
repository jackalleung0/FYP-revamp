export type Artwork = {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: true;
  title: string;
  alt_titles: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  main_reference_number: string;
  has_not_been_viewed_much: false;
  boost_rank: number;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: any;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  medium_display: string;
  inscriptions: any;
  credit_line: string;
  publication_history: string;
  exhibition_history: string;
  provenance_text: string;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number;
  fiscal_year_deaccession: any;
  is_public_domain: true;
  is_zoomable: true;
  max_zoom_window_size: number;
  copyright_notice: any;
  has_multimedia_resources: true;
  has_educational_resources: false;
  colorfulness: number;
  color: {
    h: number;
    l: number;
    s: number;
    percentage: number;
    population: number;
  };
  latitude: number;
  longitude: number;
  latlon: string;
  is_on_view: true;
  on_loan_display: any;
  gallery_title: string;
  gallery_id: number;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: [];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  artwork_catalogue_ids: number[];
  term_titles: string[];
  style_id: string;
  style_title: string;
  alt_style_ids: [];
  style_ids: string[];
  style_titles: string[];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: string[];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: string;
  alt_material_ids: [];
  material_ids: string[];
  material_titles: string[];
  technique_id: string;
  alt_technique_ids: string[];
  technique_ids: string[];
  technique_titles: string[];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: [];
  document_ids: string[];
  sound_ids: string[];
  video_ids: [];
  text_ids: [];
  section_ids: [];
  section_titles: [];
  site_ids: number[];
  suggest_autocomplete_boosted: string;
  suggest_autocomplete_all: {
    input: string[];
    weight: number;
    contexts: { groupings: string[]; };
  }[];
  last_updated_source: string;
  last_updated: string;
  timestamp: string;
};
export interface DadataSuggestion {
  value: string;
  unrestricted_value: string;
  data: DadataAddress
}

interface DadataAddress {
  postal_code: string | null;
  country: string | null;
  region_fias_id: string | null;
  region_kladr_id: string | null;
  region_with_type: string | null;
  region_type: string | null;
  region_type_full: string | null;
  region: string | null;
  area_fias_id: string | null;
  area_kladr_id: string | null;
  area_with_type: string | null;
  area_type: string | null;
  area_type_full: string | null;
  area: string | null;
  city_fias_id: string | null;
  city_kladr_id: string | null;
  city_with_type: string | null;
  city_type: string | null;
  city_type_full: string | null;
  city: string;
  city_area: string | null;
  city_district_fias_id: string | null;
  city_district_kladr_id: string | null;
  city_district_with_type: string | null;
  city_district_type: string | null;
  city_district_type_full: string | null;
  city_district: string | null;
  settlement_fias_id: string | null;
  settlement_kladr_id: string | null;
  settlement_with_type: string | null;
  settlement_type: string | null;
  settlement_type_full: string | null;
  settlement: string | null;
  street_fias_id: string | null;
  street_kladr_id: string | null;
  street_with_type: string | null;
  street_type: string | null;
  street_type_full: string | null;
  street: string | null;
  house_fias_id: string | null;
  house_kladr_id: string | null;
  house_type: string | null;
  house_type_full: string | null;
  house: string | null;
  block_type: string | null;
  block_type_full: string | null;
  block: string | null;
  flat_type: string | null;
  flat_type_full: string | null;
  flat: string | null;
  flat_area: string | null;
  square_meter_price: string | null;
  flat_price: string | null;
  postal_box: string | null;
  fias_id: string | null;
  fias_code: string | null;
  fias_level: string | null;
  fias_actuality_state: string | null;
  kladr_id: string | null;
  capital_marker: string | null;
  okato: string | null;
  oktmo: string | null;
  tax_office: string | null;
  tax_office_legal: string | null;
  timezone: string | null;
  geo_lat: string | null;
  geo_lon: string | null;
  beltway_hit: string | null;
  beltway_distance: string | null;
  metro: string | null;
  qc_geo: string | null;
  qc_complete: string | null;
  qc_house: string | null;
  history_values: [
      string | null
  ];
  unparsed_parts: string | null;
  source: string | null;
  qc: string | null;
}

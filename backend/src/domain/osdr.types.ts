
export interface OsdrDatasetIndexEntry {
  REST_URL: string;
}

export interface OsdrDatasetsIndex {
  [datasetId: string]: OsdrDatasetIndexEntry;
}


export interface OsdrDatasetFile {
  file_name: string;
  url: string;
  size?: number;
  type?: string;
  category?: string;
  [key: string]: any;
}


export interface OsdrDatasetDetails {
  id: string;
  title?: string;
  description?: string;
  preview_image?: string;
  files?: OsdrDatasetFile[];
  groups?: any[];
  categories?: any[];
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}


export interface NormalizedOsdrItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  url: string;
}

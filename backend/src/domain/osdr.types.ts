export interface OsdrFileItem {
  file_name: string;
  remote_url: string;
  visible: boolean;
  category?: string;
}

export interface OsdrStudyGroup {
  file_count: number;
  study_files: OsdrFileItem[];
}

export interface OsdrFileResponse {
  hits: number;
  studies: Record<string, OsdrStudyGroup>;
}

export interface IssPositionRaw {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  timestamp: number;
  message: string;
}

export interface IssPosition {
  lat: number;
  lon: number;
  altitude?: number;
  velocity?: number;
  fetched_at: Date;
  updated_at?: Date;
}

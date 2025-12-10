export interface JwstImageRaw {
  id: string;
  title?: string;
  description?: string;
  instrument?: string;
  thumbnail_url: string;
  image_url: string;
  captured_at?: string;
}

export interface JwstImage {
  id: string;
  title: string;
  instrument: string;
  thumbnail_url: string;
  image_url: string;
  captured_at: Date | null;
}

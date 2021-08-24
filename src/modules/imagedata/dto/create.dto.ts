export class createImageData {
  shortcode: string;
  annotation?: {
    description_english: string;
  };
  object?: {
    size: {
      width: string;
      height: string;
    };
  };
  project_id: string;
  constructor(payload: createImageData) {
    Object.assign(this, payload);
  }
}

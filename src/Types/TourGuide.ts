export interface Story {
  title: string;
  snippet: string;
  _id: string;
  description: string;
  images?: string[];
  photo?: string;
}

export interface TourGuide {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  experience: string;
  specialty: string;
  bio: string;
  stories: Story[];
}

export interface Story {
        _id: string;
        title: string;
        description: string;
        photo: string;
        images?: string[];
        story: string;
        date: string;
        author: {
          name: string;
          email: string;
          uid: string;
        };
        likes: number;
        likedBy: string[];
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

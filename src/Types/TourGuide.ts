export interface Story {
        title: string;
        image: string;
        snippet: string;
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
        stories: Story[]
}
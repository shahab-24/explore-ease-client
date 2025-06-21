export interface User {
        _id: string;
        name: string;
        email: string;
        photo: string;
        phone?: string;
        address?: string;
        displayName?: string;
        photoURL?: string;
        role: "tourist" | "admin" | "tourGuide"


}
export interface User {
        _id: string,
        name: string,
        email: string,
        photo: string,
        phone?: string,
        address?: string,
        role: "tourist" | "admin" | "guide"


}
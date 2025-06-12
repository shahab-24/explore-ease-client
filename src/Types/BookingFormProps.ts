import { User } from "./UserTypes";

export type BookingFormProps = {
        user: User;
        packageName: string;
        packagePrice: number;
        guides: { _id: string; name: string }[];
        onSubmit: (data: BookingData) => void;
      };

export type BookingData = {
        tourDate: Date | null;
        guideName: string;
      };
      
import { TourGuide } from "./TourGuide";
import { User } from "./UserTypes";

export type BookingFormProps = {
        user: User;
        packageName: string;
        packagePrice: number;
        guides: TourGuide[];
        onSubmit: (data: BookingData) => void;
      };


export type BookingData = {
        tourDate: Date | null;
        guide: {name: string,
                email: string
        }
      };
      
export interface BookingInfo {
        packageId: string;
        packageName: string;
        touristName: string | undefined;
        touristEmail: string | undefined;
        touristImage: string | undefined;
        price: number;
        tourDate: Date | null;
        selectedGuide: {name: string,
                email: string}


}

export interface Booking {
        _id: string;
        packageId: string;
        packageName: string;
        touristName: string;
        touristEmail: string;
        touristImage?: string;
        price: number;
        tourDate: string;
        selectedGuide: {
          name: string;
          email: string;
        };
        status: "pending" | "in-review" | "accepted" | "rejected" | "cancelled" | "refunded" | "expired";
        transactionId?: string;
        rescheduleRequest?: {
          requestedDate: string;
          reason: string;
          status: "pending" | "approved" | "rejected";
        };
        refundRequest?: {
          reason: string;
          status: "pending" | "approved" | "rejected";
        };
        createdAt?: string;
      }
      
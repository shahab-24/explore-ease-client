export interface BookingInfo {
        packageId: string;
        packageName: string;
        touristName: string | undefined;
        touristEmail: string | undefined;
        touristImage: string | undefined;
        price: number;
        tourDate: Date | null;
        guideName: string


}
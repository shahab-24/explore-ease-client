import { Tourplan } from './TourPlan';

export interface Package {

        _id: string;
        name: string;
        description: string;
        price: number;
        images: string[];
        tourplan: Tourplan[];
}
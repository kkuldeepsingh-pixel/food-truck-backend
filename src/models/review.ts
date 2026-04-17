export interface Review {
    id: number;
    truckId: number;
    user: string;
    rating: number; // 1-5
    comment: string;
}

export let reviews: Review[] = [];
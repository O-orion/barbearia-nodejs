export interface BarberiaDto {
    name: string;
    email: string;
    address: string;
    phone: string;
    website?: string;
    description: string;
    services: string[];
    rating?: number;
    reviews?: string[];
    openingHours: string;
    closingHours: string;
    location?: { lat: number; lng: number } | null;
    images: string[];
}

export interface BarberiaDto {
    name: string;
    email: string;
    address: string;
    phone: string;
    website?: string;
    description: string;
    rating?: number;
    openingHours: string;
    closingHours: string;
    location?: { lat: number; lng: number } | null;
    images: string[];
    owner: string;
}

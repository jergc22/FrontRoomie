export class Room {
    description: string;
    user_id: number;
    date_created: Date;
    smoke: boolean;
    pet: boolean;
    priv_bath: boolean;
    n_baths: number;
    n_rooms: number;
    garage: boolean;
    n_roomies: number;
    price: number;
    location: string;
    title: string;
    city_id: number;

    constructor(
        description: string,
        user_id: number,
        date_created: Date,
        smoke: boolean,
        pet: boolean,
        priv_bath: boolean,
        n_baths: number,
        n_rooms: number,
        garage: boolean,
        n_roomies: number,
        price: number,
        location: string,
        title: string,
        city_id: number
    ) {
        this.description = description;
        this.user_id = user_id;
        this.date_created = date_created;
        this.smoke = smoke;
        this.pet = pet;
        this.priv_bath = priv_bath;
        this.n_baths = n_baths;
        this.n_rooms = n_rooms;
        this.garage = garage;
        this.n_roomies = n_roomies;
        this.price = price;
        this.location = location;
        this.title = title;
        this.city_id = city_id;
    }
}

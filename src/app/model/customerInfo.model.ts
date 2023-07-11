import { services } from "./services.model";


export class customer {
    customerName?: string;
    address?: string;
    email?: string;
    dueDate?: string;
    phone?: string;
    service?: services[];
}
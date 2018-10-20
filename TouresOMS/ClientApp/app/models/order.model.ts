export interface Order {
    id?: number;
    price?: number;
    count?: number;
    state?: number;
    stateName?: string;

    /*ordId?: number,
    custId?: number,
    ordenDate?: Date,
    price?: number,
    quantity?: number,
    lItem?: OrderItems[]*/
}

/*export interface OrderItems {
    itemId?: number,
    ordId?: number,
    prodId?: number,
    productName?: string,
    partNum?: string,
    price?: number,
    quantity?: number
}*/
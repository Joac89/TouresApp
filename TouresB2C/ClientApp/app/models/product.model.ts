export interface Product {
    id?: number;
    price?: number;
    name?: string;
    count?: number;
    extra?: ExtraProd
}

export interface ExtraProd {
    tipoHabitacion?: string,
    precioHotel?: string,
    modalidadTransporte?: string,
    FechaLlegada?: string, //2018-08-11 00:00:00.0 //2018-12-20T16:20:30.000001Z
    FechaSalida?: string, //2018-08-11 00:00:00.0 //2018-12-20T16:20:30.000001Z
    pais?: string
}
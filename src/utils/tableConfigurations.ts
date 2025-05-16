import type { RoomsResponse, ColumnConfig, HotelResponse } from '../types';

export const COLUMNS_HOTELS: ColumnConfig<HotelResponse>[] = [
   { key: 'nombre', label: 'Nombre' },
   { key: 'direccion', label: 'Dirección' },
   { key: 'ciudad', label: 'Ciudad' },
   { key: 'nit', label: 'NIT' },
   { key: 'max_habitaciones', label: 'Habitaciones' },
];

export const COLUMNS_ROOMS: ColumnConfig<RoomsResponse>[] = [
   { key: 'tipo_habitacion', label: 'Tipo habitación' },
   { key: 'acomodacion', label: 'Acomodación' },
   { key: 'cantidad', label: 'Cantidad' },
];
export interface HotelResponse {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  nit: string;
  max_habitaciones: number;
};

export interface RoomsResponse {
  id: number;
  hotel: string;
  tipo_habitacion: string;
  acomodacion: string;
  cantidad: string;
};

export interface HotelFormData {
  nombre: string;
  direccion: string;
  ciudad: string;
  nit: number;
  max_habitaciones: number;
};

export interface RoomFormData {
  room_type: number | null;
  accommodation: number | null;
  amount: number;
};

export interface RoomType {
     id: number;
     nombre: string;
     created_at: string;
     updated_at: string;
   }

 export interface Accommodation {
   id: number;
   nombre: string;
   created_at: string;
   updated_at: string;
 }

export interface RoomConfigurationRequest {
  hotel_id: number;
  room_type_id: number | null;
  accommodation_id: number | null;
  cantidad: number;
}

export interface RoomConfigurationSchema {
 room_type: number | null;
 accommodation: number | null;
 amount: number;
}

export interface FormErrors {
  [key: string]: string;
};

export type RoomTypeKey = 'Estándar' | 'Junior' | 'Suite';

export type ColumnConfig<T, K extends keyof T = keyof T> = {
  key: K;
  label: string;
  render?: (value: T[K], row: T) => React.ReactNode;
};

export type DynamicTableProps<T> = {
  data: T[];
  columns: ColumnConfig<T>[];
  actions?: (row: T) => React.ReactNode;
};
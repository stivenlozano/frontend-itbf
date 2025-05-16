import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { cleanText } from "../utils/constants";
import type { HotelResponse, HotelFormData } from "../types";
import { handleErrors } from "../utils/handleErrors";
import { getAll, getId, remove } from "../services/hotelServices";

const initForm: HotelFormData = {
  nombre: "",
  direccion: "",
  ciudad: "",
  nit: 0,
  max_habitaciones: 0,
};

export const useHotels = (id?: number) => {
  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  const [hotelsFiltered, setHotelsFiltered] = useState<HotelResponse[]>([]);
  const [hotel, setHotel] = useState<HotelFormData>(initForm);

  const fetchHotels = useCallback(async () => {
    try {
      const { data } = await getAll();
      setHotels(data.results);
      setHotelsFiltered(data.results);
    } catch (err) {
      handleErrors(err);
    }
  }, []);

  const fetchHotel = async (id: number) => {
    try {
      const { data } = await getId(id);

      setHotel({
        nombre: data.results.nombre,
        direccion: data.results.direccion,
        ciudad: data.results.ciudad,
        nit: data.results.nit,
        max_habitaciones: data.results.max_habitaciones,
      });
    } catch (err) {
      handleErrors(err);
    }
  };

  const handlefiltered = (e: ChangeEvent<HTMLInputElement>) => {
    const text = cleanText(e.target.value);

    const data = hotels.filter((hotel) =>
      cleanText(hotel.nombre).includes(text) ||
      cleanText(hotel.direccion).includes(text) ||
      cleanText(hotel.ciudad).includes(text) ||
      cleanText(hotel.nit).includes(text)
    );
    setHotelsFiltered(data);
  };

  const handleRemove = useCallback(
    async (idRoom: number) => {
      try {
        await remove(idRoom);
        toast.success("Hotel eliminado exitosamente");
        fetchHotels();
      } catch (err) {
        handleErrors(err);
      }
    },
    [fetchHotels]
  );

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  useEffect(() => {
    if (!id) return;

    fetchHotel(id);
  }, [id]);

  return { hotel, hotels: hotelsFiltered, handleRemove, handlefiltered };
};

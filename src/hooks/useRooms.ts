import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { cleanText } from "../utils/constants";
import type { RoomFormData, RoomsResponse, RoomTypeKey } from "../types";
import { handleErrors } from "../utils/handleErrors";
import { getByHotel, getId, remove } from "../services/roomServices";

const initForm: RoomFormData = {
  room_type: null,
  accommodation: null,
  amount: 1,
};

export const useRooms = (id: number, idRoom?: number) => {
  const [rooms, setRooms] = useState<RoomsResponse[]>([]);
  const [roomsFiltered, setRoomsFiltered] = useState<RoomsResponse[]>([]);
  const [room, setRoom] = useState<RoomFormData>(initForm);
  const [roomType, setRoomType] = useState<RoomTypeKey>();

  const fetchRooms = useCallback(async () => {
    const { data } = await getByHotel(id);
    setRooms(data.results);
    setRoomsFiltered(data.results);
  }, [id]);

  const fetchRoom = async (idRoom: number) => {
    try {
      const { data } = await getId(idRoom);

      setRoomType(data.results.tipo_habitacion);
      setRoom({
        room_type: data.results.id_tipo_habitacion,
        accommodation: data.results.id_acomodacion,
        amount: data.results.cantidad,
      });
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (!idRoom) return;

    fetchRoom(idRoom);
  }, [idRoom]);

  const handlefiltered = (e: ChangeEvent<HTMLInputElement>) => {
    const text = cleanText(e.target.value);

    const data = rooms.filter((room) =>
      cleanText(room.tipo_habitacion).includes(text) ||
      cleanText(room.acomodacion).includes(text)
    );
    setRoomsFiltered(data);
  };

  const handleRemove = useCallback(
    async (id: number) => {
      try {
        await remove(id);
        toast.success("Habitación eliminada exitosamente");
        fetchRooms();
      } catch (err) {
        handleErrors(err);
      }
    },
    [fetchRooms]
  );

  return {
    room,
    rooms: roomsFiltered,
    roomType,
    handleRemove,
    handlefiltered
  };
};

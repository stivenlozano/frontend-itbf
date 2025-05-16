import { useEffect, useState } from 'react';
import { handleErrors } from '../utils/handleErrors';
import { getAll } from '../services/roomTypeServices';

type RoomTypes = {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<RoomTypes[]>([]);

  const fetchRoomTypes = async () => {
    try {
      const { data } = await getAll();
      setRoomTypes(data.results);
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return roomTypes;
};
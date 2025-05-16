import { useEffect, useState } from 'react';
import { isRoomTypeKey, isValidCombination } from '../utils/roomValidations';
import type { Accommodation, RoomTypeKey } from '../types';
import { getAll } from '../services/accommodationServices';

export const useAccommodations = (roomType: RoomTypeKey | undefined) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    if (!roomType || !isRoomTypeKey(roomType)) return;

    const fetch = async () => {
      const { data } = await getAll();
      const valid = data.results.filter((item: Accommodation) => isValidCombination(roomType, item.nombre));
      setAccommodations(valid);
    };

    fetch();
  }, [roomType]);

  return accommodations;
};
export const validCombinations = {
  'Estándar': ['Sencilla', 'Doble'],
  'Junior': ['Triple', 'Cuádruple'],
  'Suite': ['Sencilla', 'Doble', 'Triple'],
};

export type RoomTypeKey = keyof typeof validCombinations;

export const isRoomTypeKey = (value: string): value is RoomTypeKey => {
  return ['Estándar', 'Junior', 'Suite'].includes(value);
};

export const isValidCombination = (roomType: RoomTypeKey, accommodation: string): boolean => {
  return validCombinations[roomType].includes(accommodation);
};
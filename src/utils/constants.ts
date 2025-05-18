export const URL_BASE = import.meta.env.VITE_API_URL;

export const CITIES: string[] = [
   "Arauca",
   "Armenia",
   "Barranquilla",
   "Bogotá",
   "Bucaramanga",
   "Cali",
   "Cartagena",
   "Cúcuta",
   "Florencia",
   "Ibagué",
   "Leticia",
   "Manizales",
   "Medellín",
   "Mitú",
   "Montería",
   "Neiva",
   "Pasto",
   "Pereira",
   "Popayán",
   "Puerto Carreño",
   "Quibdó",
   "Riohacha",
   "San Andrés",
   "Santa Marta",
   "Sincelejo",
   "Tunja",
   "Valledupar",
   "Villavicencio",
   "Yopal"
 ];

 export const cleanText = (text: string) => {
  return text
    .normalize('NFD')
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .trim();      
}
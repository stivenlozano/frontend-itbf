import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { hotelSchema } from "../utils/validationSchemas";
import type { HotelFormData, FormErrors } from "../types";
import { handleErrors } from "../utils/handleErrors";
import { create, update } from "../services/hotelServices";

export const useHotelForm = (id: number | null, hotel: HotelFormData) => {
   const navigate = useNavigate();

   const [formData, setFormData] = useState<HotelFormData>(hotel);
   const [errors, setErrors] = useState<FormErrors>({});

   useEffect(() => {
      setFormData(hotel);
   }, [hotel])
   
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "nit" && value.length > 9) return;

      setFormData((prev) => ({
         ...prev,
         [name]: name === "max_habitaciones" || name === "nit" ? Number(value.trim()) : value
      }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         await hotelSchema.validate(formData, { abortEarly: false });
         setErrors({});

         if (!id) {
            await create(formData);
            toast.success("Hotel registrado exitosamente");
         } else {
            await update(id, formData);
            toast.success("Hotel actualizado exitosamente");
         }

         navigate("/hotels");
      } catch (err) {
         if (err instanceof yup.ValidationError) {
             const newErrors: FormErrors = {};
         
             err.inner.forEach((e) => {
               if (e.path) newErrors[e.path] = e.message;
             });
         
             setErrors(newErrors);
             return;
           }

         handleErrors(err);
      }
   };

   const handleCancel = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`/hotels`);
   };

   return { formData, errors, handleChange, handleSubmit, handleCancel };
};

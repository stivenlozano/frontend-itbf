import React, { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { roomSchema } from "../utils/validationSchemas";
import type { FormErrors, RoomTypeKey, RoomFormData } from "../types";
import { handleErrors } from "../utils/handleErrors";
import { create, getId, update } from "../services/roomServices";

const initForm: RoomFormData = {
   room_type: null,
   accommodation: null,
   amount: 1,
 };

export const useRoomForm = (id: number, idRoom: number) => {
   const navigate = useNavigate();

   const [roomType, setRoomType] = useState<RoomTypeKey>();
   const [formData, setFormData] = useState<RoomFormData>(initForm);
   const [errors, setErrors] = useState<FormErrors>({});

   const fetchRoom = async (idRoom: number) => {
      try {
        const { data } = await getId(idRoom);
  
        setRoomType(data.results.tipo_habitacion);
        setFormData({
          room_type: data.results.id_tipo_habitacion,
          accommodation: data.results.id_acomodacion,
          amount: data.results.cantidad,
        });
      } catch (err) {
        handleErrors(err);
      }
    };

    useEffect(() => {
      if (!idRoom) return;

      fetchRoom(idRoom);
    }, [idRoom]);

   const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: name === "amount" ? Number(value) : value,
      }));
   };

   const handleRoomTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedRoomType = e.target.options[e.target.selectedIndex].text as RoomTypeKey;

      setRoomType(selectedRoomType);
      setFormData({ ...formData, accommodation: null })

      handleChange(e);
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         await roomSchema.validate(formData, { abortEarly: false });
         setErrors({});

         const data = {
            hotel_id: Number(id),
            room_type_id: Number(formData.room_type),
            accommodation_id: Number(formData.accommodation),
            cantidad: Number(formData.amount),
         };

         if (!idRoom) {
            await create(data);
            toast.success("Habitación registrada exitosamente");
         } else {
            await update(idRoom, data);
            toast.success("Habitación actualizada exitosamente");
         }

         navigate(`/hotels/${id}/rooms`);
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
      navigate(`/hotels/${id}/rooms`);
   };

   return {
      roomType,
      formData,
      errors,
      handleChange,
      handleSubmit,
      handleCancel,
      handleRoomTypeChange,
   };
};

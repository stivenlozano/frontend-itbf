import React from 'react';
import { useParams } from 'react-router-dom';

import { useRoomForm } from '../hooks/useRoomForm';
import { useRoomTypes } from '../hooks/useRoomTypes';
import { useAccommodations } from '../hooks/useAccommodations';

import Layout from '../layouts';

const RoomForm: React.FC = () => {
   const { id, idRoom } = useParams();
   const { roomType, formData, errors, handleRoomTypeChange, handleChange, handleSubmit, handleCancel } = useRoomForm(Number(id), Number(idRoom));
   const roomTypes = useRoomTypes();
   const accommodations = useAccommodations(roomType);
   
   return(
      <Layout>
         <main className="form">
            <h1 className="form__title">Formulario de {!idRoom ? 'registro' : 'actualización'}</h1>

            <form className="form__form" onSubmit={handleSubmit}>

                  <div className="form__field">
                     <label className="form__label" htmlFor='room_type'>Tipo de habitación:</label>
                     <select  className="form__select" id='room_type' name="room_type" value={Number(formData.room_type)} onChange={handleRoomTypeChange}>
                        { !formData.room_type && <option value="">Seleccione una opción</option> }
                        {
                           roomTypes.map((roomType) => (
                              <option key={roomType.id} value={roomType.id}>{roomType.nombre}</option>
                           ))
                        }
                     </select>
                     {errors.room_type && <p className="form__error">{errors.room_type}</p>}
                  </div>

                  <div className="form__field">
                     <label className="form__label" htmlFor='accommodation'>Acomodación:</label>
                     <select  className="form__select" id='accommodation' name="accommodation" value={Number(formData.accommodation)} onChange={handleChange}>
                        { !formData.accommodation && <option value="">Seleccione una opción</option> }
                        {
                           accommodations.map((accommodation) => (
                              <option key={accommodation.id} value={accommodation.id}>{accommodation.nombre}</option>
                           ))
                        }
                     </select>
                     {errors.accommodation && <p className="form__error">{errors.accommodation}</p>}
                  </div>



                  <div className="form__field">
                     <label className="form__label" htmlFor='amount'>Cantidad:</label>
                     <input className="form__input" id='amount' name='amount' type='number' min={0} value={formData.amount} onChange={handleChange} />
                     {errors.amount && <p className="form__error">{errors.amount}</p>}
                  </div>


               <div className="form__group-butons">
                  <button className="form__submit form__submit--default" type='button' onClick={handleCancel}>Cancelar</button>
                  <button className="form__submit form__submit--primary" type='submit'>Guardar</button>
               </div>
            </form>
         </main>
      </Layout>
   );
}

export default RoomForm;
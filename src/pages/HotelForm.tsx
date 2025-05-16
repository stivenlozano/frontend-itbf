import React from 'react';
import { useParams } from 'react-router-dom';
import { useHotelForm } from '../hooks/useHotelForm';
import { CITIES } from '../utils/constants';

import Layout from '../layouts';
import { useHotels } from '../hooks/useHotels';

const HotelForm: React.FC = () => {
   const { id } = useParams();
   const { hotel } = useHotels(Number(id));
   const { formData, errors, handleChange, handleSubmit, handleCancel } = useHotelForm(Number(id), hotel);

   return (
      <Layout>
         <main className="form">
            <h1 className="form__title">Formulario de {!id ? 'registro' : 'actualización'}</h1>

            <form className="form__form" onSubmit={handleSubmit}>
                  <div className="form__field">
                     <label className="form__label" htmlFor='nombre'>Nombre:</label>
                     <input className="form__input" id='nombre' name='nombre' type='text' disabled={!!id && !formData.nombre} value={formData.nombre} onChange={handleChange} />
                     {errors.nombre && <p className="form__error">{errors.nombre}</p>}
                  </div>

                  <div className="form__field">
                     <label className="form__label" htmlFor='direccion'>Dirección:</label>
                     <input className="form__input" id='direccion' name='direccion' type='text' disabled={!!id && !formData.direccion} value={formData.direccion} onChange={handleChange} />
                     {errors.direccion && <p className="form__error">{errors.direccion}</p>}
                  </div>

                  <div className="form__field">
                     <label className="form__label" htmlFor='ciudad'>Ciudad:</label>
                     <select className="form__select" id='ciudad' name='ciudad' disabled={!!id && !formData.ciudad} value={formData.ciudad} onChange={handleChange}>
                        <option value="">Seleccione una opción</option>
                        {CITIES.map((ciudad) => (
                           <option key={ciudad} value={ciudad.toLowerCase()}>{ciudad}</option>
                        ))}
                     </select>
                     {errors.ciudad && <p className="form__error">{errors.ciudad}</p>}
                  </div>

                  <div className="form__field">
                     <label className="form__label" htmlFor='nit'>NIT:</label>
                     <input className="form__input" id='nit' name='nit' type='number' min={1} disabled={!!id && !formData.nit} value={formData.nit} onChange={handleChange} />
                     {errors.nit && <p className="form__error">{errors.nit}</p>}
                  </div>

                  <div className="form__field">
                     <label className="form__label" htmlFor='max_habitaciones'>Cantidad de habitaciones:</label>
                     <input className="form__input" id='max_habitaciones' name='max_habitaciones' type='number' min={1} disabled={!!id && !formData.max_habitaciones} value={formData.max_habitaciones} onChange={handleChange} />
                     {errors.max_habitaciones && <p className="form__error">{errors.max_habitaciones}</p>}
                  </div>

               <div className="form__group-butons">
                  <button className="form__submit form__submit--default" type='button' onClick={handleCancel}>Cancelar</button>
                  <button className="form__submit" type="submit">{!id ? 'Guardar' : 'Actualizar'}</button>
               </div>
            </form>
         </main>
      </Layout>
   );
};

export default HotelForm;
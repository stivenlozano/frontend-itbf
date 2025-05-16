import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import Layout from '../layouts';
const DynamicTable = React.lazy(() => import('../components/DynamicTable'));
import Loader from '../components/Loader';

import { COLUMNS_ROOMS } from '../utils/tableConfigurations';
import { useHotels } from '../hooks/useHotels';
import { useRooms } from '../hooks/useRooms';

const Rooms: React.FC = () => {
   const { id } = useParams();
   const { hotel } = useHotels(Number(id));
   const { rooms, handleRemove, handlefiltered } = useRooms(Number(id));

   return (
      <Layout>
         <main className="table">
            <h1 className="table__title">Lista de habitaciones - {hotel.nombre}</h1>

            <section className="table__actions">
               <div className='table__search'>
                  <input className='table__search-input' type="search" onChange={handlefiltered}/>
                  <FontAwesomeIcon className='table__search-icon' icon={faMagnifyingGlass} />
               </div>

               <Link to={`/hotels/${id}/rooms/new`} className="table__button">
                  <FontAwesomeIcon className='table__button-icon' icon={faPlus} /> Nuevo
               </Link>
            </section>

            <React.Suspense fallback={<Loader />}>
               <DynamicTable
                  data={rooms}
                  columns={COLUMNS_ROOMS}
                  actions={(item) => (
                     <>
                        <Link to={`/hotels/${id}/rooms/${item.id}/update`} className="table__link table__link--danger">
                           <FontAwesomeIcon className='table__search-icon' icon={faPencil} title='Editar' />
                        </Link>
                        <button onClick={() => handleRemove(Number(item.id))} className="table__link table__link--danger">
                           <FontAwesomeIcon className='table__search-icon' icon={faTrash} title='Eliminar' />
                        </button>
                     </>
                  )}
               />
            </React.Suspense>
         </main>
      </Layout>
   )
}

export default Rooms;
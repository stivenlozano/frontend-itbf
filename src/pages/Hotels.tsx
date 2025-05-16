import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import Layout from '../layouts';
const DynamicTable = React.lazy(() => import('../components/DynamicTable'));
import Loader from '../components/Loader';

import { COLUMNS_HOTELS } from '../utils/tableConfigurations';
import { useHotels } from '../hooks/useHotels';

const Hotels: React.FC = () => {
   const { hotels, handleRemove, handlefiltered } = useHotels();

   return (
      <Layout>
         <main className="table">
            <h1 className="table__title">Lista de hoteles</h1>

            <section className="table__actions">
               <div className="table__search">
                  <input className="table__search-input" type="search" onChange={handlefiltered}/>
                  <FontAwesomeIcon className="table__search-icon" icon={faMagnifyingGlass} />
               </div>

               <Link to={'/hotels/new'} className="table__button">
                  <FontAwesomeIcon className='hotels__button-icon' icon={faPlus} /> Nuevo
               </Link>
            </section>


            <React.Suspense fallback={<Loader />}>
               <DynamicTable
                  data={hotels}
                  columns={COLUMNS_HOTELS}
                  actions={(item) => (
                     <>
                        <Link to={`/hotels/${item.id}/rooms`} className="table__link">
                           <FontAwesomeIcon className='table__search-icon' icon={faEye} title='Ver detalle' />
                        </Link>
                        <Link to={`/hotels/${item.id}/update`} className="table__link table__link--danger">
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

export default Hotels;
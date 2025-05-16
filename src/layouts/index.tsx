import { type ReactNode } from 'react';
import { Link} from 'react-router-dom';

interface LayoutProps {
   children: ReactNode;
 }

function Layout({ children = '' }: LayoutProps) {   
   return (
      <>
         <header className="header">
            <nav className="header__nav">
               <ul className="header__menu">
                  <li className="header__menu-item">
                     <Link to={'/'}>
                        <img
                           src="https://www.cooperativagyf.com.co/wp-content/uploads/2019/01/decameron.png"
                           alt="Logo Decameron"
                           className="header__logo" />
                     </Link>
                  </li>

                  <li className="header__menu-item">
                     <Link className='header__menu-link' to={'/'}>Hoteles</Link>
                  </li>
               </ul>
            </nav>
         </header>
         
         <div className='wrapper'>
            {children}
         </div>
      </>
   );

}

export default Layout;
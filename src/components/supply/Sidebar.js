import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar (){
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/seller/dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <i class="fab fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/seller/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/seller/product/new"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    

                   

                </ul>
            </nav>
        </div>
    )
}

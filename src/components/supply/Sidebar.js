import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar (){
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/supply/dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/supply/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/supply/transactions"><i className="fa fa-star"></i>Transactions</Link>
                    </li>

                   

                </ul>
            </nav>
        </div>
    )
}

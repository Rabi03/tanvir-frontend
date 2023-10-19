import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstants'
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/ProductActions'

/**
 * A React component that renders a list of all products.
 *
 * @returns {React.Component} A React component that renders a list of all products.
 */
export default function Products({ history }) {

    const alert = useAlert();
    const dispatch = useDispatch();
    /**
       * The useSelector hook to select state from the Redux store.
       *
    *   loading: boolean,
    *   error: ?string,
    *   products: [
    *     {
    *       _id: string,
    *       name: string,
    *       price: number,
    *       stock: number
    *     }
    *   ]
    * )
    */
    const { loading, error, products } = useSelector(state => state.products);
    const { isDeleted, error: deleteError } = useSelector(state => state.productDelorUp)
    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, history, deleteError, isDeleted])

    /**
 * A React component that displays product reviews.
 *
 * @returns {Object} An object containing the columns and rows data for the MDBDataTable component.
 */
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <>
                    <Link to={`/admin/products/${product._id}`}>
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <i className="fa fa-trash" style={{ marginLeft: 20, color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteProduct(product._id)}></i>
                </>
            })
        })

        return data;
    }

    /**
     * A function that handles the deletion of a product.
     *
     * @param {string} id The ID of the product to delete.
     */
    const handleDeleteProduct = id => {
        dispatch(deleteProduct(id))
    }


    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </>
                </div>
            </div>

        </>
    )
}

import React, { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/ProductActions'
import { DELETE_REVIEW_RESET } from '../../constants/ProductConstants'

/**
 * A React component that renders a list of product reviews.
 *
 * @returns {React.Component} A React component that renders a list of product reviews.
 */
export default function ProductReviews() {
    /**
       * The state of the component.
       *
       * @typedef {{
    *   productId: string
    * }} ProductReviewsState
    */
    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.productReviews);
    /**
   * The isDeleted flag indicates whether a review has been deleted.
   *
   * @type {boolean}
   */
    /**
     * The deleteError flag indicates whether there was an error deleting a review.
     *
     * @type {?string}
     */
    const { isDeleted, error: deleteError } = useSelector(state => state.reviewDelete)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: DELETE_REVIEW_RESET })
        }



    }, [dispatch, alert, error, productId, isDeleted, deleteError])
    /**
      * A function that handles the deletion of a review.
      *
      * @param {string} id The ID of the review to delete.
      */
    const handleReviewDelete = (id) => {
        dispatch(deleteReview(id, productId))
    }
    /**
      * A function that handles the submission of the form to fetch the product reviews.
      *
      * @param {Event} e The event object.
      */
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    /**
 * A React component that displays product reviews.
 *
 * @returns {Object} An object containing the columns and rows data for the MDBDataTable component.
 */
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <i className="fa fa-trash" onClick={() => handleReviewDelete(review._id)}></i>
            })
        })

        return data;
    }

    return (
        <>
            <MetaData title={'Product Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
                                    </button>
                                </form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}


                    </>
                </div>
            </div>

        </>
    )
}

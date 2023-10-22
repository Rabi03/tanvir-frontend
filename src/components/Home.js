/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'
import { getProducts, sortProduct } from '../actions/ProductActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Category } from '@mui/icons-material';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

export default function Home({ match, history }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 25000])
    const [priceChange, setPriceChange] = useState(false);
    const alert = useAlert()
    const dispatch = useDispatch()
    // const [keyword, setKeyWord] = useState(null)

    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)
    /**
     * A list of all product categories.
     *
     * @type {array<string>}
     */
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes_Shoes',
        'Beauty_Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const headCategory = [
        "Health & Beauty",
        "Watches, Bags, Jewellery",
        "Men's & Boys' Fashion",
        "Mother & Baby",
        "Electronics Devices",
        "TV & Home Appliances",
        "Electronic Accessories",
        "Groceries",
        "Sports & Outdoors",
        "Automotive & Motorbike"
    ];

    const keyword = match.params.keyword

    useEffect(() => {
        if (match.params.category)
            setCategory(match.params.category)
        dispatch(getProducts(keyword, currentPage, price, match.params.category, rating))
    }, [match.params])

    // useEffect(() => {
    //     if (match.params.keyword) {
    //         let query = match.params.keyword;
    //         if (query.includes('cat~')) {

    //             setCategory(query.split("cat~")[1])

    //         }
    //         else setKeyWord(query)
    //     }
    // }, [match.params])

    const { loading, products, error, resPerPage, productCount, filteredProductsCount } = useSelector(state => state.products)

    /**
     * Gets a list of products.
     *
     * @param {string} keyword The keyword to search for.
     * @param {number} currentPage The current page number.
     * @param {array<number>} price The price range.
     * @param {string} category The category to filter by.
     * @param {number} rating The rating to filter by.
     * @returns {object} An object containing the products and pagination information.
     */
    useEffect(() => {

        if (error) {
            return alert.error(error.message)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating))

    }, [dispatch, alert, error, keyword, currentPage, category, rating])


    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    let count = productCount
    if (keyword) {
        count = filteredProductsCount
    }

    const handlePriceChange = (e) => {
        e.preventDefault()
        if (price) {
            dispatch(getProducts(keyword, currentPage, price, category, rating))
        }

    }

    console.log(products)

    const sortByHight_Low=(val)=>{
        
        dispatch(sortProduct(val,products))

    }

    return (
        <>
            {loading ? <>
                <Loader />
            </> :
                <>
                    <MetaData title={keyword ? keyword : "Buy Best Product Online"} />
                    {(!keyword && !category) &&
                        <>
                            <div className='row' style={{ marginTop: '20px' }}>

                                {/* <List className='col-3' style={{ fontSize: '10px', border: '1px solid gray', borderRadius: '10px' }}>
                                    {headCategory.map((cat, id) =>
                                        <ListItem key={id} style={{ padding: '0px' }}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={cat} />
                                            </ListItemButton>
                                        </ListItem>
                                    )}

                                </List> */}
                                <div id="carouselExampleIndicators" className="col-12 carousel slide" data-ride="carousel" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                    <ol className="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                    </ol>
                                    <div className="carousel-inner" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                        <div className="carousel-item active">
                                            <img className="d-block w-100" style={{ objectFit: 'cover' }} height={500} src="https://i.ibb.co/VSsN4Jt/carousel-2.png" alt="First slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" style={{ objectFit: 'cover' }} height={500} src="https://i.ibb.co/tMB5CZW/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-3-1.png" alt="Second slide" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100" style={{ objectFit: 'cover' }} height={500} src="https://i.ibb.co/phw8yGZ/sven-brandsma-Qz6-Zx4-Rjd-D8-unsplash-1.png" alt="Third slide" />
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{ backgroundColor: 'black', height: '50px', width: '50px', margin: 'auto 0px', marginLeft: '20px', borderRadius: '100%' }}>
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{ backgroundColor: 'black', height: '50px', width: '50px', margin: 'auto 0px', marginRight: '20px', borderRadius: '100%' }}>
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                            <h1 id="products_heading">Categories</h1>
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Electronics")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/dd1ce7eea60fd1eade8f9daf3a4aa674.jpg" class="card-img-top" alt="Electronics" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Electronics</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Cameras")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/57a3723d055a73f586609b5eb73357bb.jpg" class="card-img-top" alt="Cameras" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Cameras</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Laptops")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/434d4cc0977d07719c274c515f45fc58.jpg" class="card-img-top" alt="Laptops" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Laptops</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Accessories")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/c38b438c460a2a1c391e73ca6af95006.jpg" class="card-img-top" alt="Accessories" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Accessories</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Headphones")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/e5d71e4d4c3d5214aadcd24c5a796c12.jpg" class="card-img-top" alt="Accessories" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Headphones</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Food")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/6fe700086e28e39796b316e5631e75ac.jpg" class="card-img-top" alt="Accessories" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Food</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Books")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/b658f30dcb72bbc4211df367b3bb777a.jpg" class="card-img-top" alt="Accessories" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Books</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Clothes_Shoes")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/9eb3a585dad8898d575d9587c652ac42.jpg" class="card-img-top" alt="Accessories" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Clothes_Shoes</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Beauty_Health")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/ba3a0628aeaacc262c52113187ef2b76.jpg" class="card-img-top" alt="Accessories" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Beauty_Health</h5>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Sports")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/043f5b53dd7f56ccd62c7bd742f9d592.jpg" class="card-img-top" alt="Sports" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Sports</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Outdoor")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/b3c33a984f6dd093b4ef60956815009c.jpg" class="card-img-top" alt="Outdoor" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Outdoor</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style={{ padding: 0, cursor: 'pointer' }} onClick={() => history.push("/category/Home")}>
                                        <div class="card" style={{ textAlign: 'center' }}>
                                            <img src="https://static-01.daraz.com.bd/p/546356db127bd4e29985f218b6825cbf.jpg" class="card-img-top" alt="Home" style={{ margin: '0px auto' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Home</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </>
                    }
                    <h1 id="products_heading">{(keyword || category) ? "Available Products" : "Latest Products"}</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">


                            {(keyword || category) ? <>

                                <div className="col-6 col-md-3 mt-0 mb-5">
                                    <div className="px-5">
                                        <h5>Sort By</h5>
                                        <select onChange={e=>sortByHight_Low(e.target.value)} style={{marginBottom:'20px'}}>
                                            <option value="0">Price high to low</option>
                                            <option value="1">Price low to high</option>
                                        </select>
                                        <h5 className='mb-2'>Price</h5>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: '5px' }}>
                                            <input type='number' placeholder='Min' value={price[0]} style={{ width: '80px' }} onChange={e => {
                                                setPriceChange(true)
                                                setPrice(price => [e.target.value, price[1]])
                                            }}></input>
                                            -
                                            <input type='number' placeholder='Max' value={price[1]} style={{ width: '80px' }} onChange={e => {
                                                setPrice(price => [price[0], e.target.value])
                                                setPriceChange(true)
                                            }} />
                                        </div>
                                        <button className='btn btn-primary mt-4 ml-5' onClick={handlePriceChange}>Filter</button>

                                        <hr className="my-5" />

                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Categories
                                            </h4>

                                            <select className="pl-0" value={category} placeholder='Select category' onChange={e=>setCategory(e.target.value)}>
                                                {categories.map(category => (
                                                    <option
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={category}
                                                        value={category}
                                                        
                                                    >
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <hr className="my-3" />

                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Ratings
                                            </h4>

                                            <ul className="pl-0">
                                                {[5, 4, 3, 2, 1, 0].map(star => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={star}
                                                        onClick={() => setRating(star)}
                                                    >
                                                        <div className="rating-outer">
                                                            <div className="rating-inner"
                                                                style={{
                                                                    width: `${star * 20}%`
                                                                }}
                                                            >
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-6 col-md-9">
                                    <div className='row my-2'>
                                        {products?.length == 0 && <div>No product found. Try with different keyword or price range or category.</div>}

                                    </div>
                                    {products?.length > 0 &&
                                        <div className='row'>
                                            <div style={{ display: 'flex', flexDirection: 'row', fontSize: "10px" }}>
                                                {category && <h6 style={{ fontSize: '10px', padding: '5px 10px', backgroundColor: "rgba(0,0,0,0.2)", marginRight: '5px', borderRadius: '10px' }}>Category: {category}</h6>}
                                                {price && <h6 style={{ fontSize: '10px', padding: '5px 10px', backgroundColor: "rgba(0,0,0,0.2)", marginRight: '5px', borderRadius: '10px' }}>Price: {price[0]}-{price[1]} {priceChange && <span style={{ marginLeft: '10px', padding: "1px 5px", borderRadius: '100%', backgroundColor: 'black', color: 'white', cursor: 'pointer' }} onClick={() => {
                                                    setPrice([1, 25000])
                                                    setPriceChange(false)
                                                }}>x</span>}</h6>}
                                                {rating > 0 && <h6 style={{ fontSize: '10px', padding: '5px 10px', backgroundColor: "rgba(0,0,0,0.2)", marginRight: '5px', borderRadius: '10px' }}>Rating: {rating} <span style={{ marginLeft: '10px', padding: "1px 5px", borderRadius: '100%', backgroundColor: 'black', color: 'white', cursor: 'pointer' }} onClick={() => setRating(0)}>x</span></h6>}

                                            </div>

                                        </div>
                                    }

                                    <div className="row">
                                        {products?.length > 0 && products.map(product => (
                                            <Product key={product._id} product={product} col={4} />
                                        ))}
                                    </div>
                                </div>
                            </>

                                :
                                products.length > 0 && products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))}

                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}


                </>
            }

        </>
    )
}

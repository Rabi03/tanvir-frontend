import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Search({ history }) {
    const [keyword, setKeyword] = useState('')

    const searchHandler = e => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <form onSubmit={searchHandler}>

            <div className="input-group">

                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    value={keyword}
                    style={{border:'none'}}
                    onChange={e => setKeyword(e.target.value)}
                />
                {keyword &&
                    <div className="input-group-append" style={{ backgroundColor: 'white', alignItems: 'center', padding: '0px 10px' }}>
                        <AiFillCloseCircle onClick={()=>{
                            setKeyword("")
                            history.push("/")
                        }} />
                    </div>
                }

                <div className="input-group-append">

                    <button data-testid="search_btn" id="search_btn" className="btn" onClick={searchHandler}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

        </form>
    )
}

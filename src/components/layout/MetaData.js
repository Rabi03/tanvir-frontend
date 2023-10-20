import React from 'react'

import {Helmet} from 'react-helmet'

export default function MetaData({title}) {
    return (
        <Helmet>
            <title>{title}-Online Shopping Mall</title>
        </Helmet>
    )
}

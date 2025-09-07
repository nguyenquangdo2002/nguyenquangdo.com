import { Button } from '@/components/ui/button'
import React, { Fragment, useState } from 'react'

function AdminProducts() {
    const [products, setProducts] = useState([])
    return (
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>


                <Button>Add New Product</Button>
            </div>
            <div>
                this is product page
            </div>
        </Fragment>
    )
}

export default AdminProducts

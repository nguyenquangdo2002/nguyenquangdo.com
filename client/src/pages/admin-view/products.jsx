import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,

    SheetHeader,
    SheetTitle

} from "@/components/ui/sheet"
import React, { Fragment, useState } from 'react'

function AdminProducts() {
    const [products, setProducts] = useState([])

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);

    return (
        <Fragment>
            <div className='mb-5 w-full flex justify-end'>


                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                <div>
                    this is product page
                </div>
                <div>
                    this is product page
                </div>
                <div>
                    this is product page
                </div>
                <div>
                    this is product page
                </div>
                <div>
                    this is product page
                </div>
                <div>
                    this is product page
                </div>
                <div>
                    this is product page
                </div>

            </div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => { setOpenCreateProductsDialog(false) }}>
                <SheetContent side="right" >
                    <SheetHeader>
                        <SheetTitle>Add New Products</SheetTitle>
                    </SheetHeader>

                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts

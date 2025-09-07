import React, { Fragment } from 'react'

import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
    Sheet,
    SheetContent,

    SheetHeader,
    SheetTitle

} from "@/components/ui/sheet"


/// khai bao cac icon 
const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icons: <LayoutDashboard />
    },
    {
        id: 'product',
        label: 'Products',
        path: '/admin/products',
        icons: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icons: <BadgeCheck />
    }

]

// ham hien menuItem (cai side bar)
function MenuItems({ setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className='mt-8 flex-col flex gap-2'>
            {
                adminSidebarMenuItems.map(menuItem => <div key={menuItem.id} onClick={() => {

                    navigate(menuItem.path)
                    setOpen ? setOpen(false) : null
                }}
                    className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-gray-200 hover:text-foreground "

                >
                    {menuItem.icons}
                    <span>
                        {menuItem.label}
                    </span>
                </div>)
            }
        </nav>
    )
}

function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate();
    return (
        // khi an toggle no se hien ra het tat ca sheet nay 
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64 lg:block">
                    <SheetHeader className="border-b">
                        <SheetTitle className="flex gap-2 mt-5 mb-5">
                            <ChartNoAxesCombined />
                            Admin Panel</SheetTitle>
                    </SheetHeader>
                    <MenuItems setOpen={setOpen} />
                </SheetContent>


            </Sheet>


            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div className='flex cursor-pointer items-center gap-2' onClick={() => navigate("/admin/dashboard")}>
                    <ChartNoAxesCombined size={30} />
                    <h1 className='text-xl font-extrabold' >Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment >
    )
}

export default AdminSidebar;

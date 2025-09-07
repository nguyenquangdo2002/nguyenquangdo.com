
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/store/auth-slice'
import { registerFormControls } from '@/config/index.js'
import { useToast } from '@/hooks/use-toast'
import { useDispatch } from 'react-redux'
import CommonForm from '@/components/common/form'

import { useTranslation } from 'react-i18next'
const initialState = {
    username: '',
    email: '',
    password: ''
}

function AuthRegister() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
                navigate("/auth/login");
                console.log(data)
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive"
                })
            }
        })
    }
    console.log(formData)

    return (
        <div className='mx-auto w-full max-w-md space-x-6'>
            <div className="text-center">
                <h1 className='text-3xl font-bold tracking-tight text-foreground'></h1>
                <p>Already have an account ?</p>
                <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
                    {t("Login")}
                </Link>
            </div>
            <CommonForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={'sign up x'}
                formControls={registerFormControls}
            />
        </div>
    )
}

export default AuthRegister

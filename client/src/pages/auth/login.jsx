import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginGoogle from './loginGoogle';
function AuthLogin() {

    const initialState = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    function onSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(formData)).then(data => {
            console.log(data);
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive"
                })
            }

        })
    }
    return (
        <div className='mx-auto w-full max-w-md space-x-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tighter text-foreground'>
                    Create new account
                </h1>
                <p>Doesn't have an account</p>
                <Link className="font-medium ml-2 text-primary hove:underline" to="/auth/register" >
                    Register</Link>
                <LoginGoogle />
            </div>
            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={"sign in"}

            />
        </div>
    )
}

export default AuthLogin

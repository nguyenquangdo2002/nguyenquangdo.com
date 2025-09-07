import React from 'react'

function LoginGoogle() {
    return (
        <div>
            <button className='btn-google'
                onClick={() => window.location.href = ("http://localhost:5000/api/auth/google")}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default LoginGoogle

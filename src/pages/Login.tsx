import Input from "components/ui/Input";
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginData, loginSchema } from "schemas/loginSchema";
import { useLoginMutation } from "hooks/auth";
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const authStatus = Cookies.get('auth_status') ?? '';

    useEffect(() => {
        if (authStatus === 'authenticated') {
            navigate("/");
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const { mutate: login, isPending: isLoginLoading } = useLoginMutation({
        onSuccess: (res) => {
            const role = res?.data?.details?.role

            toast.success("Successfully logged in.");

            Cookies.set('auth_status', 'authenticated');
            Cookies.set('token', res.data?.access_token?.token);
            Cookies.set('firstname', res?.data?.details?.firstname);
            Cookies.set('lastname', res?.data?.details?.lastname);
            Cookies.set('role', role);

            navigate('/')
        },
        onError: () => { }
    });

    const onSubmit = (data: LoginData) => {
        login(data);
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12 bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 bg-opacity-80">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <img src="/images/app-logo.jpeg" alt="TindaTrack Logo" className="w-12 h-12" />
                <h2 className="text-3xl font-bold text-primary">TindaTrack</h2>
            </div>

            <p className="text-center text-gray-600 mb-6 text-lg">
            Welcome! Please log in to get started.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="User ID"
                    type="text"
                    placeholder="Enter user ID"
                    error={errors.user_id ? errors.user_id.message : ""}
                    {...register("user_id")}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    error={errors.password ? errors.password.message : ""}
                    {...register("password")}
                />

                <div className="mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary w-full py-3 rounded-md text-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        disabled={isLoginLoading}
                    >
                    { isLoginLoading ? 'Loading..' : 'Login'}
                    </button>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-sm">
                    <Link to="/forgot-password" className="text-primary hover:underline text-center sm:text-left">
                        Forgot Password?
                    </Link>
                    <Link to="/register" className="text-primary hover:underline text-center sm:text-right">
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;

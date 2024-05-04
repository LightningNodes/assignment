"use client";
import auth from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        setLoading(true);
        await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password.trim())
            .then(authUser => {
                console.log("Success. User is logged in: ", authUser)
                router.replace("/");
            })
            .catch(error => {
                setError(error.message)
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-50">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <span className="mr-2 text-gray-500">Don't have an account?</span>
                    <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </div>
                {error !== "" ? (
                    <div className="flex items-center justify-center mt-4">
                        <span className="text-red-500">{error}</span>
                    </div>
                ) : null}
            </form>
        </div>
    );
};

export default Login;

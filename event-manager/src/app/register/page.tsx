// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // clear previous errors

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            //redirect authenticated/registered users appropriately
            router.push("/login");
        } else {
            const data = await res.json();
            setError(data.error || "Registration failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-24">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-black">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input 
                            type="text"
                            required
                            className="w-full border rounded p-2 text-black"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input 
                            type="email"
                            required
                            className="w-full border rounded p-2 text-black"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                        
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}
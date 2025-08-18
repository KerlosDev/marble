'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// Form validation schema
const loginSchema = z.object({
    password: z.string().min(1, 'Password is required'),
});

export default function AdminGate() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid password');
            }

            toast.success('Login successful!');
            router.push('/admin');
        } catch (error) {
            setError('password', {
                type: 'manual',
                message: error.message || 'Authentication failed'
            });
            toast.error(error.message || 'Authentication failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold mb-2">Admin Access</h1>
                    <p className="text-gray-600">Enter the admin password to continue</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter admin password"
                        error={errors.password}
                        {...register('password')}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Authenticating...' : 'Access Admin Area'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/" className="text-sm text-primary hover:underline">
                        Return to Homepage
                    </a>
                </div>
            </div>
        </div>
    );
}

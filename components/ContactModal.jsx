'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import GlobalApi from '../app/api/GlobalApi';

// Form validation schema
const inquirySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string()
        .min(1, 'Phone is required')
        .regex(/^\d+$/, 'Phone must contain only numbers'),
    email: z.string().email('Invalid email address').optional().or(z.string().length(0)),
    company: z.string().optional(),
    quantityM2: z.number().positive().optional(),
    message: z.string().min(1, 'Message is required'),
});

export default function ContactModal({
    productId = null,
    productName = null,
    triggerClassName,
    triggerText = 'Contact Us'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(inquirySchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            company: '',
            quantityM2: undefined,
            message: productName ? `I'm interested in ${productName}.` : '',
        }
    });

    // Submit handler
    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const quantity = data.quantityM2 ? Number(data.quantityM2) : 0;
            // Remove any non-numeric characters from phone
            const cleanPhone = data.phone.replace(/\D/g, '');

            await GlobalApi.createContact(
                data.name,
                data.email,
                cleanPhone,
                data.message,
                data.company,
                quantity
            );

            toast.success('Your inquiry has been submitted!');
            reset();
            setIsOpen(false);
        } catch (error) {
            toast.error('Failed to submit inquiry');
            console.error('Inquiry submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Modal Trigger */}
            <button
                className={triggerClassName}
                onClick={() => setIsOpen(true)}
            >
                {triggerText}
            </button>

            {/* Modal Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    {/* Modal Content */}
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg fade-in">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-serif font-bold">
                                    {productName ? `Inquiry about ${productName}` : 'Contact Us'}
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1"
                                    aria-label="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Name *"
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        error={errors.name}
                                        {...register('name')}
                                    />

                                    <Input
                                        label="Phone *"
                                        id="phone"
                                        type="tel"
                                        placeholder="Your phone number"
                                        error={errors.phone}
                                        {...register('phone')}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Email"
                                        id="email"
                                        type="email"
                                        placeholder="Your email"
                                        error={errors.email}
                                        {...register('email')}
                                    />

                                    <Input
                                        label="Company"
                                        id="company"
                                        type="text"
                                        placeholder="Your company"
                                        error={errors.company}
                                        {...register('company')}
                                    />
                                </div>

                                <Input
                                    label="Quantity (m²)"
                                    id="quantityM2"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Estimated quantity needed"
                                    error={errors.quantityM2}
                                    {...register('quantityM2', {
                                        valueAsNumber: true,
                                    })}
                                />

                                <Textarea
                                    label="Message *"
                                    id="message"
                                    placeholder="Please describe your project and requirements"
                                    rows={4}
                                    error={errors.message}
                                    {...register('message')}
                                />
                            </div>

                            <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline mr-3"
                                        onClick={() => setIsOpen(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </div>
                                        ) : 'Submit Inquiry'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

// Form validation schema
const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email address').optional().or(z.string().length(0)),
    company: z.string().optional(),
    quantityM2: z.number().positive().optional(),
    message: z.string().min(1, 'Message is required'),
});

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(contactSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            toast.success('Your message has been sent!');
            reset();
        } catch (error) {
            toast.error(error.message || 'Failed to send message');
            console.error('Contact form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="container-custom py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Contact Us
                        </h1>
                        <div className="w-16 h-1 bg-primary mb-6"></div>

                        <div className="prose prose-lg mb-8">
                            <p>
                                We'd love to hear from you. Fill out the form or reach out directly using the contact information below.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Address */}
                            <div className="flex">
                                <div className="mr-4 mt-1">
                                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Our Location</h3>
                                    <address className="not-italic text-gray-600">
                                        <p>123 Stone Avenue</p>
                                        <p>Suite 500</p>
                                        <p>New York, NY 10001</p>
                                        <p>United States</p>
                                    </address>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex">
                                <div className="mr-4 mt-1">
                                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                                    <p className="text-gray-600">
                                        <a href="tel:+12125551234" className="hover:text-primary transition-colors">+1 (212) 555-1234</a>
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex">
                                <div className="mr-4 mt-1">
                                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                                    <p className="text-gray-600">
                                        <a href="mailto:info@granet.com" className="hover:text-primary transition-colors">info@granet.com</a>
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex">
                                <div className="mr-4 mt-1">
                                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                                    <div className="text-gray-600">
                                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-gray-100">
                        <h2 className="text-2xl font-serif font-semibold mb-6">Send Us a Message</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                placeholder="How can we help you?"
                                rows={6}
                                error={errors.message}
                                {...register('message')}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending Message...
                                    </div>
                                ) : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full h-96 bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343056!2d-74.0059425!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3b8b6ef%3A0xb89d1fe6bc499443!2sDowntown%20Manhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1654523111957!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </>
    );
}

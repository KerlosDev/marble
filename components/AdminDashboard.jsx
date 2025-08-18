'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import GlobalApi from '@/app/api/GlobalApi'; // Import GlobalApi

// Form validation schema for adding product
const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens instead of spaces'),
    materialType: z.enum(['MARBLE', 'GRANITE'], { required_error: 'Material type is required' }),
    colorTone: z.enum(['LIGHT', 'MEDIUM', 'DARK'], { required_error: 'Color tone is required' }),
    finish: z.enum(['POLISHED', 'HONED', 'BRUSHED', 'LEATHERED'], { required_error: 'Finish is required' }),
    thicknessMm: z.number().min(1, 'Thickness must be greater than 0'),
    pricePerM2: z.number().min(0.01, 'Price must be greater than 0'),
    images: z.array(z.string().url('Must be valid URLs')).min(1, 'At least one image URL is required'),
    description: z.string().min(10, 'Description is required (min 10 characters)'),
    origin: z.string().optional(),
    density: z.string().optional(),
    waterAbsorption: z.string().optional(),
    compressiveStrength: z.string().optional(),
});

// Tab options
const TABS = {
    INQUIRIES: 'inquiries',
    ADD_PRODUCT: 'add-product',
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState(TABS.INQUIRIES);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [dashboard, setDashboard] = useState({
        totalInquiries: 0,
        newInquiries: 0,
        inProgressInquiries: 0,
        completedInquiries: 0,
    });
    const router = useRouter();

    // Form for adding product
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            images: [''],
            materialType: '',
            colorTone: '',
            finish: '',
        }
    });

    // Handle slug auto-generation
    const name = watch('name');

    useEffect(() => {
        if (name) {
            const slug = name
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');

            setValue('slug', slug);
        }
    }, [name, setValue]);

    // Image URLs array state
    const [imageUrls, setImageUrls] = useState(['']);

    const handleAddImageField = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleRemoveImageField = (index) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls);
        setValue('images', newUrls.filter(url => url));
    };

    const handleImageChange = (index, value) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
        setValue('images', newUrls.filter(url => url));
    };

    // Fetch inquiries
    const fetchInquiries = async () => {
        setLoading(true);
        try {
            console.log('Fetching contacts from GlobalApi.allContacts()...');
            const response = await GlobalApi.allContacts();
            console.log('API Response:', response);

            // Handle different response structures
            let contacts;
            if (response && response.data && response.data.contacts) {
                // Original expected structure
                contacts = response.data.contacts;
            } else if (response && response.contacts) {
                // Alternative structure
                contacts = response.contacts;
            } else if (Array.isArray(response)) {
                // Direct array response
                contacts = response;
            } else {
                console.error('Unrecognized response structure:', response);
                throw new Error('Invalid API response format');
            }

            console.log('Contacts extracted from response:', contacts);

            // Filter out empty or incomplete contacts more strictly
            const validContacts = contacts.filter(contact =>
                contact.name &&
                contact.name.trim() !== '' &&
                contact.phonenumber &&
                contact.phonenumber !== 10 && // Filter out placeholder phone numbers
                contact.message &&
                contact.message.trim() !== ''
            );
            console.log('Valid contacts after filtering:', validContacts);

            // Map contacts data to match our existing structure
            const formattedInquiries = validContacts.map((contact, index) => ({
                id: index.toString(),
                name: contact.name,
                phone: contact.phonenumber?.toString(),
                email: contact.email || '',
                company: contact.company || '',
                message: contact.message,
                quantityM2: contact.quantity || null,
                status: 'NEW',
                createdAt: new Date().toISOString(),
                productNameSnapshot: contact.message.includes('interested in') ?
                    contact.message.split('interested in')[1].trim() : null
            }));

            console.log('Formatted inquiries:', formattedInquiries);
            setInquiries(formattedInquiries);
            setDashboard({
                totalInquiries: formattedInquiries.length,
                newInquiries: formattedInquiries.length,
                inProgressInquiries: 0,
                completedInquiries: 0,
            });
        } catch (error) {
            console.error('Error details:', error);
            toast.error(`Failed to load inquiries: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Fetch inquiries on load
    useEffect(() => {
        if (activeTab === TABS.INQUIRIES) {
            fetchInquiries();
        }
    }, [activeTab]);

    // Handle inquiry status update
    const handleStatusUpdate = async (inquiryId, newStatus) => {
        setIsUpdatingStatus(true);

        try {
            // Since we're not actually updating the backend with GlobalApi yet,
            // we'll just update the local state

            // Update local state
            setInquiries(inquiries.map(inquiry => {
                if (inquiry.id === inquiryId) {
                    return { ...inquiry, status: newStatus };
                }
                return inquiry;
            }));

            if (selectedInquiry && selectedInquiry.id === inquiryId) {
                setSelectedInquiry({ ...selectedInquiry, status: newStatus });
            }

            // Update dashboard counts
            setDashboard(prev => {
                const updated = { ...prev };

                // Decrement previous status count
                if (selectedInquiry) {
                    if (selectedInquiry.status === 'NEW') updated.newInquiries--;
                    if (selectedInquiry.status === 'IN_PROGRESS') updated.inProgressInquiries--;
                    if (selectedInquiry.status === 'DONE') updated.completedInquiries--;
                }

                // Increment new status count
                if (newStatus === 'NEW') updated.newInquiries++;
                if (newStatus === 'IN_PROGRESS') updated.inProgressInquiries++;
                if (newStatus === 'DONE') updated.completedInquiries++;

                return updated;
            });

            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Status update error:', error);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    // Handle adding a new product
    const onProductSubmit = async (data) => {
        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }

            toast.success('Product added successfully');
            reset();
            setImageUrls(['']);
        } catch (error) {
            toast.error(error.message || 'Failed to add product');
            console.error('Add product error:', error);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            toast.success('Logged out successfully');
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(date);
    };

    // Format phone number
    const formatPhone = (phone) => {
        if (!phone) return 'N/A';
        return phone.toString().startsWith('0') ? phone : `0${phone}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="container-custom py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="font-serif text-2xl font-bold tracking-tight mr-6">
                            <span>GRANET</span>
                            <span className="text-primary">.</span>
                        </div>
                        <span className="text-gray-500">Admin Dashboard</span>
                    </div>
                    <div className="flex items-center">
                        <Link href="/" className="text-sm mr-6">
                            View Website
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container-custom py-8">
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Inquiries</p>
                                <h3 className="text-3xl font-bold">{dashboard.totalInquiries}</h3>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">New Inquiries</p>
                                <h3 className="text-3xl font-bold">{dashboard.newInquiries}</h3>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">In Progress</p>
                                <h3 className="text-3xl font-bold">{dashboard.inProgressInquiries}</h3>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Completed</p>
                                <h3 className="text-3xl font-bold">{dashboard.completedInquiries}</h3>
                            </div>
                            <div className="bg-green-50 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-soft border border-gray-100 mb-8">
                    <div className="border-b">
                        <div className="flex">
                            <button
                                className={`py-4 px-6 font-medium text-sm ${activeTab === TABS.INQUIRIES ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                                onClick={() => setActiveTab(TABS.INQUIRIES)}
                            >
                                Inquiries
                            </button>
                            <button
                                className={`py-4 px-6 font-medium text-sm ${activeTab === TABS.ADD_PRODUCT ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                                onClick={() => setActiveTab(TABS.ADD_PRODUCT)}
                            >
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Inquiries Tab */}
                        {activeTab === TABS.INQUIRIES && (
                            <div>
                                {loading ? (
                                    <div className="text-center py-12">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent"></div>
                                        <p className="mt-2 text-gray-500">Loading inquiries...</p>
                                    </div>
                                ) : inquiries.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {inquiries.map((inquiry) => (
                                                    <tr
                                                        key={inquiry.id}
                                                        className="hover:bg-gray-50 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedInquiry(inquiry);
                                                            setIsDrawerOpen(true);
                                                        }}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            {inquiry.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {formatPhone(inquiry.phone)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            {inquiry.quantityM2 ? `${inquiry.quantityM2} m²` : 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${inquiry.status === 'NEW'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : inquiry.status === 'IN_PROGRESS'
                                                                        ? 'bg-blue-100 text-blue-700'
                                                                        : 'bg-green-100 text-green-700'
                                                                    }`}
                                                            >
                                                                {inquiry.status.replace('_', ' ')}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <button
                                                                className="text-primary hover:text-primary-dark"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedInquiry(inquiry);
                                                                    setIsDrawerOpen(true);
                                                                }}
                                                            >
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        <p className="text-gray-500">No inquiries found</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Add Product Tab */}
                        {activeTab === TABS.ADD_PRODUCT && (
                            <form onSubmit={handleSubmit(onProductSubmit)} className="space-y-6">
                                <h2 className="text-xl font-serif font-semibold mb-4">Add New Product</h2>

                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Product Name *"
                                        id="name"
                                        type="text"
                                        placeholder="e.g. Carrara White Marble"
                                        error={errors.name}
                                        {...register('name')}
                                    />

                                    <Input
                                        label="Slug *"
                                        id="slug"
                                        type="text"
                                        placeholder="e.g. carrara-white-marble"
                                        error={errors.slug}
                                        {...register('slug')}
                                    />
                                </div>

                                {/* Material Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Select
                                        label="Material Type *"
                                        id="materialType"
                                        placeholder="Select material type"
                                        error={errors.materialType}
                                        {...register('materialType')}
                                        options={[
                                            { value: 'MARBLE', label: 'Marble' },
                                            { value: 'GRANITE', label: 'Granite' },
                                        ]}
                                    />

                                    <Select
                                        label="Color Tone *"
                                        id="colorTone"
                                        placeholder="Select color tone"
                                        error={errors.colorTone}
                                        {...register('colorTone')}
                                        options={[
                                            { value: 'LIGHT', label: 'Light' },
                                            { value: 'MEDIUM', label: 'Medium' },
                                            { value: 'DARK', label: 'Dark' },
                                        ]}
                                    />

                                    <Select
                                        label="Finish *"
                                        id="finish"
                                        placeholder="Select finish"
                                        error={errors.finish}
                                        {...register('finish')}
                                        options={[
                                            { value: 'POLISHED', label: 'Polished' },
                                            { value: 'HONED', label: 'Honed' },
                                            { value: 'BRUSHED', label: 'Brushed' },
                                            { value: 'LEATHERED', label: 'Leathered' },
                                        ]}
                                    />
                                </div>

                                {/* Dimensions & Price */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Thickness (mm) *"
                                        id="thicknessMm"
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        placeholder="e.g. 20"
                                        error={errors.thicknessMm}
                                        {...register('thicknessMm', { valueAsNumber: true })}
                                    />

                                    <Input
                                        label="Price per m² ($) *"
                                        id="pricePerM2"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        placeholder="e.g. 299.99"
                                        error={errors.pricePerM2}
                                        {...register('pricePerM2', { valueAsNumber: true })}
                                    />
                                </div>

                                {/* Images */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Images * (URLs from media.graphassets.com)
                                    </label>

                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input
                                                id={`image-${index}`}
                                                type="url"
                                                placeholder="https://media.graphassets.com/..."
                                                className="flex-grow"
                                                value={url}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                            />

                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImageField(index)}
                                                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                                                    aria-label="Remove image"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleAddImageField}
                                        className="inline-flex items-center text-sm text-primary hover:text-primary-dark mt-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add Another Image
                                    </button>

                                    {errors.images && (
                                        <p className="form-error">{errors.images.message}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <Textarea
                                    label="Description *"
                                    id="description"
                                    placeholder="Detailed description of the product..."
                                    rows={4}
                                    error={errors.description}
                                    {...register('description')}
                                />

                                {/* Additional Specifications */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Origin"
                                        id="origin"
                                        type="text"
                                        placeholder="e.g. Italy"
                                        error={errors.origin}
                                        {...register('origin')}
                                    />

                                    <Input
                                        label="Density"
                                        id="density"
                                        type="text"
                                        placeholder="e.g. 2.7 g/cm³"
                                        error={errors.density}
                                        {...register('density')}
                                    />

                                    <Input
                                        label="Water Absorption"
                                        id="waterAbsorption"
                                        type="text"
                                        placeholder="e.g. 0.2%"
                                        error={errors.waterAbsorption}
                                        {...register('waterAbsorption')}
                                    />

                                    <Input
                                        label="Compressive Strength"
                                        id="compressiveStrength"
                                        type="text"
                                        placeholder="e.g. 170 MPa"
                                        error={errors.compressiveStrength}
                                        {...register('compressiveStrength')}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button type="submit" variant="primary">
                                        Add Product
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            {/* Inquiry Details Drawer */}
            {isDrawerOpen && selectedInquiry && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)}></div>

                    <div className="absolute inset-y-0 right-0 max-w-full flex">
                        <div className="relative w-screen max-w-md">
                            <div className="h-full bg-white shadow-xl flex flex-col">
                                {/* Drawer Header */}
                                <div className="px-6 py-4 border-b flex items-center justify-between">
                                    <h2 className="text-xl font-serif font-semibold">Inquiry Details</h2>
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="p-1"
                                        aria-label="Close"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Drawer Content */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    {/* Date & Status */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(selectedInquiry.createdAt)}
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="status" className="text-sm mr-2">Status:</label>
                                            <select
                                                id="status"
                                                value={selectedInquiry.status}
                                                onChange={(e) => handleStatusUpdate(selectedInquiry.id, e.target.value)}
                                                disabled={isUpdatingStatus}
                                                className="select text-sm py-1"
                                            >
                                                <option value="NEW">New</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="DONE">Done</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="mb-6 pb-6 border-b">
                                        <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Name:</span>
                                                <span className="font-medium">{selectedInquiry.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Phone:</span>
                                                <a href={`tel:${selectedInquiry.phone}`} className="text-primary">{formatPhone(selectedInquiry.phone)}</a>
                                            </div>
                                            {selectedInquiry.email && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Email:</span>
                                                    <a href={`mailto:${selectedInquiry.email}`} className="text-primary">{selectedInquiry.email}</a>
                                                </div>
                                            )}
                                            {selectedInquiry.company && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Company:</span>
                                                    <span>{selectedInquiry.company}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity Info */}
                                    {selectedInquiry.quantityM2 && (
                                        <div className="mb-6 pb-6 border-b">
                                            <h3 className="font-semibold text-lg mb-3">Order Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Quantity:</span>
                                                    <span>{selectedInquiry.quantityM2} m²</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Message */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">Message</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg text-sm">
                                            {selectedInquiry.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


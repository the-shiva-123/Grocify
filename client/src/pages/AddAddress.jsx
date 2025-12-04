import { useState } from 'react'
import { UseAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const AddAddress = () => {
    const { navigate, addNewAddress } = UseAppContext();

    const [formData, setFormData] = useState({
        name: '',
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Address label is required';
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) newErrors.zipCode = 'Invalid ZIP code';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            addNewAddress(formData);
            navigate('/cart');
        }
    };

    const handleCancel = () => {
        navigate('/cart');
    };

    return (
        <div className='mt-16 pb-16 max-w-7xl mx-auto px-6'>
            <div className='flex flex-col md:flex-row gap-10'>
                {/* Left Side - Form */}
                <div className='w-full md:w-1/2 order-1 md:order-1'>
                    <div className='mb-8'>
                        <h1 className='text-2xl md:text-3xl font-medium text-gray-800'>
                            Add Shipping <span className='text-primary font-semibold'>Address</span>
                        </h1>
                        <p className='text-gray-500 mt-2'>Please fill in the details below to add a new delivery address</p>
                    </div>

                    <form onSubmit={handleSubmit} className='bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm'>
                        {/* Address Label */}
                        <div className='mb-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Address Label <span className='text-red-500'>*</span>
                            </label>
                            <div className='flex gap-3 flex-wrap'>
                                {['Home', 'Office', 'Other'].map((label) => (
                                    <button
                                        key={label}
                                        type='button'
                                        onClick={() => setFormData(prev => ({ ...prev, name: label }))}
                                        className={`px-4 py-2 rounded-lg border transition ${formData.name === label
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300 text-gray-700 hover:border-primary'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Or enter custom label'
                                className={`w-full mt-3 px-4 py-3 border rounded-lg outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                    }`}
                            />
                            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
                        </div>

                        {/* Full Name */}
                        <div className='mb-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Full Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder='John Doe'
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                    }`}
                            />
                            {errors.fullName && <p className='text-red-500 text-xs mt-1'>{errors.fullName}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className='mb-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Phone Number <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='tel'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='+1 234 567 8900'
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                    }`}
                            />
                            {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
                        </div>

                        {/* Street Address */}
                        <div className='mb-6'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Street Address <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                placeholder='123 Main Street, Apartment 4B'
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.address ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                    }`}
                            />
                            {errors.address && <p className='text-red-500 text-xs mt-1'>{errors.address}</p>}
                        </div>

                        {/* City, State, ZIP Code */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    City <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder='New York'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.city ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                        }`}
                                />
                                {errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city}</p>}
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    State <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='state'
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder='NY'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.state ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                        }`}
                                />
                                {errors.state && <p className='text-red-500 text-xs mt-1'>{errors.state}</p>}
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    ZIP Code <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    name='zipCode'
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    placeholder='10001'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition ${errors.zipCode ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                                        }`}
                                />
                                {errors.zipCode && <p className='text-red-500 text-xs mt-1'>{errors.zipCode}</p>}
                            </div>
                        </div>

                        {/* Country */}
                        <div className='mb-8'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Country
                            </label>
                            <select
                                name='country'
                                value={formData.country}
                                onChange={handleChange}
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary transition bg-white'
                            >
                                <option value='USA'>United States</option>
                                <option value='Canada'>Canada</option>
                                <option value='UK'>United Kingdom</option>
                                <option value='India'>India</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col-reverse md:flex-row gap-4'>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className='flex-1 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='flex-1 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow-md hover:shadow-lg transform active:scale-[0.99]'
                            >
                                Save Address
                            </button>
                        </div>
                    </form>

                    {/* Info Card */}
                    <div className='mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-blue-600 flex-shrink-0'>
                            <path d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' stroke='currentColor' strokeWidth='2' />
                            <path d='M12 16V12M12 8H12.01' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                        </svg>
                        <div>
                            <p className='text-sm font-medium text-blue-900'>Delivery Information</p>
                            <p className='text-xs text-blue-700 mt-1'>Make sure your address is complete and accurate to ensure smooth delivery of your orders.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className='w-full md:w-1/2 order-2 md:order-2 flex justify-center md:justify-end items-start'>
                    <img
                        src={assets.add_address_image}
                        alt="Add Address"
                        className='w-full max-w-sm md:max-w-full object-contain md:sticky md:top-32 rounded-lg'
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAddress
import { useState } from 'react'
import { UseAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const AddAddress = () => {
    const { navigate, addNewAddress } = UseAppContext();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
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

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const submissionData = {
                ...formData,
                name: 'Home', // Default label as per plan
                fullName: `${formData.firstName} ${formData.lastName}`
            };
            addNewAddress(submissionData);
            navigate('/cart');
        }
    };

    return (
        <div className='mt-16 pb-16 max-w-7xl mx-auto px-6'>
            <div className='mb-8'>
                <h1 className='text-2xl md:text-3xl font-medium text-gray-800'>
                    Add Shipping <span className='text-primary font-semibold'>Address</span>
                </h1>
            </div>

            <div className='flex flex-col md:flex-row gap-10'>
                {/* Left Side - Form */}
                <div className='w-full md:w-1/2 order-1 md:order-1'>
                    <form onSubmit={handleSubmit} className='space-y-4'>

                        {/* Row 1: First Name & Last Name */}
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder='First Name'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                />
                                {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
                            </div>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder='Last Name'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                />
                                {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Row 2: Email Address */}
                        <div>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email address'
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                            />
                            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                        </div>

                        {/* Row 3: Street Address */}
                        <div>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                placeholder='Street'
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.address ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                            />
                            {errors.address && <p className='text-red-500 text-xs mt-1'>{errors.address}</p>}
                        </div>

                        {/* Row 4: City & State */}
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder='City'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.city ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                />
                                {errors.city && <p className='text-red-500 text-xs mt-1'>{errors.city}</p>}
                            </div>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    name='state'
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder='State'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.state ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                />
                                {errors.state && <p className='text-red-500 text-xs mt-1'>{errors.state}</p>}
                            </div>
                        </div>

                        {/* Row 5: Zip Code & Country */}
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    name='zipCode'
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    placeholder='Zip code'
                                    className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.zipCode ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                />
                                {errors.zipCode && <p className='text-red-500 text-xs mt-1'>{errors.zipCode}</p>}
                            </div>
                            <div className='w-1/2'>
                                <input
                                    type='text'
                                    name='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder='Country'
                                    className='w-full px-4 py-3 border border-gray-200 rounded-lg outline-none transition bg-gray-50 focus:border-primary'
                                />
                            </div>
                        </div>

                        {/* Row 6: Phone */}
                        <div>
                            <input
                                type='tel'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='Phone'
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition bg-gray-50 ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                            />
                            {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
                        </div>

                        {/* Save Button */}
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition shadow-md hover:shadow-lg transform active:scale-[0.99] uppercase text-sm tracking-wide'
                            >
                                SAVE ADDRESS
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side - Image */}
                <div className='w-full md:w-1/2 order-2 md:order-2 flex justify-center items-center'>
                    <img
                        src={assets.add_address_image}
                        alt="Add Address"
                        className='w-full max-w-md object-contain'
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAddress
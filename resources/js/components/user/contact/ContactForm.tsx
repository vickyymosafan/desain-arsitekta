import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils';

interface FormState {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    service: string;
}

const initialFormState: FormState = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: 'design'
};

const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formState.name || !formState.email || !formState.message) {
            setFormError('Silakan isi semua kolom yang diperlukan.');
            return;
        }
        
        // Reset error
        setFormError('');
        
        // Show submitting state
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setFormSuccess(true);
            setFormState(initialFormState);
            
            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500"
                        placeholder="Masukkan nama lengkap"
                        required
                    />
                </motion.div>
                
                {/* Email Field */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500"
                        placeholder="Masukkan alamat email"
                        required
                    />
                </motion.div>
                
                {/* Phone Field */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Nomor Telepon</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500"
                        placeholder="Masukkan nomor telepon"
                    />
                </motion.div>
                
                {/* Service Selection Field */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Layanan yang Diminati</label>
                    <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500"
                    >
                        <option value="design">Desain Arsitektur</option>
                        <option value="construction">Konstruksi</option>
                        <option value="renovation">Renovasi</option>
                        <option value="consultation">Konsultasi</option>
                        <option value="other">Lainnya</option>
                    </select>
                </motion.div>
            </div>
            
            {/* Subject Field */}
            <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subjek*</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500"
                    placeholder="Masukkan subjek pesan"
                    required
                />
            </motion.div>
            
            {/* Message Field */}
            <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Pesan*</label>
                <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500 resize-none"
                    placeholder="Tuliskan kebutuhan atau pertanyaan Anda"
                    required
                ></textarea>
            </motion.div>

            {/* Error Message */}
            {formError && (
                <motion.div 
                    className="p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>{formError}</p>
                </motion.div>
            )}

            {/* Success Message */}
            {formSuccess && (
                <motion.div 
                    className="p-3 bg-green-900/50 border border-green-800 rounded-lg text-green-200 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p>Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.</p>
                </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                        </>
                    ) : 'Kirim Pesan'}
                </button>
            </motion.div>
        </motion.form>
    );
};

export default ContactForm;

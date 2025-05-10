import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about our services? Want to list your studio? 
              We're here to help! Reach out to us using any of the methods below.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-[#FF5A5F] mr-4" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@socialmap.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-[#FF5A5F] mr-4" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+91 (11) 1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-[#FF5A5F] mr-4" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Creative Hub<br />
                    Connaught Place, New Delhi 110001
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF5A5F] text-white py-3 px-6 rounded-md hover:bg-[#FF4045] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
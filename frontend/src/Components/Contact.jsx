import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  Newspaper,
  AlertCircle,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: "contact@nepalniti.com",
      description: "For general inquiries and feedback"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+977 1234567890",
      description: "Mon-Fri, 9:00 AM - 6:00 PM NPT"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Kathmandu, Nepal",
      description: "Hisar, Haryana, IN Office"
    }
  ];

  const departments = [
    {
      icon: Newspaper,
      title: "Editorial Team",
      email: "editorial@nepalniti.com",
      description: "Story tips, corrections, and editorial feedback"
    },
    {
      icon: Users,
      title: "Partnerships",
      email: "partnerships@nepalniti.com",
      description: "Business inquiries and collaboration opportunities"
    },
    {
      icon: AlertCircle,
      title: "Report an Issue",
      email: "support@nepalniti.com",
      description: "Technical problems and content concerns"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center bg-red-100 rounded px-3 py-1 mb-6">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-red-700 uppercase tracking-wide">Contact Us</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Get in Touch
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Have a question, story tip, or feedback? We're here to listen. 
            Our team is committed to responding to all inquiries promptly.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 p-8 hover:border-red-600 transition-colors duration-200"
              >
                <method.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">
                  {method.title}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {method.details}
                </p>
                <p className="text-gray-600 text-sm">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">
                Send Us a Message
              </h2>
              <div className="w-16 h-1 bg-red-600 mb-8"></div>

              {submitted && (
                <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold text-green-800">Message sent successfully!</p>
                      <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="editorial">Editorial/Story Tip</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-semibold text-lg transition-colors duration-200 flex items-center justify-center ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">
                Department Contacts
              </h2>
              <div className="w-16 h-1 bg-red-600 mb-8"></div>

              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div 
                    key={index}
                    className="bg-white border-l-4 border-red-600 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start">
                      <dept.icon className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-black mb-2">
                          {dept.title}
                        </h3>
                        <a 
                          href={`mailto:${dept.email}`}
                          className="text-red-600 hover:text-red-700 font-medium mb-2 block"
                        >
                          {dept.email}
                        </a>
                        <p className="text-gray-600 text-sm">
                          {dept.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Time */}
              <div className="bg-black text-white p-6 mt-8">
                <div className="flex items-start">
                  <Clock className="w-8 h-8 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      Response Time
                    </h3>
                    <p className="text-gray-300 text-sm">
                      We typically respond to all inquiries within 24-48 hours during business days. 
                      Urgent matters are prioritized and handled more quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-12 mx-auto"></div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 border-l-4 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">
                How can I submit a story tip?
              </h3>
              <p className="text-gray-700">
                Use the contact form above and select "Editorial/Story Tip" as the category, 
                or email us directly at editorial@nepalniti.com with relevant details and sources.
              </p>
            </div>

            <div className="bg-gray-50 p-6 border-l-4 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">
                How do I report an error in an article?
              </h3>
              <p className="text-gray-700">
                We take accuracy seriously. Please email editorial@nepalniti.com with the article URL 
                and details of the error. We'll investigate and correct it promptly.
              </p>
            </div>

            <div className="bg-gray-50 p-6 border-l-4 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">
                Can I contribute articles to NepalNiti?
              </h3>
              <p className="text-gray-700">
                Yes! We welcome contributions from expert writers. Email editorial@nepalniti.com 
                with your pitch, relevant credentials, and writing samples.
              </p>
            </div>

            <div className="bg-gray-50 p-6 border-l-4 border-gray-300">
              <h3 className="text-lg font-bold text-black mb-2">
                How do I advertise or partner with NepalNiti?
              </h3>
              <p className="text-gray-700">
                For advertising and partnership opportunities, please contact partnerships@nepalniti.com 
                with your proposal and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-red-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Stay Informed
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest news and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
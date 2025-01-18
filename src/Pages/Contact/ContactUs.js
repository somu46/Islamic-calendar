import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const socialLinks = [
  {
    href: "https://www.youtube.com/",
    icon: <YouTubeIcon fontSize="large" />,
    color: "text-red-600 hover:text-red-700",
    label: "YouTube",
  },
  {
    href: "mailto:contact@islamicalendar.in",
    icon: <MarkunreadIcon fontSize="large" />,
    color: "text-orange-500 hover:text-orange-600",
    label: "Email",
  },
  {
    href: "https://www.facebook.com/",
    icon: <FacebookIcon fontSize="large" />,
    color: "text-blue-600 hover:text-blue-700",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/",
    icon: <InstagramIcon fontSize="large" />,
    color: "text-pink-500 hover:text-pink-600",
    label: "Instagram",
  },
  {
    href: "https://www.x.com/",
    icon: <XIcon fontSize="large" />,
    color: "text-black",
    label: "X",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill in all fields.");
      return;
    }
    setFormStatus("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg ">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mt-16">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          We’d love to hear from you! Reach out for inquiries or follow us on social platforms.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <div className="flex-1">
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Leave Your Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="5"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-1/3 bg-yellow-400 text-white py-2 rounded-lg font-semibold text-base hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
          {formStatus && (
            <p className="text-center mt-4 text-sm text-red-600">{formStatus}</p>
          )}
        </div>

        {/* Social Links */}
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h2>
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map(({ href, icon, color, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`hover:scale-110 transition-transform ${color}`}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Customer Support */}
          <h3 className="text-2xl font-bold text-gray-700 mt-20 mb-6">Customer Support</h3>
          <p className="text-gray-600">
            Available Monday to Friday: 9:00 AM - 6:00 PM (IST)
          </p>
          <p className="text-gray-600">
            Email us at:{" "}
            <a
              href="mailto:support@islamicalendar.in"
              className="text-blue-500 hover:underline"
            >
              support@islamicalendar.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

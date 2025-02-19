import {Facebook, Twitter, Linkedin,Instagram} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-blue-800 to-blue-600 text-white pt-32 pb-16 overflow-hidden">
      {/* Background Waves */}
      <div className="absolute top-0 left-0 w-full transform -translate-y-1/2">
        <svg className="w-full h-32 md:h-48" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="rgba(21, 101, 192, 0.8)"
            fillOpacity="1"
            d="M0,160L40,144C80,128,160,96,240,96C320,96,400,128,480,154.7C560,181,640,203,720,176C800,149,880,75,960,74.7C1040,75,1120,149,1200,160C1280,171,1360,117,1400,90.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Content Section */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 text-center space-y-8">
        {/* Logo & Tagline */}
        <div className="space-y-6">
          <h2 className="text-5xl font-bold tracking-wide text-white/90">Because Water is for Everyone</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Sustaining communities through clean water initiatives. Join us in creating a future where clean water is accessible to all.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
          {["Home", "About", "Mission", "Projects", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/80 hover:text-white transition-all duration-300 text-lg hover:underline hover:underline-offset-4"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mt-10">
          {[<Facebook/>,<Twitter/>,<Instagram/>,<Linkedin/>].map((platform) => (
            <a
              key={platform}
              href="#"
              className="hover:scale-110 transition-transform duration-300"
            >
              {platform}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 w-3/4 mx-auto mt-12"></div>

        {/* Copyright */}
        <p className="text-white/60 text-sm mt-10">
          © {new Date().getFullYear()} Water for Life. All Rights Reserved.
        </p>
      </div>

      {/* Subtle Animation for Background */}
      <style jsx>{`
        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 10.01%);
          background-size: 20px 20px;
          animation: moveBackground 10s linear infinite;
          pointer-events: none;
        }

        @keyframes moveBackground {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(20px);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
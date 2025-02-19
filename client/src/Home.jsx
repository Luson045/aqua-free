import React, { useState, useEffect } from 'react';
import { ArrowRight, Droplet, Globe, Users, Target, Award, ChevronDown, Waves, Menu } from 'lucide-react';
import { Mail, Phone, Instagram, Twitter, Linkedin,  ArrowUpRight, Droplets, Heart,Sparkles, Rocket, Handshake } from 'lucide-react';
import './App.css';

const Home = () => {
  // Keeping all the existing state and effects
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [animatedCount, setAnimatedCount] = useState(false);

  // Existing data
  const sponsors = [
    { name: 'water.org', logo: './sponsor1.png' },
    { name: 'charity:water', logo: './sponsor2.jpg' },
    { name: 'efi', logo: './sponsor3.png' },
    { name: 'iwmi', logo: './sponsor4.jpg' },
    { name: 'iwm', logo: './sponsor4.jpg' }
  ];

  const distributors = [
    { name: "Clean Water Initiative", region: "North America", bottles: "25,000", image: "./location.jpeg" },
    { name: "HydroHelp International", region: "Europe", bottles: "18,000", image: "./location.jpeg" },
    { name: "AquaSolutions", region: "Asia Pacific", bottles: "22,000", image: "./location.jpeg" },
    { name: "H2O Outreach", region: "Africa", bottles: "20,000", image: "./location.jpeg" },
    { name: "Pure Source Network", region: "South America", bottles: "15,000", image: "./location.jpeg" },
  ];

  const duplicatedSponsors = [...sponsors, ...sponsors];

  // Keeping the existing useEffect and helper functions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'why-brand', 'mission', 'how-it-works', 'brand-spotlight', 'join'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      
      const counterSection = document.getElementById('counter');
      if (counterSection) {
        const bounds = counterSection.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom >= 0) {
          setAnimatedCount(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (animatedCount) {
        let startTime;
        const startValue = 0;
        
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = (currentTime - startTime) / duration;
          
          if (progress < 1) {
            setCount(Math.floor(startValue + (end - startValue) * progress));
            requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        };
        
        requestAnimationFrame(animate);
      }
    }, [end, duration, animatedCount]);
    
    return <span>{count}</span>;
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400">
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 20 + 10}px`,
                  animation: `float ${Math.random() * 10 + 5}s infinite linear`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
          <div className="text-center w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold animate-fade-in opacity-0 leading-tight mb-8 text-white" 
                style={{ animation: 'fadeIn 1s forwards 0.5s' }}>
              Hydration with a Purpose
              <span className="block mt-2">Your Brand, Our Bottles.</span>
            </h1>
            
            <button 
              onClick={() => scrollToSection('advertise')}
              className="border-2 border-white text-white px-8 py-2.5 hover:bg-blue-800 hover:text-blue transition-all duration-300 animate-fade-in opacity-0 text-lg"
              style={{ animation: 'fadeIn 1s forwards 1s' }}
            >
              Advertise with us
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>

      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-64 w-64 -top-32 -left-32 bg-blue-200 rounded-full mix-blend-multiply opacity-10 animate-float" />
        <div className="absolute h-64 w-64 -bottom-32 -right-32 bg-purple-200 rounded-full mix-blend-multiply opacity-10 animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
          Why Your Brand Matters
          </h2>
          <p className="text-xl text-gray-600">
            Transform your marketing into meaningful impact with purpose-driven advertising
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-100 rounded-full scale-150 animate-pulse-slow opacity-50" />
                  <Rocket className="w-8 h-8 text-purple-600 relative z-10 transform rotate-45" />
                </div>
              ),
              title: "Strategic Visibility",
              metrics: "50K+ Daily Views",
              description: "Premium placement on sustainable bottles puts your brand in the hands of engaged, conscious consumers.",
              gradient: "from-purple-500 to-purple-600"
            },
            {
              icon: (
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 animate-pulse-slow opacity-50" />
                  <Handshake className="w-8 h-8 text-blue-600 relative z-10" />
                </div>
              ),
              title: "Community Impact",
              metrics: "₹10 Per Bottle",
              description: "Every sponsored bottle provides clean water access, amplifying your social responsibility initiatives.",
              gradient: "from-blue-500 to-blue-600"
            },
            {
              icon: (
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-pulse-slow opacity-50" />
                  <Sparkles className="w-8 h-8 text-emerald-600 relative z-10" />
                </div>
              ),
              title: "Sustainable Leadership",
              metrics: "85% Brand Recall",
              description: "Lead the sustainability movement while creating meaningful connections with your audience.",
              gradient: "from-emerald-500 to-emerald-600"
            }
          ].map((card, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Elevated Card */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                {/* Icon Container */}
                <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
                
                {/* Content */}
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                  {card.title}
                </h3>
                <div className="text-lg font-semibold text-gray-700 mb-4">
                  {card.metrics}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
                
                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" 
                     style={{
                       backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                       '--tw-gradient-from': card.gradient.split(' ')[1].replace('to-', ''),
                       '--tw-gradient-to': card.gradient.split(' ')[1].replace('to-', '')
                     }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Who We Are Section - Keeping existing */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Decorative water ripple effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column with text */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Who We Are
            </h2>
            <p className="text-xl leading-relaxed text-gray-600">
              We're revolutionizing advertising by turning water bottles into powerful marketing channels while making a positive impact on the world. Every bottle tells a story of innovation, sustainability, and social responsibility.
            </p>
            
            {/* Stats section */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">₹10</p>
                <p className="text-sm text-gray-600">Donated per bottle</p>
              </div>
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">10%</p>
                <p className="text-sm text-gray-600">Of Indias needed</p>
              </div>
            </div>
          </div>

          {/* Right column with cards */}
          <div className="relative">
            <div className="grid gap-6">
              {[
                {
                  icon: <Droplets className="w-6 h-6 text-blue-500" />,
                  title: "Premium Spring Water",
                  description: "We provide high-quality spring water in environmentally conscious packaging, making hydration both accessible and sustainable."
                },
                {
                  icon: <Globe className="w-6 h-6 text-green-500" />,
                  title: "Global Impact",
                  description: "Our innovative advertising platform funds clean water initiatives worldwide, turning every sip into positive change."
                },
                {
                  icon: <Heart className="w-6 h-6 text-red-500" />,
                  title: "Brand Purpose",
                  description: "We connect conscious brands with consumers through meaningful advertising that makes a difference in the world."
                }
              ].map((card, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        {card.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                      </h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/50 to-transparent" />
      </div>
    </section>
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
            Our Mission
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Creating a world where clean water is a right, not a privilege
          </p>
        </div>

        {/* Mission Items */}
        <div className="space-y-20 md:space-y-32">
          {[
            {
              image: "/universal_access.png",
              title: "Universal Access",
              description: "Providing free drinking water to communities worldwide through strategic distribution points. Our network of distribution centers ensures that clean water reaches those who need it most.",
              stats: "1M+ Lives Impacted",
              align: "right"
            },
            {
              image: "/funding.png",
              title: "Innovative Funding",
              description: "Leveraging advertising solutions to sustainably fund our water distribution network. Our unique business model transforms advertising spend into social impact.",
              stats: "100% Self-Sustainable",
              align: "left"
            },
            {
              image: "/healthy_habit.png",
              title: "Healthy Habits",
              description: "Promoting water consumption through engaging gamification and community challenges. We're building a movement that makes healthy hydration an engaging daily practice.",
              stats: "50K+ Active Users",
              align: "right"
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className={`flex flex-col lg:grid lg:grid-cols-12 items-center`}>
                {/* Image Container */}
                <div className={`w-full lg:col-span-5 flex ${
                  item.align === 'left' ? 'lg:order-last lg:justify-start' : 'lg:justify-end'
                } justify-center`}>
                  <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Spacer */}
                <div className="lg:col-span-2" />

                {/* Content Container */}
                <div className={`w-full lg:col-span-5 text-center ${
                  item.align === 'left' ? 'lg:text-right lg:order-first' : 'lg:text-left'
                }`}>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className={`flex items-center gap-4 justify-center ${
                    item.align === 'left' ? 'lg:justify-end' : 'lg:justify-start'
                  }`}>
                    <span className="bg-blue-50 px-5 py-2.5 rounded-full text-blue-600 font-semibold text-sm md:text-base">
                      {item.stats}
                    </span>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 md:mt-32 text-center">
          <button className="group inline-flex items-center gap-2 bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-blue-700 transition-colors text-base md:text-lg font-semibold">
            Join Our Mission
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
      {/* Impact Counter Section - Keeping existing */}
      <section id="counter" className="bg-gradient-to-br from-blue-50 to-white py-20 animate-from-below">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-8 h-8" />, number: 100000, label: "Lives Impacted", suffix: "+" },
              { icon: <Droplet className="w-8 h-8" />, number: 500, label: "Water Points", suffix: "+" },
              { icon: <Globe className="w-8 h-8" />, number: 50, label: "Cities Covered", suffix: "+" },
              { icon: <Target className="w-8 h-8" />, number: 100000, label: "Daily Users", suffix: "+" }
            ].map((stat, index) => (
              <div key={index} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg border border-blue-100 group">
                <div className="flex justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-blue-600">
                  <AnimatedCounter end={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-blue-900/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
          How It Works
          </h2>
            <p className="text-xl text-gray-600">Four simple steps to impactful brand visibility</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Impact",
                description: "Select your target regions and campaign duration"
              },
              {
                step: "2",
                title: "Design Your Message",
                description: "Craft your brand message with our design team"
              },
              {
                step: "3",
                title: "Launch Campaign",
                description: "We handle distribution and tracking"
              },
              {
                step: "4",
                title: "Track Results",
                description: "Monitor impact metrics in real-time"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="text-gray-700 text-xl font-semibold mb-4 mt-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Spotlight Section */}
      <section id="brand-spotlight" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
          Success Stories
          </h2>
            <p className="text-xl text-gray-600">Real brands, real impact</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Case Study: Global Tech Co</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-600">Challenge</h4>
                  <p className="text-gray-600">Needed to increase brand visibility while demonstrating social responsibility</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600">Solution</h4>
                  <p className="text-gray-600">3-month campaign with branded water bottles in 5 major cities</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600">Results</h4>
                  <p className="text-gray-600">50,000+ direct impressions, 28% increase in brand perception</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Testimonials</h3>
              <div className="space-y-6">
                <blockquote className="text-gray-600 italic">
                  "This campaign exceeded our expectations in both reach and impact. The positive feedback from our customers was overwhelming."
                  <footer className="text-gray-900 font-medium mt-2">- Marketing Director, Global Tech Co</footer>
                </blockquote>
                <blockquote className="text-gray-600 italic">
                  "A perfect blend of marketing and social responsibility. We're proud to be part of this initiative."
                  <footer className="text-gray-900 font-medium mt-2">- CEO, Startup Innovation</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section id="join" className="py-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent inline-block">
          Let's Make Your Brand Unforgettable!
          </h2>
            <p className="text-xl opacity-90">Join the movement for sustainable advertising with purpose</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "For Corporates",
                description: "Transform your CSR into high-visibility impact campaigns"
              },
              {
                title: "For Startups",
                description: "Cost-effective branding that resonates with your audience"
              },
              {
                title: "For Events",
                description: "Maximize engagement with sponsored hydration stations"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Partner Now
            </button>
          </div>
        </div>
      </section>

      {/* Existing Sponsors Section */}
      <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
      <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent text-center">
  Our Sponsors
</h2>
        <p className="text-center text-gray-600 mb-12">
          Partners in our mission for universal water access
        </p>

        {/* Scrolling Carousel (Both Mobile and Desktop) */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10" />
          
          {/* Main scrolling container */}
          <div className="flex overflow-hidden">
            <div className="animate-scroll flex gap-8">
              {duplicatedSponsors.map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className="flex-shrink-0 w-40 h-40 flex items-center justify-center bg-gray-50 rounded-lg"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 2rem)); /* Adjust for gap */
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }
        
        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Ensure smooth animation */
        .animate-scroll {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
        }
      `}</style>
    </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          <h2 className="mt-16 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
          Your Brand, Our Mission, Endless Possibilities
          </h2>
            <p className="text-xl text-gray-600">Get in touch to create a tailored branding campaign that delivers impact and engagement</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">123 ABCD, Jalandhar, Punjab</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@aquafree.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91- 432493290428</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Collaborate</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about your brand and goals"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
};

// Add missing imports

// Keep existing styles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

export default Home;
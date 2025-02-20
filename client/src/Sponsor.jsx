import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronDown, ChevronUp, ExternalLink, Globe, Users, Award, BarChart } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SponsorshipPage = () => {
  const modelRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('silver');

  useEffect(() => {
    if (!modelRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e3a8a);

    const camera = new THREE.PerspectiveCamera(75, modelRef.current.clientWidth / modelRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(modelRef.current.clientWidth, modelRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    modelRef.current.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    const loader = new GLTFLoader();
    loader.load('water_bottle_free.glb', (gltf) => {
      const bottleObject = gltf.scene;
      bottleObject.scale.set(8.5, 8.5, 8.5);
      scene.add(bottleObject);
      const brandTexture = new THREE.TextureLoader().load('/api/placeholder/200/80');
      const brandMaterial = new THREE.MeshBasicMaterial({
        map: brandTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const brandGeometry = new THREE.PlaneGeometry(1, 0.5);
      const brandPlane = new THREE.Mesh(brandGeometry, brandMaterial);
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      isMobile?brandPlane.position.set(0, 0, 1.5):brandPlane.position.set(-10, 0, 1.5);
      bottleObject.add(brandPlane);

      animate();
    });
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    const handleResize = () => {
      if (!modelRef.current) return;
      camera.aspect = modelRef.current.clientWidth / modelRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(modelRef.current.clientWidth, modelRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (modelRef.current) {
        while (modelRef.current.firstChild) {
          modelRef.current.removeChild(modelRef.current.firstChild);
        }
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  const benefits = [
    { icon: <Globe className="w-12 h-12 text-blue-400" />, title: "Global Visibility", description: "Your brand featured on bottles distributed worldwide, gaining exposure to our international audience." },
    { icon: <Users className="w-12 h-12 text-blue-400" />, title: "Community Impact", description: "Associate your brand with positive social change and commitment to clean water accessibility." },
    { icon: <Award className="w-12 h-12 text-blue-400" />, title: "Premium Placement", description: "Prominent logo placement on our signature water bottles, ensuring maximum visibility." },
    { icon: <BarChart className="w-12 h-12 text-blue-400" />, title: "Marketing Analytics", description: "Receive detailed reports on distribution, engagement, and brand exposure statistics." },
  ];

  const pricingPlans = {
    silver: {
      name: "Silver",
      price: "₹5,000",
      features: [
        "Logo on 500 bottles",
        "Regional distribution",
        "Digital promotion on website",
        "Quarterly impact reports",
      ],
    },
    gold: {
      name: "Gold",
      price: "₹15,000",
      features: [
        "Logo on 1500 bottles",
        "National distribution",
        "Social media campaign",
        "Monthly impact reports",
        "Co-branded marketing materials",
      ],
    },
    platinum: {
      name: "Platinum",
      price: "₹30,000",
      features: [
        "Logo on 3000 bottles",
        "Global distribution",
        "Featured partner on homepage",
        "Weekly impact reports",
        "Co-branded marketing materials",
        "Exclusive event sponsorship",
        "Press release announcement",
      ],
    },
  };

  const distributors = [
    { name: "Clean Water Initiative", region: "North America", bottles: "25,000",image:"./location.jpeg" },
    { name: "HydroHelp International", region: "Europe", bottles: "18,000",image:"./location.jpeg" },
    { name: "AquaSolutions", region: "Asia Pacific", bottles: "22,000",image:"./location.jpeg" },
    { name: "H2O Outreach", region: "Africa", bottles: "20,000",image:"./location.jpeg" },
    { name: "Pure Source Network", region: "South America", bottles: "15,000",image:"./location.jpeg" },
  ];

  const faqs = [
    {
      question: "How is my brand displayed on the water bottles?",
      answer: "Your logo is prominently displayed on the bottle using premium UV-resistant printing to ensure durability.",
    },
    {
      question: "What are the specifications for logo submission?",
      answer: "We accept vector files (AI, EPS, PDF) with a minimum resolution of 300 DPI. Logos should be submitted in full color and monochrome versions.",
    },
    {
      question: "Can we customize the distribution regions?",
      answer: "Yes, our Gold and Platinum sponsors can specify preferred distribution regions based on their target markets.",
    },
    {
      question: "How are impact metrics measured and reported?",
      answer: "We use a combination of distribution tracking, QR code scans, social media engagement, and field reports from our partners.",
    },
    {
      question: "Is there an opportunity for multi-year sponsorship?",
      answer: "Yes, we offer 3-year and 5-year sponsorship packages with preferred pricing and additional benefits.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-animation z-0"></div>
      <section className="mt-32 pb-32 px-4 container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Sponsor Clean Water, Build Your Brand</h1>
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Partner with AquaForFree to showcase your brand on our innovative water bottles while helping make clean drinking water accessible worldwide.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#bottle" className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center">
              See the Bottle <ArrowDown className="ml-2 w-5 h-5" />
            </a>
            <a href="#pricing" className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all text-center">
              View Sponsorship Packages
            </a>
          </div>
        </div>
      </section>
      <section id="bottle" className="py-20 bg-blue-900 bg-opacity-30 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Brand on Our Bottle</h2>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
              Our innovative, eco-friendly water bottles feature your brand prominently, ensuring maximum visibility while delivering clean water worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="h-96 bg-gradient-to-b from-blue-800 to-blue-600 rounded-xl overflow-hidden shadow-2xl" ref={modelRef}>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Brand Placement Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 mt-1">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Premium Positioning</h4>
                    <p className="opacity-80">Your logo prominently displayed on the front of each bottle</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 mt-1">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Long-lasting Print</h4>
                    <p className="opacity-80">UV-resistant, weatherproof printing ensures your brand stays vibrant</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 mt-1">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Global Visibility</h4>
                    <p className="opacity-80">Bottles distributed across multiple continents for maximum exposure</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 mt-1">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">QR Code Integration</h4>
                    <p className="opacity-80">Optional QR code linking to your website or campaign</p>
                  </div>
                </li>
              </ul>

              <button className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center">
                Request Custom Preview <ExternalLink className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="benefits" className="py-20 container mx-auto px-4 relative z-10 animate-from-below">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sponsorship Benefits</h2>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            Partner with AquaForFree and gain more than just brand visibility. Join our mission while achieving your marketing goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-blue-400 bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-10"
            >
              <div className="flex justify-center mb-6">
                {React.cloneElement(benefit.icon, { color: 'white' })}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{benefit.title}</h3>
              <p className="text-center opacity-80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="py-20 bg-blue-900 bg-opacity-30 backdrop-blur-lg relative z-10  animate-from-below">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sponsorship Packages</h2>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
              Choose the sponsorship tier that aligns with your brand goals and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.keys(pricingPlans).map((plan) => {
              const planData = pricingPlans[plan];
              const isActive = currentPlan === plan;

              return (
                <div
                  key={plan}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-b from-blue-400 to-blue-600 transform scale-105 shadow-xl'
                      : 'bg-blue-800 bg-opacity-10 backdrop-blur-sm hover:bg-opacity-15'
                  }`}
                  onClick={() => setCurrentPlan(plan)}
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{planData.name}</h3>
                    <div className="text-4xl font-bold mb-6">{planData.price}</div>

                    <ul className="space-y-3 mb-8">
                      {planData.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className={`p-1 rounded-full mr-3 ${isActive ? 'bg-white' : 'bg-blue-500'}`}>
                            <i className="fas fa-check text-xs"></i>
                          </div>
                          <span className="opacity-90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-blue-700 hover:bg-opacity-90'
                        : 'bg-transparent border border-white hover:bg-blue-500 hover:bg-opacity-10'
                    }`}>
                      {isActive ? 'Selected' : 'Select Package'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="opacity-80 mb-6">Need a custom package? Contact our sponsorship team</p>
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 hover:bg-opacity-10 transition-all">
              Request Custom Package
            </button>
          </div>
        </div>
      </section>
      {/* Distributors Section */}
{/* <section id="distributors" className="py-20 container mx-auto px-4 relative z-10  animate-from-below">
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Distributors</h2>
    <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto text-white">
      AquaForFree partners with leading organizations to distribute sponsored water bottles worldwide.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    {distributors.map((distributor, index) => (
      <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="h-48 overflow-hidden">
          <img 
            src={distributor.image || `/api/placeholder/400/300?text=${distributor.name}`} 
            alt={distributor.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold text-blue-800 mb-2">{distributor.name}</h3>
          <p className="text-blue-600 mb-4">{distributor.region}</p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Annual Distribution:</span> {distributor.bottles} bottles
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Address:</span> {distributor.address || "123 Water Way, Ocean City"}
          </p>
        </div>
        <div className="p-6 pt-0 mt-auto">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-12 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-8 shadow-lg">
    <div className="grid md:grid-cols-3 gap-8">
      <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
        <div className="text-4xl font-bold mb-2 text-blue-600">100,000+</div>
        <p className="text-blue-600 opacity-90">Bottles Distributed Annually</p>
      </div>
      <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
        <div className="text-4xl font-bold mb-2 text-blue-600">25+</div>
        <p className="text-blue-600 opacity-90">Countries Reached</p>
      </div>
      <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
        <div className="text-4xl font-bold mb-2 text-blue-600">5M+</div>
        <p className="text-blue-600 opacity-90">People Impacted</p>
      </div>
    </div>
  </div>
</section> */}
<section id="faq" className="py-20 bg-gradient-to-b from-blue-900 to-blue-950 relative z-10 animate-from-below">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
      <p className="text-lg md:text-xl text-blue-100 opacity-90 max-w-2xl mx-auto">
        Find answers to common questions about our sponsorship program.
      </p>
    </div>

    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl overflow-hidden transition-all duration-300 shadow-lg"
        >
          <button
            className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
            onClick={() => toggleFaq(index)}
          >
            <span className="font-semibold text-lg text-white">{faq.question}</span>
            {activeFaq === index ? (
              <ChevronUp className="w-5 h-5 text-blue-200" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-200" />
            )}
          </button>

          <div
            className={`px-6 overflow-hidden transition-all duration-300 ${
              activeFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
            }`}
          >
            <p className="text-blue-100">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <p className="text-blue-100 mb-6">Still have questions? Our sponsorship team is here to help</p>
      <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg">
        Contact Sponsorship Team
      </button>
    </div>
  </div>
</section>
      <section className="py-20 container mx-auto px-4 relative z-10 animate-from-below">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join our mission to provide clean water while elevating your brand. Our sponsorship team is ready to create a custom package for your needs.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg">
              Become a Sponsor
            </button>
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorshipPage;
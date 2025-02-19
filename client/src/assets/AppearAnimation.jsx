import { useEffect, useRef } from 'react';

// This is the component wrapper that you can apply to any section
const AnimatedSection = ({ children, id, className }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Only run this on the client
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-appear');
              // Once the animation has played, we can unobserve the element
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );
      
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }
  }, []);
  
  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`transform translate-y-12 opacity-0 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;

// 2. Apply the animation keyframes and class in your global CSS or style tag

// Add this to your global CSS file (e.g., globals.css)
/*
@keyframes appearFromBelow {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-appear {
  animation: appearFromBelow 0.7s forwards ease-out;
}
*/
import { useEffect, useRef } from 'react';

const AnimatedSection = ({ children, id, className }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-appear');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
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

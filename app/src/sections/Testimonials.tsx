import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const carousel = carouselRef.current;

    if (!section || !title || !carousel) return;

    gsap.set(title.children, { opacity: 0, y: 30 });
    gsap.set(carousel, { opacity: 0, y: 50 });

    const triggers: ScrollTrigger[] = [];

    const titleTrigger = ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(title.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(titleTrigger);

    const carouselTrigger = ScrollTrigger.create({
      trigger: carousel,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(carousel, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(carouselTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsConfig.testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsConfig.testimonials.length) % testimonialsConfig.testimonials.length);
  };

  if (testimonialsConfig.testimonials.length === 0) return null;

  const currentTestimonial = testimonialsConfig.testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative w-full py-24 md:py-32 bg-kaleo-cream"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta mb-4">
            {testimonialsConfig.sectionSubtitle}
          </p>
          <h2 className="font-display text-headline text-kaleo-earth">
            {testimonialsConfig.sectionTitle}
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Quote Icon */}
          <div className="flex justify-center mb-8">
            <Quote className="w-12 h-12 text-kaleo-terracotta/30" />
          </div>

          {/* Testimonial Content */}
          <div className="text-center min-h-[400px] md:min-h-[350px] flex flex-col justify-center">
            <h3 className="font-display text-xl md:text-2xl text-kaleo-earth mb-2">
              {currentTestimonial.title}
            </h3>
            <p className="font-body text-sm text-kaleo-terracotta mb-8">
              {currentTestimonial.subtitle}
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="font-body text-base md:text-lg text-kaleo-earth/70 leading-relaxed whitespace-pre-line">
                {currentTestimonial.content}
              </p>
            </div>
            <p className="font-body text-sm text-kaleo-earth/50 mt-8">
              {currentTestimonial.author}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-kaleo-earth/20 flex items-center justify-center hover:border-kaleo-terracotta hover:bg-kaleo-terracotta/10 transition-all"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5 text-kaleo-earth" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialsConfig.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-kaleo-terracotta w-6'
                      : 'bg-kaleo-earth/20 hover:bg-kaleo-earth/40'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-kaleo-earth/20 flex items-center justify-center hover:border-kaleo-terracotta hover:bg-kaleo-terracotta/10 transition-all"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5 text-kaleo-earth" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { narrativeTextConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

const NarrativeText = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const star = starRef.current;

    if (!line1 || !line2 || !line3 || !star) return;

    gsap.set([line1, line2, line3], { opacity: 0, y: 40 });
    gsap.set(star, { opacity: 0, scale: 0.5, rotation: -45 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      }
    });

    tl.to(star, { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'power4.out' })
      .to(line1, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=0.8")
      .to(line2, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=1")
      .to(line3, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=1");

  }, []);

  if (!narrativeTextConfig.line1 && !narrativeTextConfig.line2 && !narrativeTextConfig.line3) return null;

  return (
    <section
      ref={sectionRef}
      id="nosotras"
      className="relative w-full py-32 md:py-48 bg-kaleo-sand"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Spinning Star */}
        <div ref={starRef} className="flex justify-center mb-12 md:mb-16">
          <StarIcon className="w-6 h-6 md:w-8 md:h-8 text-kaleo-terracotta animate-spin-slow" />
        </div>

        {/* Narrative Text Container */}
        <div className="flex flex-col space-y-12 md:space-y-20">
          {/* Línea 1: Impacto Visual */}
          <p
            ref={line1Ref}
            className="font-display text-headline text-kaleo-earth leading-[1.1] tracking-tight px-2"
          >
            {narrativeTextConfig.line1}
          </p>

          {/* Línea 2: Elegancia Itálica */}
          <p
            ref={line2Ref}
            className="font-display text-subheadline text-kaleo-earth/80 italic max-w-2xl mx-auto leading-relaxed tracking-normal"
          >
            {narrativeTextConfig.line2}
          </p>

          {/* Línea 3: Detalle Editorial */}
          <p
            ref={line3Ref}
            className="font-body text-sm md:text-base text-kaleo-earth/60 max-w-lg mx-auto leading-loose tracking-[0.15em] uppercase"
          >
            {narrativeTextConfig.line3}
          </p>
        </div>

        {/* Bottom Star (Decorativa) */}
        <div className="flex justify-center mt-20 md:mt-24">
          <div className="w-px h-12 bg-gradient-to-b from-kaleo-terracotta/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default NarrativeText;


import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardStackConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const CardStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const cards = cardStackConfig.cards;

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !wrapper || cardElements.length === 0) return;

    cardElements.forEach((card, index) => {
      gsap.set(card, {
        y: index === 0 ? 0 : window.innerHeight * 0.5,
        rotation: cards[index].rotation,
        opacity: index === 0 ? 1 : 0,
      });
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${cardElements.length * 100}%`,
      pin: wrapper,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const segmentSize = 1 / cardElements.length;

        cardElements.forEach((card, index) => {
          const cardStart = index * segmentSize;
          const cardProgress = gsap.utils.clamp(0, 1, (progress - cardStart) / segmentSize);

          if (index === 0) {
            gsap.set(card, {
              opacity: 1 - cardProgress * 0.3,
              scale: 1 - cardProgress * 0.05,
            });
          } else {
            const prevCardEnd = index * segmentSize;
            const prevProgress = gsap.utils.clamp(0, 1, (progress - prevCardEnd + segmentSize) / segmentSize);

            gsap.set(card, {
              y: (1 - prevProgress) * window.innerHeight * 0.8,
              opacity: prevProgress,
              zIndex: index,
            });
          }
        });
      },
    });

    triggerRef.current = trigger;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, []);

  if (!cardStackConfig.sectionTitle && cards.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative w-full bg-kaleo-sand"
      style={{ minHeight: `${(cards.length + 1) * 100}vh` }}
    >
      {/* Section Header: Cambiado a relative para que en móvil no flote sobre las tarjetas */}
      <div className="relative md:absolute top-0 left-0 right-0 py-12 md:py-16 text-center z-10">
        <h2 className="font-display text-headline text-kaleo-earth">
          {cardStackConfig.sectionTitle}
        </h2>
        <p className="font-body text-sm text-kaleo-terracotta uppercase tracking-[0.2em] mt-4">
          {cardStackConfig.sectionSubtitle}
        </p>
      </div>

      {/* Pinned Card Wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Cambiamos el aspect ratio dinámicamente: 4/5 en móvil para dar espacio al texto, 4/3 en PC */}
        <div className="relative w-full max-w-4xl mx-auto px-6 md:px-8 aspect-[4/5] md:aspect-[4/3]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute inset-0"
              style={{
                willChange: 'transform, opacity',
                zIndex: index,
              }}
            >
              {/* Estructura de la tarjeta: Flex-col en móvil para separar imagen y texto */}
              <div className="relative flex flex-col overflow-hidden rounded-3xl shadow-deep bg-kaleo-cream h-full">
                
                {/* 1. Contenedor de Imagen: Mitad superior en móvil, pantalla completa en PC */}
                <div className="relative h-1/2 md:absolute md:inset-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlays originales de PC */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-kaleo-charcoal/60 via-transparent to-transparent" />
                  {/* Overlay móvil eliminado para que la imagen se vea limpia */}
                </div>

                {/* 2. Contenedor de Texto: Debajo de la imagen en móvil, encima en PC */}
                <div className="flex-1 md:absolute md:bottom-0 md:left-0 md:right-0 p-6 md:p-8 z-10 bg-kaleo-cream md:bg-transparent">
                  <h3
                    className="font-display text-2xl md:text-3xl text-kaleo-earth md:text-white mb-2"
                    style={{ textShadow: window.innerWidth > 768 ? '0 2px 8px rgba(0,0,0,0.45)' : 'none' }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-body text-sm text-kaleo-charcoal/80 md:text-white/80 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* 3. Número de Tarjeta: Estilos dinámicos para visibilidad */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-kaleo-charcoal/10 md:bg-kaleo-cream/20 backdrop-blur-sm flex items-center justify-center z-10">
                  <span className="font-body text-xs text-kaleo-charcoal md:text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </section>
  );
};

export default CardStack;

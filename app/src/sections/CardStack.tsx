import {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardStackConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

type CardElement = HTMLDivElement | null;

const CardStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<CardElement[]>([]);
  const imageLoadedRef = useRef<boolean[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [, forceRender] = useState(0);

  const cards = useMemo(() => cardStackConfig.cards || [], []);

  cardsRef.current = [];

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const handleImageLoad = (index: number) => {
    imageLoadedRef.current[index] = true;
    forceRender((v) => v + 1);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    if (!section || !wrapper || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      if (!cardElements.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduced } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduced: boolean;
          };

          if (reduced) {
            cardElements.forEach((card, i) => {
              gsap.set(card, {
                clearProps: 'all',
                opacity: i === 0 ? 1 : 0,
                y: 0,
                scale: 1,
              });
            });
            return;
          }

          gsap.set(cardElements, {
            yPercent: 115,
            opacity: 0,
            scale: 1,
            rotate: 0,
            force3D: true,
            transformPerspective: 1200,
            willChange: 'transform, opacity',
          });

          gsap.set(cardElements[0], {
            yPercent: 0,
            opacity: 1,
            rotate: cards[0]?.rotation || 0,
          });

          const tl = gsap.timeline({
            defaults: {
              ease: 'power3.out',
              duration: 1,
            },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${cards.length * 120}%`,
              pin: wrapper,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const index = Math.min(
                  cards.length - 1,
                  Math.round(self.progress * (cards.length - 1))
                );

                setActiveIndex((prev) => (prev !== index ? index : prev));
              },
            },
          });

          cardElements.forEach((card, index) => {
            if (index === 0) return;

            tl.to(
              cardElements[index - 1],
              {
                scale: 0.96,
                opacity: 0.62,
                filter: 'blur(2px)',
                rotate:
                  (cards[index - 1]?.rotation || 0) * 0.4,
              },
              index - 0.05
            );

            tl.fromTo(
              card,
              {
                yPercent: 115,
                opacity: 0,
                scale: 1.06,
                rotate: cards[index]?.rotation || 0,
              },
              {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                rotate: cards[index]?.rotation || 0,
              },
              index
            );
          });

          return () => {
            tl.kill();
          };
        }
      );

      return () => {
        mm.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [cards]);

  if (!cards.length) return null;

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="services-title"
      className="relative w-full bg-kaleo-sand overflow-hidden"
      style={{
        minHeight: `${(cards.length + 1) * 100}vh`,
      }}
    >
      {/* HEADER */}
      <div className="relative z-20 bg-kaleo-sand pt-14 md:pt-20 pb-8 md:pb-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            id="services-title"
            className="font-display text-headline text-kaleo-earth"
          >
            {cardStackConfig.sectionTitle}
          </h2>

          {cardStackConfig.sectionSubtitle && (
            <p className="mt-4 font-body text-xs md:text-sm uppercase tracking-[0.28em] text-kaleo-terracotta">
              {cardStackConfig.sectionSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* STACK */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8"
      >
        <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-[16/10]">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            const isLoaded = imageLoadedRef.current[index];

            return (
              <article
                key={card.id}
                ref={(el) => setCardRef(el, index)}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                aria-label={`${card.title}. Servicio ${
                  index + 1
                } de ${cards.length}`}
                className="absolute inset-0 outline-none"
                style={{
                  zIndex: index + 1,
                }}
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] bg-kaleo-cream shadow-deep border border-white/20">
                  {/* IMAGE */}
                  <div className="relative h-1/2 md:h-full overflow-hidden">
                    {!isLoaded && (
                      <div className="absolute inset-0 animate-pulse bg-kaleo-earth/10" />
                    )}

                    <img
                      src={card.image}
                      alt={card.title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={
                        index === 0 ? 'high' : 'low'
                      }
                      onLoad={() => handleImageLoad(index)}
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        isLoaded
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    />

                    {/* Desktop Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-kaleo-charcoal/95 via-kaleo-charcoal/40 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="relative md:absolute md:bottom-0 md:left-0 md:right-0 z-10 flex flex-col justify-end p-6 md:p-12 bg-kaleo-cream md:bg-transparent">
                    <h3 className="font-display text-2xl md:text-5xl text-kaleo-earth md:text-white leading-tight">
                      {card.title}
                    </h3>

                    <p className="mt-3 md:mt-5 max-w-3xl font-body text-sm md:text-lg leading-relaxed text-kaleo-charcoal/80 md:text-white/90">
                      {card.description}
                    </p>
                  </div>

                  {/* COUNTER */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-kaleo-charcoal/10 backdrop-blur-md md:bg-white/15">
                    <span className="font-body text-xs font-medium text-kaleo-charcoal md:text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* ACTIVE GLOW */}
                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/20" />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* FOOTER SPACE */}
      <div className="h-20 md:h-28 bg-kaleo-sand" />
    </section>
  );
};

export default CardStack;

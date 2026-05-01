import {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardStackConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

type CardElement = HTMLElement | null;

const CardStack = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<CardElement[]>([]);
  const loadedImagesRef = useRef<boolean[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [, forceRender] = useState(0);

  const cards = useMemo(() => cardStackConfig.cards || [], []);

  cardsRef.current = [];

  const setCardRef = useCallback(
    (el: HTMLElement | null, index: number) => {
      cardsRef.current[index] = el;
    },
    []
  );

  const handleImageLoad = useCallback((index: number) => {
    loadedImagesRef.current[index] = true;
    forceRender((v) => v + 1);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    if (!section || !wrapper || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current.filter(
        Boolean
      ) as HTMLElement[];

      if (!cardElements.length) return;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const conditions = context.conditions as {
            desktop?: boolean;
            mobile?: boolean;
            reduce?: boolean;
          };

          const prefersReducedMotion =
            conditions?.reduce === true;

          if (prefersReducedMotion) {
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
            willChange: 'transform, opacity',
          });

          gsap.set(cardElements[0], {
            yPercent: 0,
            opacity: 1,
            rotate: cards[0]?.rotation || 0,
          });

          const timeline = gsap.timeline({
            defaults: {
              duration: 1,
              ease: 'power3.out',
            },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${cards.length * 120}%`,
              pin: wrapper,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onUpdate: (self) => {
                const nextIndex = Math.min(
                  cards.length - 1,
                  Math.round(
                    self.progress * (cards.length - 1)
                  )
                );

                setActiveIndex((prev) =>
                  prev !== nextIndex ? nextIndex : prev
                );
              },
            },
          });

          cardElements.forEach((card, index) => {
            if (index === 0) return;

            timeline.to(
              cardElements[index - 1],
              {
                scale: 0.96,
                opacity: 0.62,
                rotate:
                  (cards[index - 1]?.rotation || 0) * 0.35,
              },
              index - 0.05
            );

            timeline.fromTo(
              card,
              {
                yPercent: 115,
                opacity: 0,
                scale: 1.04,
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
            timeline.kill();
          };
        }
      );

      return () => {
        media.kill();
      };
    }, section);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [cards]);

  if (!cards.length) return null;

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="services-title"
      className="relative w-full overflow-hidden bg-kaleo-sand"
      style={{
        minHeight: `${(cards.length + 1) * 100}vh`,
      }}
    >
      {/* HEADER */}
      <div className="relative z-20 bg-kaleo-sand px-6 pt-14 pb-8 md:pt-20 md:pb-10">
        <div className="mx-auto max-w-6xl text-center">
          <h2
            id="services-title"
            className="font-display text-headline text-kaleo-earth"
          >
            {cardStackConfig.sectionTitle}
          </h2>

          {cardStackConfig.sectionSubtitle ? (
            <p className="mt-4 font-body text-xs uppercase tracking-[0.28em] text-kaleo-terracotta md:text-sm">
              {cardStackConfig.sectionSubtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* STACK */}
      <div
        ref={wrapperRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden px-4 md:px-8"
      >
        <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-[16/10]">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            const loaded =
              loadedImagesRef.current[index] === true;

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
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/20 bg-kaleo-cream shadow-deep">
                  {/* IMAGE */}
                  <div className="relative h-1/2 overflow-hidden md:h-full">
                    {!loaded ? (
                      <div className="absolute inset-0 animate-pulse bg-kaleo-earth/10" />
                    ) : null}

                    <img
                      src={card.image}
                      alt={card.title}
                      loading={
                        index === 0 ? 'eager' : 'lazy'
                      }
                      decoding="async"
                      onLoad={() =>
                        handleImageLoad(index)
                      }
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        loaded
                          ? 'scale-100 opacity-100'
                          : 'scale-105 opacity-0'
                      }`}
                    />

                    {/* Desktop overlay */}
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-kaleo-charcoal/95 via-kaleo-charcoal/40 to-transparent md:block" />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 flex flex-col justify-end bg-kaleo-cream p-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-transparent md:p-12">
                    <h3 className="font-display text-2xl leading-tight text-kaleo-earth md:text-5xl md:text-white">
                      {card.title}
                    </h3>

                    <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-kaleo-charcoal/80 md:mt-5 md:text-lg md:text-white/90">
                      {card.description}
                    </p>
                  </div>

                  {/* COUNTER */}
                  <div className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-kaleo-charcoal/10 backdrop-blur-md md:top-6 md:right-6 md:bg-white/15">
                    <span className="font-body text-xs font-medium text-kaleo-charcoal md:text-white">
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>
                  </div>

                  {/* ACTIVE RING */}
                  {isActive ? (
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/20" />
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SPACE */}
      <div className="h-20 bg-kaleo-sand md:h-28" />
    </section>
  );
};

export default CardStack;

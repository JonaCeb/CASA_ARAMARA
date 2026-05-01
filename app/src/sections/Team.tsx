import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { teamConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  sparkles: Sparkles,
  flower: Flower2,
};

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    gsap.set(title.children, { opacity: 0, y: 30 });
    gsap.set(grid.children, { opacity: 0, y: 50 });

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

    const gridTrigger = ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(grid.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(gridTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (teamConfig.members.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="equipo"
      className="relative w-full py-24 md:py-32 bg-kaleo-sand"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta mb-4">
            {teamConfig.sectionSubtitle}
          </p>
          <h2 className="font-display text-headline text-kaleo-earth">
            {teamConfig.sectionTitle}
          </h2>
          <p className="font-body text-base text-kaleo-earth/60 max-w-2xl mx-auto mt-6 leading-relaxed">
            {teamConfig.description}
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {teamConfig.members.map((member, index) => {
            const Icon = iconMap[member.icon] || Heart;
            return (
              <div
                key={index}
                className="group text-center"
              >
                {/* Avatar Placeholder */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-kaleo-terracotta/20 to-kaleo-terracotta/5 border-2 border-kaleo-terracotta/20 flex items-center justify-center group-hover:border-kaleo-terracotta/40 transition-colors">
                    <Icon className="w-12 h-12 md:w-16 md:h-16 text-kaleo-terracotta/40" />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-full border border-kaleo-terracotta/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <h3 className="font-display text-xl md:text-2xl text-kaleo-earth mb-2">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-kaleo-terracotta mb-4">
                  {member.role}
                </p>
                <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed max-w-xs mx-auto">
                  {member.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;

// Site-wide configuration
export interface SiteConfig {
  language: string;
  siteName: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "es",
  siteName: "Casa Aramara",
  siteDescription: "Casa de partos humanizada en Guadalajara, Jalisco. Parto en agua, atención prenatal, asesoría de lactancia y acompañamiento integral para mamás y familias.",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  backgroundAlt: "Mujer embarazada junto al mar al atardecer, conexión espiritual con el agua",
  title: "Casa Aramara",
  subtitle: "PARTO EN AGUA",
};

// Narrative Text Section - ¿Por qué Aramara?
export interface NarrativeTextConfig {
  line1: string;
  line2: string;
  line3: string;
}

export const narrativeTextConfig: NarrativeTextConfig = {
  line1: "¿Por qué Aramara?",
  line2: "Aramara, nuestra Madre, el mar, en la cultura wixarika (huichol), es donde inicia la vida.",
  line3: "Para la cultura wixarika, el mar es el origen de todo cuanto existe, es fuente de toda vida. Y es aquí, en este espacio, donde llega la vida, donde se da la transformación a la maternidad, donde se da origen a la nueva familia. Casa Aramara es un espacio que ofrece a las mujeres y sus familias dar la bienvenida a sus bebés en un ambiente tranquilo, seguro y adaptado a sus necesidades. Seguimos los principios de atención del parto en casa y la filosofía del modelo de partería. Acompañamos a las mujeres en las etapas del embarazo, parto y posparto. Buscamos que las mamás y sus familias se sientan cómodas, tranquilas, en confianza y seguras para que el trabajo de parto y el nacimiento fluyan con los ritmos que la naturaleza marca.",
};

// Breath Section - Misión y Visión
export interface BreathSectionConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const breathSectionConfig: BreathSectionConfig = {
  backgroundImage: "/breath-bg.jpg",
  backgroundAlt: "Pareja en tina de parto, ambiente sereno y acogedor",
  title: "Acerca de Nosotras",
  subtitle: "NUESTRA ESENCIA",
  description: `Misión: Ser una opción para las mujeres que buscan parir fuera del ambiente hospitalario, recibiendo una atención centrada en ellas y sus necesidades.

Visión: Lograr que cada vez más mujeres y familias estén bien informadas sobre las opciones que tienen para parir, así como que el parto en casa, atendido por parteras, sea reconocido y aceptado socialmente como una opción segura.

El equipo de Casa Aramara está integrado por parteras profesionales, convencidas de la capacidad que tenemos las mujeres para parir y de la importancia de darle a los bebés una bienvenida llena de amor y respeto.`,
};

// Card Stack Section - Servicios Principales
export interface CardStackItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rotation: number;
}

export interface CardStackConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: CardStackItem[];
}

export const cardStackConfig: CardStackConfig = {
  sectionTitle: "Nuestros Servicios",
  sectionSubtitle: "ACOMPAÑAMIENTO INTEGRAL",
  cards: [
    {
      id: 1,
      image: "/card-consultas.jpg",
      title: "Consultas Prenatales",
      description: "Con un enfoque holístico e integral acompañamos el embarazo con consultas prenatales una vez al mes hasta la semana 36 de gestación, después cada 15 días hasta la semana 40 y después cada semana o más, según sea necesario. En las consultas prenatales hacemos una revisión de los signos vitales de mamá; revisamos a bebé escuchando su corazón, estimando su crecimiento, y resolvemos dudas, preocupaciones, miedos que se tengan.",
      rotation: -2,
    },
    {
      id: 2,
      image: "/card-parto-agua.jpg",
      title: "Parto en Agua",
      description: "El agua caliente la consideramos una herramienta para el manejo del dolor, es por esto que siempre nos gusta tener la opción de una tina con agua caliente. Si la mamá así lo desea, puede entrar a la tina las veces y el tiempo que necesite y así mismo el bebé puede o no, nacer en agua.",
      rotation: 1,
    },
    {
      id: 3,
      image: "/card-parto-casa.jpg",
      title: "Parto en Casa",
      description: "Atención de parto a domicilio o en Casa Aramara: Estamos con la mamá desde el momento que ella lo necesite, la acompañamos durante el trabajo de parto, atendemos el parto, revisamos a bebé y nos quedamos apoyando el inicio de la lactancia y acompañando el posparto inmediato.",
      rotation: -1,
    },
  ],
};

// ZigZag Grid Section - Más Servicios
export interface ZigZagGridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface ZigZagGridConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: ZigZagGridItem[];
}

export const zigZagGridConfig: ZigZagGridConfig = {
  sectionLabel: "Servicios Complementarios",
  sectionTitle: "Cuidado Integral",
  items: [
    {
      id: "placenta",
      title: "Procesamiento de la Placenta",
      subtitle: "SACRAMENTO DE LA VIDA",
      description: "La intención es sacarle provecho a todas las ventajas y beneficios que ofrece la placenta para el posparto. Hacemos cápsulas, esencia madre, tintura madre, microdosis, crema. Impresión del árbol de la vida y atrapa sueños con cordón umbilical.",
      image: "/grid-placenta.jpg",
      imageAlt: "Espacio sagrado para procesamiento de placenta",
      reverse: false,
    },
    {
      id: "masajes",
      title: "Masajes con Rebozo",
      subtitle: "TRADICIÓN MEXICANA",
      description: "Masaje relajante para disminuir el estrés que vamos acumulando día con día. También usamos varias técnicas con el rebozo para ayudar a que el bebé se vaya acomodando de la mejor manera, aliviar malestares en la espalda y en el pubis y reducir las molestias comunes del final del embarazo.",
      image: "/grid-masajes.jpg",
      imageAlt: "Masaje tradicional mexicano con rebozo",
      reverse: true,
    },
    {
      id: "lactancia",
      title: "Asesoría de Lactancia",
      subtitle: "PRIMEROS MOMENTOS",
      description: "Si son complicaciones sencillas las resolvemos nosotras o si lo consideramos necesario, conectamos a las mamás con una asesora de lactancia. Siempre estamos atentas para que sea una lactancia materna exclusiva y exitosa.",
      image: "/grid-lactancia.jpg",
      imageAlt: "Asesoría de lactancia materna",
      reverse: false,
    },
    {
      id: "posparto",
      title: "Masaje Postparto y Cierre de Cadera",
      subtitle: "RECUPERACIÓN",
      description: "Combinando técnicas de la partería tradicional mexicana, terapia cráneo-sacral, polarity y ventosas, ofrecemos a la mamá en su posparto tardío un rato de apapacho y recuperación para su cuerpo.",
      image: "/card-consultas.jpg",
      imageAlt: "Masaje postparto y cierre de cadera",
      reverse: true,
    },
  ],
};

// Footer Section
export interface FooterContactItem {
  type: "email" | "phone";
  label: string;
  value: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  description: string;
  ctaText: string;
  contact: FooterContactItem[];
  locationLabel: string;
  address: string[];
  socialLabel: string;
  socials: FooterSocialItem[];
  logoText: string;
  copyright: string;
  links: { label: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  heading: "Bienvenida a la Vida",
  description: "En Casa Aramara creemos en el poder de las mujeres para parir y en la importancia de darle a los bebés una bienvenida llena de amor y respeto. Contáctanos para agendar tu consulta gratuita.",
  ctaText: "Agenda tu Consulta Gratuita",
  contact: [
    {
      type: "phone",
      label: "33 1605 7476",
      value: "33 1605 7476",
      href: "tel:3316057476",
    },
    {
      type: "email",
      label: "info@casaaramara.com.mx",
      value: "info@casaaramara.com.mx",
      href: "mailto:info@casaaramara.com.mx",
    },
  ],
  locationLabel: "Ubicación",
  address: [
    "Calle Cruz Verde #69",
    "Colonia Centro",
    "Guadalajara, Jalisco, México",
  ],
  socialLabel: "Síguenos",
  socials: [
    {
      platform: "facebook",
      href: "https://facebook.com/casaaramara",
    },
  ],
  logoText: "Casa Aramara",
  copyright: "© 2024 Casa Aramara. Todos los derechos reservados.",
  links: [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotras", href: "#nosotras" },
    { label: "Servicios", href: "#servicios" },
    { label: "Contacto", href: "#contacto" },
  ],
};

// Testimonials Section
export interface TestimonialItem {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  author: string;
}

export interface TestimonialsConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  sectionTitle: "Testimonios",
  sectionSubtitle: "HISTORIAS DE AMOR",
  testimonials: [
    {
      id: 1,
      title: "Paulina y Colin",
      subtitle: "Hola Sam",
      content: `Cuando mi novio y yo decidimos embarazarnos, no teníamos idea de que estábamos a punto de entrar en un mundo totalmente desconocido. Yo sabía que quería tener un parto vaginal y siempre pensé que sería en un hospital y con anestesia.

Cuando supimos que teníamos ya un bebé en camino, empezamos a leer sobre embarazos y partos. Compramos libros, vimos documentales, investigamos en internet... Y comenzamos a enamorarnos de la idea de tener a nuestro hijo de la forma más natural posible. Queríamos poder ser partícipes del nacimiento de nuestro bebé, no solo espectadores.

Encontramos una dula en internet que nos recomendó con María en Casa Aramara. Hicimos una cita con ella para conocernos y el clic fue inmediato. No tuvimos que pensarlo dos veces. En ese momento decidimos que nuestro bebé nacería en Casa Aramara. A lo largo de los 6 meses que me quedaban de embarazo, nos atendieron María y Francesca. El trato que recibimos fue hermoso. Humano. Contaba los días del mes para ir a verlas. No solo se preocuparon por saber si tenía un embarazo sano (lo cual hacen a la perfección). Se preocuparon por saber si lo estaba disfrutando. Se dieron el tiempo de conocernos a mí y a mi novio. Se preocuparon por nuestra relación de pareja. Era como una terapia cada vez que las veíamos.

Cuando el día finalmente llegó, fue como estar con las dos amigas en las que más confías en el mundo. Siempre con una sonrisa, siempre amables, siempre pacientes, siempre escuchándonos… Y siempre fuertes, decididas y conocedoras. Gracias a su fortaleza no me rendí en mis 18 horas de labor de parto. Estuvieron presentes en cada contracción. Siempre me dijeron que sí podía hacerlo aún cuando yo llegué a sentir que no lo lograría. Me guiaron a mí y guiaron a mi novio. Nos guiaron a los dos y permitieron que juntos ayudáramos a nuestro hijo a nacer. Fue todo lo que yo planeé para ese momento. Y ellas se aseguraron de que fuera perfecto.

Sam ya tiene un año y medio. Súper sano y feliz. Otra vez, gracias chicas. Paulina, Colin y Sam.`,
      author: "Paulina, Colin y Sam",
    },
    {
      id: 2,
      title: "Marisol y Carlos",
      subtitle: "Hola Violeta",
      content: `La Llegada de Violeta:

Hacía varias horas que el trabajo de parto se había vuelto muy intenso, unas 3 o 4 tal vez, y yo estaba ya dentro de la tina. Al llegar a Casa Aramara, unas horas más temprano, parecía que se alejaba un poco. "No te preocupes, es normal: la salida de tu casa, llegar aquí con más personas.. ahorita se meten al cuarto y se relajan, no hay prisa, todo pasará cuando tenga que pasar", dijo María. Y así fue, nomás quedarnos solos en el cuarto las contracciones regresaron y se fueron haciendo cada vez más fuertes.

Carlos guió una meditación muy linda sobre abrirse a recibir la vida, que sirvió como un puente hacia ese estado de conciencia y conexión irracional que sólo he experimentado durante mi parto anterior y en este. Mientras me preparaba y emprendía el viaje, escuchaba las palabras de Carlos y sentía las manitas de Itzam acariciarme en cada contracción. Después, todo fue una danza de movimientos y sensaciones. Lupita y Franchis me ayudaban a que estuviera más cómoda con masajes, apapachos, a veces palabras: "Cuando venga la contracción apoya fuerte tus pies en el suelo", "esa pancita ya está muy abajo!, falta poco".

Sólo entrar en el agua y vino una contracción fuertísima. Se rompió la fuente y esto dio paso a una etapa aún más intensa. Cuerda, gatear, respirar, gritar, respirar. Es como estar en medio de un maremoto sin más hacer que dejarse llevar. "Toca su cabeza cómo va bajando", me dijo María. Toqué y la cabeza se sentía aún bien arriba. "¡No puede seeer!", pensé. En ese momento el maremoto se volvió calma y claridad, y toda la energía, la conciencia, la fuerza y el amor se enfocaron en el canal de parto, esa cabecita tenía que bajar.

Otra contracción. Pujo con todas mis fuerzas y siento claramente cómo empiezan a abrirse mis huesos. Respirar. Contracción, de nuevo todas las fuerzas con plena conciencia física y mental de a dónde se dirigía ese esfuerzo. Los huesos se siguen abriendo y la cabeza empieza a bajar. Ahora sí calma, calma.. Suave, ya viene. "Ya vieneee", dije. "Itzaaam, Caarlos!". De rodillas, Lupita se acerca y vemos cómo empieza a salir la cabecita. La acaricio, qué tacto más increíble tiene (aún guardo perfectamente en mi mano la memoria de ese tacto, esa sensación suave y alucinante de estar tocando a mi niña, por fin). Carlos ya está en el agua y el cuerpecito termina de salir. La abrazo, la abrazamos, ¡no puedo creerlo!

Es indescriptible ese primer abrazo, porque no hay una sola palabra que contenga tanto agradecimiento y tanto amor. Ella hace sentir su llegada, ¡qué pulmones!, pero después se agarra del pecho y simplemente nos quedamos en un abrazo sin tiempo. Sale la placenta y su papá corta el cordón. Violeta fue incubada en el pecho de su papá y después en el de su hermano, mientras las sabias y amorosas parteras terminaban de cuidar que yo estuviera bien.`,
      author: "Marisol, Carlos, Itzam y Violeta",
    },
    {
      id: 3,
      title: "Iris y Fer",
      subtitle: "Hola Bruno",
      content: `Enterarnos que esperábamos a Bruno, fue la noticia más increíble de nuestra vida, así que a partir de ese momento destinamos todo nuestro amor, nuestro esfuerzo, nuestras energías y nuestra vida en él. Ello comprendía por supuesto buscar la mejor atención para supervisar su crecimiento y su llegada. Comenzamos la atención con un ginecólogo tradicional, en nuestro pensamiento creímos que, como todos, ir con un médico a un hospital era nuestra mejor opción, la más segura por cualquier complicación pero nuestro corazón en gestación de ser papás nos decía que debíamos confiar, creer y caminar seguros de que sería un embarazo sano, fabuloso e increíble.

Así que contactamos a Casa Aramara donde María y Francesca, se convirtieron en nuestras parteras estrellas y en esas guías amorosas de esta maravillosa aventura, al conocer a estas dos GRANDES MUJERES no teníamos ni idea de lo especiales que serían para nuestra vida, su amor y pasión por su trabajo, nos llevó a recorrer los mejores meses de nuestra vida durante esta dulce espera.

Nos enseñaron a afrontar con valor y paciencia ideas y comentarios poco alentadores, la información nos empoderó para confirmar lo que ya nuestro corazón nos había dictado, caminar hacia un parto humanizado, sin intervenciones médicas, conociendo mi cuerpo y conectándonos con Bruno desde esas pocas semanas, creó en nosotros un ambiente de armonía, seguridad y confianza en lo que vendría.

Lo esperábamos con tantas ansias y aun así se sentía tan irreal. Finalmente, después de 40 semanas y 6 días nuestra cita más importante había llegado, Bruno rompió con todos nuestro planes y expectativas, aun recordamos que en cada cita María y Francesca nos decían, esperamos que Bruno nos diga donde decide nacer, y nosotros solo sonreíamos creyendo que todo sería como lo habíamos planeado, sentir esas contracciones, tomar las maletas y llegar a Casa Aramara… Pero no fue así al final del camino, ni siquiera fue en una casa de partos, sino que sucedió lo más maravilloso de nuestra vida, BRUNO NACIENDO EN CASA.

La información que nos brindaron generó un ambiente propicio para el nacimiento de Bruno, mi esposo la mejor compañía, valiente y empoderado sosteniéndome con amor en cada contracción que nos avisaba que Bruno se acercaba, se sentía un verdadero trabajo en equipo, aunque dice que al ver llegar a María y Francesca sintió como su adrenalina se bajó y derramó lágrimas, cabe señalar que realizó un trabajo increíble a mi lado hasta el final… después de esas horas de labor de parto Bruno llegó a nuestros brazos a cambiar nuestra vida para siempre, no puedo poner en palabras las mil cosas que sentí al mirarlo por primera vez, muero de felicidad y de amor.

En un ambiente de amor, de respeto, de confianza y armonía Bruno es 3.100 kilos de pura ternura y súper saludable. Vino a hacer mejor nuestro mundo, hoy seguimos confirmando que tomamos la mejor decisión... y que tenerlas en el equipo hizo del trabajo algo fenomenal... Parir en casa nos enseñó lo maravilloso que Dios hizo en nosotras como mujeres, en el proceso natural de dejar que todo tome su propio curso, de saber que Dios tiene el control perfecto de ese pequeño bebé y que sobre todo nos creó tan perfectas capaces de parir y dar vida.`,
      author: "Iris, Fer y Bruno",
    },
    {
      id: 4,
      title: "Mary y Gil",
      subtitle: "Hola Luciana",
      content: `Hace un año que mi hija menor Luciana nació, poco antes de que se acercara mi fecha de parto y después de una larga búsqueda de lugares donde tuvieran una ética de parto más humanizado, por suerte di con Casa Aramara, las consultas fueron algo apresuradas ya que me encontraba comenzando el tercer trimestre de embarazo, en ellas nos percatamos de que mi bebé se encontraba de pies me dieron consejos de posiciones y ejercicios para ayudar a que mi bebé adquiriera la posición adecuada, el día en que mis contracciones comenzaron mi nena aún seguía en la misma posición así que para no arriesgarnos María y Francesca me aconsejaron ir a un hospital en lugar de parir en casa; a toda prisa se contactaron con la ginecóloga Mónica y con un pediatra neonatal, ya que tenía apenas 36 semanas de gestación.

Desde que les avisé de mis contracciones estuvieron totalmente al pendiente de nosotras y siempre a mi lado, me transmitieron mucha tranquilidad y confianza. Pese a la posición de mi bebé decidimos continuar con el plan de parto natural, mi bebé nació completamente bien y sin ninguna complicación durante el parto, desde que mi bebé nació no la separaron ni un minuto de mi lado, salí del quirófano con mi bebé en brazos, estoy sumamente agradecida con María y Francesca por darme la tranquilidad para confiar en mi bebé, en mi cuerpo y en mí para lograr un parto tan relajado y sobre todo natural ya que estoy 100% segura que si hubiese sido con alguno de los ginecólogos con los que me he atendido me hubieran realizado una cesaría por los riesgos de la posición de mi nena.

No me queda más que agradecer infinitamente a Casa Aramara por darnos un lugar donde con respeto y amor, somos las mamás las protagonistas de nuestros partos, no pude haber estado nunca en mejores manos. Gracias totales!`,
      author: "Mary, Gil y Luciana",
    },
  ],
};

// Team Section
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  icon: string;
}

export interface TeamConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  description: string;
  members: TeamMember[];
}

export const teamConfig: TeamConfig = {
  sectionTitle: "Nuestro Equipo",
  sectionSubtitle: "PARteras PROFESIONALES",
  description: "El equipo de Casa Aramara está integrado por parteras profesionales, convencidas de la capacidad que tenemos las mujeres para parir y de la importancia de darle a los bebés una bienvenida llena de amor y respeto.",
  members: [
    {
      id: 1,
      name: "Miriam Padilla",
      role: "Partera Profesional",
      description: "Comprometida con el acompañamiento respetuoso y amoroso de cada familia durante el proceso de gestación, parto y posparto.",
      icon: "heart",
    },
    {
      id: 2,
      name: "María Cortés",
      role: "Partera Profesional",
      description: "Apasionada por el parto humanizado y la atención centrada en las necesidades de cada mamá y su familia.",
      icon: "sparkles",
    },
    {
      id: 3,
      name: "Diana Toscano",
      role: "Partera Profesional",
      description: "Dedicada a brindar apoyo integral y crear espacios seguros donde las mujeres puedan vivir su maternidad con confianza.",
      icon: "flower",
    },
  ],
};

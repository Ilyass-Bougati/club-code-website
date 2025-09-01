import { News } from "@/types/backendTypes";

export const news: News[] = [
  {
    id: "1",
    title: "Hackathon Universitaire 2025",
    description:
      "Le club organise son hackathon annuel, un événement phare qui rassemble des étudiants passionnés de développement, de design et d’innovation. Pendant 48 heures, les participants auront l’occasion de travailler en équipe pour concevoir des solutions technologiques répondant à des problématiques réelles proposées par nos partenaires. Des mentors seront disponibles pour accompagner les étudiants, et des ateliers parallèles seront organisés pour renforcer leurs compétences. Des prix attractifs, des opportunités de networking et des recrutements potentiels par nos sponsors sont également au programme.",
    image: { uri: "/about.svg", host: "CLOUDINARY" },
    type: "HACKATHON",
    publishedAt: new Date("2025-09-01"),
  },
  {
    id: "2",
    title: "Formation Git & GitHub",
    description:
      "Cette formation est destinée aux étudiants qui souhaitent maîtriser les bases du versionnement de code avec Git et la collaboration via GitHub. Les participants apprendront à créer des dépôts, gérer des branches, résoudre des conflits et contribuer efficacement à des projets collaboratifs. L’objectif est de rendre les étudiants autonomes sur des outils utilisés par toutes les grandes entreprises tech. Un atelier pratique est prévu avec un projet open-source pour mettre en application les connaissances acquises.",
    image: { uri: "/test/test-image.jpg", host: "CLOUDINARY" },
    type: "TRAINING",
    publishedAt: new Date("2025-09-03"),
  },
  {
    id: "3",
    title: "Inscription annuelle 2025-2026",
    description:
      "Les inscriptions pour rejoindre le club sont désormais ouvertes pour l’année universitaire 2025-2026. Tous les étudiants intéressés par les nouvelles technologies, la programmation, le design ou simplement l’envie d’apprendre en communauté sont les bienvenus. Rejoindre le club, c’est bénéficier de formations gratuites, participer à des compétitions prestigieuses et développer un réseau académique et professionnel solide. Le processus d’inscription se fait en ligne via un formulaire, suivi d’une courte rencontre pour découvrir les nouveaux membres.",
    image: { uri: "/images/registration.jpg", host: "CLOUDINARY" },
    type: "REGISTRATION",
    publishedAt: new Date("2025-09-05"),
  },
  {
    id: "4",
    title: "Compétition d’Algorithmique",
    description:
      "Cette compétition interne est conçue pour tester et améliorer les compétences des étudiants en résolution de problèmes algorithmiques. Les participants devront relever une série de défis chronométrés couvrant des thématiques comme les structures de données, la programmation dynamique et les graphes. L’objectif est de préparer les étudiants aux concours internationaux tels que ICPC et Google Code Jam. Les meilleurs se verront récompensés et auront la possibilité de représenter l’université dans des compétitions inter-établissements.",
    image: { uri: "/images/algorithm.jpg", host: "CLOUDINARY" },
    type: "COMPETITION",
    publishedAt: new Date("2025-09-07"),
  },
  {
    id: "5",
    title: "Réunion de Bienvenue des Nouveaux Membres",
    description:
      "Afin d’accueillir les nouveaux adhérents, le club organise une réunion de bienvenue conviviale. Cet événement permettra de présenter l’équipe dirigeante, le programme de l’année ainsi que les différents pôles du club (développement, design, IA, communication). C’est également une opportunité pour les étudiants de poser des questions, de rencontrer les anciens membres et de s’intégrer rapidement dans la communauté. Un petit buffet sera offert à la fin de la rencontre pour favoriser les échanges informels.",
    image: { uri: "/images/welcome.jpg", host: "CLOUDINARY" },
    type: "ANNOUNCEMENT",
    publishedAt: new Date("2025-09-09"),
  },
  {
    id: "6",
    title: "Atelier Introduction à l’Intelligence Artificielle",
    description:
      "Dans cet atelier, les étudiants auront un premier contact pratique avec l’intelligence artificielle. Nous aborderons les bases de l’apprentissage supervisé et non supervisé, l’utilisation de bibliothèques comme TensorFlow et PyTorch, ainsi que des cas concrets tels que la classification d’images ou la détection de sentiments. L’atelier est accessible à tous, même sans connaissances préalables, et sera animé par des étudiants avancés ainsi que des intervenants extérieurs issus du monde professionnel.",
    image: { uri: "/images/ai-training.jpg", host: "CLOUDINARY" },
    type: "TRAINING",
    publishedAt: new Date("2025-09-11"),
  },
  {
    id: "7",
    title: "Mini-Hackathon Frontend",
    description:
      "Cet événement de 12 heures est spécialement conçu pour les passionnés du développement web et du design d’interfaces. Les équipes devront réaliser une application frontend complète répondant à une problématique donnée, en utilisant des frameworks modernes tels que React ou Next.js. L’accent sera mis sur l’expérience utilisateur, la créativité et la qualité du code. C’est une excellente opportunité pour pratiquer en conditions réelles et recevoir des feedbacks constructifs de la part de mentors expérimentés.",
    image: { uri: "/images/frontend-hackathon.jpg", host: "CLOUDINARY" },
    type: "HACKATHON",
    publishedAt: new Date("2025-09-13"),
  },
  {
    id: "8",
    title: "Workshop CyberSécurité",
    description:
      "La cybersécurité étant devenue un enjeu majeur, le club propose un atelier pratique pour sensibiliser les étudiants aux bonnes pratiques de protection des systèmes et des données. Le programme inclura l’étude des attaques courantes (SQL injection, XSS, phishing), la mise en place de mesures de sécurité, ainsi que des exercices de type Capture The Flag (CTF). Cet atelier vise à donner aux étudiants des réflexes solides pour sécuriser leurs projets et mieux comprendre les défis de la sécurité informatique.",
    image: { uri: "/images/cybersecurity.jpg", host: "CLOUDINARY" },
    type: "TRAINING",
    publishedAt: new Date("2025-09-15"),
  },
  {
    id: "9",
    title: "Tournoi de Programmation Inter-Universitaire",
    description:
      "Le club participera à un tournoi régional regroupant plusieurs universités. Cet événement représente une opportunité unique pour nos étudiants de se mesurer à d’autres talents, d’échanger des connaissances et de développer un esprit de compétition sain. Les épreuves couvriront divers langages et concepts algorithmiques. L’université prévoit également un stand de présentation de projets étudiants afin de mettre en valeur les initiatives et la créativité de nos membres.",
    image: { uri: "/images/programming-contest.jpg", host: "CLOUDINARY" },
    type: "COMPETITION",
    publishedAt: new Date("2025-09-18"),
  },
  {
    id: "10",
    title: "Annonce : Lancement du Site Officiel du Club",
    description:
      "Nous sommes heureux d’annoncer le lancement du nouveau site web officiel du club. Ce site sera la plateforme principale de communication avec nos membres et le grand public. Il regroupera toutes les actualités, les événements à venir, les inscriptions, ainsi qu’une présentation de l’équipe dirigeante. Les étudiants pourront consulter un calendrier interactif, télécharger des ressources, et s’inscrire directement aux formations et compétitions. Ce projet a été entièrement conçu par les membres du club, démontrant nos compétences en développement web et gestion de projet.",
    image: { uri: "/images/website-launch.jpg", host: "CLOUDINARY" },
    type: "ANNOUNCEMENT",
    publishedAt: new Date("2025-09-20"),
  },
];

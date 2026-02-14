import { commands } from "../data/commands";
import { blogArticles } from "../data/blogPublished";
import { codingQuotes } from "../data/codingQuotes";

export const commandHandlers = {
  help: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║          AVAILABLE COMMANDS                ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    Object.entries(commands).forEach(([cmd, desc]) => {
      output.push({ text: `  ${cmd.padEnd(12)} - ${desc}`, type: "system" });
    });
    return output;
  },

  about: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║               ABOUT ME                     ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "/**", type: "comment" });
    output.push({
      text: " * Full-stack developer passionate about building",
      type: "comment",
    });
    output.push({
      text: " * elegant solutions to complex problems.",
      type: "comment",
    });
    output.push({ text: " * ", type: "comment" });
    output.push({
      text: " * Currently focused on React, Next.js, and Node.js",
      type: "comment",
    });
    output.push({
      text: " * Love clean code, great UX, and coffee ☕",
      type: "comment",
    });
    output.push({ text: " * ", type: "comment" });
    output.push({
      text: " * Based in Kolkata, India",
      type: "comment",
    });
    output.push({ text: " */", type: "comment" });
    return output;
  },

  skills: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║           TECHNICAL SKILLS                 ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({ text: "  Frontend:", type: "skill-category" });
    output.push({
      text: "    React, Next.js, TypeScript, Tailwind CSS",
      type: "system",
    });
    output.push({
      text: "    Vue.js, Redux, React Query, Framer Motion",
      type: "system",
    });
    output.push({ text: "", type: "system" });
    output.push({ text: "  Backend:", type: "skill-category" });
    output.push({
      text: "    Node.js, Express, NestJS, GraphQL",
      type: "system",
    });
    output.push({ text: "    Python, Django, FastAPI", type: "system" });
    output.push({ text: "", type: "system" });
    output.push({ text: "  Database:", type: "skill-category" });
    output.push({
      text: "    MongoDB, PostgreSQL, MySQL, Redis",
      type: "system",
    });
    output.push({ text: "    Prisma, DrizzzleORM, Mongoose", type: "system" });
    output.push({ text: "", type: "system" });
    output.push({ text: "  Tools:", type: "skill-category" });
    output.push({
      text: "    Git, Docker, AWS, Vercel",
      type: "system",
    });
    output.push({ text: "    Webpack, Vite, Jest, Cypress", type: "system" });
    output.push({ text: "", type: "system" });
    output.push({ text: "  OS & Others:", type: "skill-category" });
    output.push({ text: "    Linux, Windows", type: "system" });
    output.push({
      text: "    CI/CD, REST APIs, WebSockets",
      type: "system",
    });
    return output;
  },

  contact: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║            CONTACT INFO                    ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({
      text: "  📧 Email:    kumarayanatwork@gmail.com",
      type: "system",
    });
    output.push({
      text: "  🐙 GitHub:   https://github.com/devlife15",
      type: "system",
    });
    output.push({
      text: "  💼 LinkedIn: https://www.linkedin.com/in/ayankumar15/",
      type: "system",
    });
    output.push({ text: "  🐦 Twitter:  @kumarayan990", type: "system" });
    output.push({ text: "", type: "system" });
    output.push({
      text: "  Feel free to reach out for collaborations!",
      type: "system",
    });
    return output;
  },

  whoami: () => {
    const output = [];
    output.push({ text: "user@portfolio", type: "system" });
    output.push({
      text: "Role: Full-Stack Developer & Creative Technologist",
      type: "system",
    });
    output.push({
      text: "Status: Available for opportunities",
      type: "system",
    });
    output.push({
      text: "Passion: Building amazing web experiences",
      type: "system",
    });
    return output;
  },

  blogs: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║            MY BLOGS                ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({ text: "Click on any article to open:", type: "system" });
    output.push({ text: "", type: "system" });

    blogArticles.forEach((article, index) => {
      output.push({
        text: `  ${index + 1}. ${article.title}`,
        type: "blog-clickable",
        url: article.url,
        index: index,
      });
    });
    return output;
  },

  articles: () => commandHandlers.blogs(), // Alias for blogs

  spotify: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║         NOW PLAYING ON SPOTIFY             ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({ text: "  🎵 Track: Blinding Lights", type: "spotify" });
    output.push({ text: "  🎤 Artist: The Weeknd", type: "spotify" });
    output.push({ text: "  💿 Album: After Hours", type: "spotify" });
    output.push({ text: "", type: "system" });
    output.push({
      text: "  ▶️  Playing... [████████░░] 3:24 / 4:20",
      type: "spotify",
    });
    return output;
  },

  music: () => commandHandlers.spotify(), // Alias for spotify

  meme: (_, context) => {
    const randomMeme =
      context.programmingMemes[
        Math.floor(Math.random() * context.programmingMemes.length)
      ];

    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║         PROGRAMMING MEME                   ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({
      type: "meme-image",
      imageUrl: randomMeme,
    });

    return output;
  },

  coffee: () => {
    const output = [];
    output.push({ text: "", type: "system" });
    output.push({ text: "      ( (", type: "ascii-art" });
    output.push({ text: "       ) )", type: "ascii-art" });
    output.push({ text: "    ........", type: "ascii-art" });
    output.push({ text: "    |      |]", type: "ascii-art" });
    output.push({ text: "    \\      /", type: "ascii-art" });
    output.push({ text: "     `----'", type: "ascii-art" });
    output.push({ text: "", type: "system" });
    output.push({ text: "  ☕ Coffee is brewing...", type: "system" });
    output.push({ text: "  Perfect fuel for coding!", type: "system" });
    return output;
  },

  weather: () => {
    const output = [];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║          CURRENT WEATHER                   ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({
      text: "  📍 Location: Purulia, West Bengal",
      type: "system",
    });
    output.push({ text: "  🌡️  Temperature: 20°C", type: "system" });
    output.push({ text: "  ☁️  Condition: Partly Cloudy", type: "system" });
    output.push({ text: "  💨 Wind: 14 km/h NE", type: "system" });
    output.push({ text: "  💧 Humidity: 37%", type: "system" });
    output.push({ text: "", type: "system" });
    output.push({ text: "  Perfect weather for coding! ☀️", type: "system" });
    return output;
  },

  quote: () => {
    const output = [];
    const randomQuote =
      codingQuotes[Math.floor(Math.random() * codingQuotes.length)];
    output.push({
      text: "╔════════════════════════════════════════════╗",
      type: "system-border",
    });
    output.push({
      text: "║         CODING WISDOM                      ║",
      type: "system-header",
    });
    output.push({
      text: "╚════════════════════════════════════════════╝",
      type: "system-border",
    });
    output.push({ text: "", type: "system" });
    output.push({ text: `  ${randomQuote}`, type: "quote" });
    output.push({ text: "", type: "system" });
    return output;
  },

  greet: (_, { petVisible, setPetMessage }) => {
    const output = [];
    if (!petVisible) {
      output.push({
        text: "The cat has been dismissed. It will return next time you visit!",
        type: "system",
      });
    } else {
      setPetMessage("Meow! 😸");
      setTimeout(() => setPetMessage(""), 3000);
      output.push({ text: "🐱 *purrs happily*", type: "system" });
      output.push({ text: "Your cat greets you back!", type: "system" });
    }
    return output;
  },

  treat: (_, { petVisible, setPetMood, setLastFed, setPetMessage }) => {
    const output = [];
    if (!petVisible) {
      output.push({
        text: 'You don\'t have a pet yet! Type "adopt" first.',
        type: "error",
      });
    } else {
      setPetMood("happy");
      setLastFed(Date.now());
      setPetMessage("Yummy! 😋");
      setTimeout(() => setPetMessage(""), 3000);
      output.push({ text: "🐱 *nom nom nom*", type: "system" });
      output.push({ text: "Your cat is happy and well-fed!", type: "system" });
    }
    return output;
  },

  pet: (_, { petVisible, petMood, lastFed }) => {
    const output = [];
    if (!petVisible) {
      output.push({
        text: 'You don\'t have a pet yet! Type "adopt" first.',
        type: "error",
      });
    } else {
      output.push({
        text: "╔════════════════════════════════════════════╗",
        type: "system-border",
      });
      output.push({
        text: "║           PET STATUS                       ║",
        type: "system-header",
      });
      output.push({
        text: "╚════════════════════════════════════════════╝",
        type: "system-border",
      });
      output.push({ text: "", type: "system" });
      output.push({
        text: `  Mood: ${petMood === "happy" ? "😸 Happy" : petMood === "hungry" ? "😿 Hungry" : "😴 Sleeping"}`,
        type: "system",
      });
      output.push({
        text: `  Position: Moving around terminal`,
        type: "system",
      });
      output.push({
        text: `  Last fed: ${Math.floor((Date.now() - lastFed) / 1000)}s ago`,
        type: "system",
      });
      output.push({ text: "", type: "system" });
      if (petMood === "hungry") {
        output.push({
          text: '  Your cat is hungry! Type "treat" to feed.',
          type: "system",
        });
      }
    }
    return output;
  },

  dismiss: (_, { petVisible, setPetVisible }) => {
    const output = [];
    if (!petVisible) {
      output.push({
        text: 'You don\'t have a pet to dismiss. Type "adopt" to get one.',
        type: "error",
      });
    } else {
      setPetVisible(false);
      output.push({
        text: '👋 Your cat has left the terminal. Type "adopt" to bring it back!',
        type: "system",
      });
    }
    return output;
  },

  clear: (_, { setCommandHistory }) => {
    setCommandHistory([]);
    return null;
  },
};

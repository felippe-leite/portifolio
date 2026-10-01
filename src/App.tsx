import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Technologies from "./components/Technologies/Technologies";
import Contact from "./components/Contact/Contact";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Certificates from "./components/Certificates/Certificates";
import Exploring from "./components/Exploring/Exploring";
import Footer from "./components/Footer/Footer";
import AstronomyBackground from "./components/AstronomyBackground/AstronomyBackground";
import { useCallback, useState } from "react";
import BlackHoleIntro from "./components/BlackHoleIntro/BlackHoleIntro";
import { rememberIntro, shouldShowIntro } from "./components/BlackHoleIntro/introSession";

function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const finishIntro = useCallback(() => {
    rememberIntro();
    setShowIntro(false);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-page p-4 text-foreground md:p-8">
      {showIntro && <BlackHoleIntro onComplete={finishIntro} />}
      <AstronomyBackground />

      <main className="relative z-10" inert={showIntro} aria-hidden={showIntro || undefined}>
        <div
          className="
            mx-auto
            max-w-6xl
            space-y-20
            rounded-lg
            border
            border-line/20
            bg-panel/85
            px-4
            py-8
            md:px-8
          "
        >
          <Navbar />

          <Hero
            name="Felippe Leite"
            description="hero.description"
            github="https://github.com/felippe-leite"
            linkedin="https://www.linkedin.com/in/felippeleite27/"
            resume="/curriculo.pdf"
          />

          <About />

          <Experience />

          <Projects />

          <Education />

          <Certificates />

          <Technologies />

          <Exploring />

          <Contact />

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;

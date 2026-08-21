import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Technologies from "./components/Technologies/Technologies";
import Contact from "./components/Contact/Contact";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Exploring from "./components/Exploring/Exploring";
import Footer from "./components/Footer/Footer";
import AstronomyBackground from "./components/AstronomyBackground/AstronomyBackground";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080808] p-4 text-white md:p-8">
      <AstronomyBackground />

      <main className="relative z-10">
        <div
          className="
            mx-auto
            max-w-6xl
            space-y-20
            rounded-lg
            border
            border-white/20
            bg-[#0d0d0d]
            px-4
            py-8
            md:px-8
          "
        >
          <Navbar />

          <Hero
            name="Felippe Leite"
            description="Construindo aplicações robustas, escaláveis e eficientes com Java, Spring Boot e boas práticas de engenharia de software."
            github="https://github.com/felippe-leite"
            linkedin="https://www.linkedin.com/in/felippeleite27/"
            resume="/cv.pdf"
          />

          <About />

          <Experience />

          <Education />

          <Projects />

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
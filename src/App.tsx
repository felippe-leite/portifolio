import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Technologies from "./components/Technologies/Technologies";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <main
      className="
        min-h-screen
        bg-[#080808]
        bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)]
        bg-[length:16px_16px]
        p-4
        text-white
        md:p-8
      "
    >
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
          role="Backend Developer"
          description="Construindo aplicações robustas, escaláveis e eficientes com Java, Spring Boot e boas práticas de engenharia de software."
        />

        <About />

        <Projects />

        <Technologies />

        <Contact />
      </div>
    </main>
  );
}

export default App;
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-20">
        <Navbar />

        <Hero
          name="Felippe Leite"
          role="Backend Developer"
          description="Construindo aplicações robustas, escaláveis e eficientes com Java, Spring Boot e boas práticas de engenharia de software."
        />

        <About />

        <Projects />
      </div>
    </>
  );
}

export default App;
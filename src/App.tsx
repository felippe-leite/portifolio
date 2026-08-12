import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
function App() {
  return (
    <>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
      <h1 className="text-4xl font-bold">
        Hello world!
      </h1>
      <Navbar />

      <Hero name="Felippe Leite" role="Backend Developer" />

      <Projects />

      </div>
    </>
  );
}

export default App;

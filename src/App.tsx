import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ProjectCard from "./components/ProjectCard/ProjectCard";
function App() {
  return (
    <>
      <Navbar />

      <ProjectCard />
      <Hero name="Felippe Leite" role="Backend Developer" />
    </>
  );
}

export default App;

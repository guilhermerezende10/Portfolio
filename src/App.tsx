import { SiteProvider } from "./context/SiteContext";
import { useSiteAnimations } from "./hooks/useSiteAnimations";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsMarquee from "./components/SkillsMarquee";
import Statement from "./components/Statement";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

function Site() {
  useSiteAnimations();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Statement />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <Site />
    </SiteProvider>
  );
}

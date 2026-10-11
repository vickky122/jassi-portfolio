import { Frame } from "@/components/Frame";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Cases } from "@/chapters/Cases";
import { Contact } from "@/chapters/Contact";
import { Craft } from "@/chapters/Craft";
import { Intro } from "@/chapters/Intro";
import { Journey } from "@/chapters/Journey";
import { Profile } from "@/chapters/Profile";
import { Recap } from "@/chapters/Recap";

export default function Home() {
  return (
    <>
      <Loader />
      <div className="grain" aria-hidden="true" />
      <Frame />
      <Nav />
      <main id="main">
        <Intro />
        <Recap />
        <Profile />
        <Journey />
        <Cases />
        <Craft />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

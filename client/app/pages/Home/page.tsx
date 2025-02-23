import Hero from "@/components/home-component/Hero";
import Layout from "./layout";
import Services from "@/components/home-component/services";
import PodcastSection from "@/components/home-component/Prodcast";
import TeamSection from "@/components/home-component/TeamSection";

import Navbar from "@/components/home-component/NavBar";

 

const HomePage = () => {
  return (
    <Layout>
      <Navbar/>
      <Hero />
      <Services />
      {/* <PodcastSection /> */}
      <TeamSection />
    </Layout>
  );
};

export default HomePage;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ClassesSection from "@/components/ClassesSection";
import ScheduleSection from "@/components/ScheduleSection";
import CoachesSection from "@/components/CoachesSection";
import MembershipsSection from "@/components/MembershipsSection";
import AragonSection from "@/components/AragonSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <ClassesSection />
      <ScheduleSection />
      <CoachesSection />
      <MembershipsSection />
      <AragonSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;

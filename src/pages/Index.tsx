import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ClassesSection from "@/components/ClassesSection";
import ScheduleSection from "@/components/ScheduleSection";
import CoachesSection from "@/components/CoachesSection";
import MembershipsSection from "@/components/MembershipsSection";
import AragonSection from "@/components/AragonSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DudasWidget from "@/components/DudasWidget";

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <DudasWidget />
      <StatsBar />
      <ClassesSection />
      <ScheduleSection />
      <CoachesSection />
      <MembershipsSection />
      <AragonSection />
      <GallerySection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;

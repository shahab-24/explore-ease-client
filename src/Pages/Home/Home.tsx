import Banner from "../../components/Banner";
import CategoryTabs from "../../components/CategoryTabs";
import OverviewSection from "./OverviewSection";
import TopDestinations from "./TopDestinations";
import TourismSection from "./TourismSection";
import HomeStoriesSection from "./HomeStoriesSection";
import DebugTourGuides from "@/components/DebugTourGuides";



const Home = () => {
  
  return (
    <div className="">
     <Banner></Banner>
     {/* <div className="my-10">
     <CategoryTabs></CategoryTabs>
     </div> */}
     <div className="my-10">
     <OverviewSection></OverviewSection>
     </div>
     <div className="my-10">
     <TourismSection></TourismSection>
     </div>
     <div className="my-10">
     <HomeStoriesSection></HomeStoriesSection>
     </div>
     <div className="my-10">
     <TopDestinations></TopDestinations>
     </div>
     <div className="my-10">
     <DebugTourGuides></DebugTourGuides>
     </div>
    


     
    </div>
  );
};

export default Home;

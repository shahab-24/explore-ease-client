import Banner from "../../components/Banner";
import CategoryTabs from "../../components/CategoryTabs";
import OverviewSection from "./OverviewSection";



const Home = () => {
  
  return (
    <div className="">
     <Banner></Banner>
     <div className="my-10">
     <CategoryTabs></CategoryTabs>
     </div>
     <div className="my-10">
     <OverviewSection></OverviewSection>
     </div>
    


     
    </div>
  );
};

export default Home;

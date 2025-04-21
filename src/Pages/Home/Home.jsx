import Banner from "../../components/Banner";
import CategoryTabs from "../../components/CategoryTabs";
import FocusInput from "../../components/FocusInput";


const Home = () => {
  
  return (
    <div className="">
     <Banner></Banner>
     <div className="my-10">
     <CategoryTabs></CategoryTabs>
     </div>
     <FocusInput></FocusInput>


     
    </div>
  );
};

export default Home;

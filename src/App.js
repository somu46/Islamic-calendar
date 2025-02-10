
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
// import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
// import { useStore } from "./Store/stateLocationStore";


function App() {
  

  
    // const {latitudeState,longitudState}=useStore();
    // console.log("LocationTracker mounted latitudeState",latitudeState);
    // console.log("LocationTracker mounted longitudState",longitudState);
  
    // console.log("Location initializer mounted");

 
  return (
    <div className="">
      <Navbar/>
        <Outlet/>
        <ScrollTop/>
      <Footer/>
    </div>
  );
}

export default App;

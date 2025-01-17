
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
// import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ScrollTop from "./Components/ScrollTop/ScrollTop";


function App() {
  

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

import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Home from "../Components/Home/Home";


const Root=()=>{
    return(
        <>
         <Navbar />
         <Home />
          <Outlet/>
          <Footer />
        </>
    );
}

export default Root;
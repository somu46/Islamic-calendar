import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import DefaultLayout from "../Components/Layout/DefaultLayout";



const Root=()=>{
    return(
        <>
         
          <DefaultLayout>
          <Outlet/>
          </DefaultLayout>
          <Footer />
        </>
    );
}

export default Root;
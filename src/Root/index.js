import {  useOutlet } from 'react-router-dom';
// import Footer from "../Components/Footer/Footer";
import DefaultLayout from "../Components/Layout/DefaultLayout";
import Feature from '../Components/Feature/Feature';




const Root = () => {
  const outlet = useOutlet();

  return (
    <>
      <DefaultLayout>
        {outlet || <Feature />} {/* Render Feature if Outlet is empty */}
      </DefaultLayout>
      {/* <Footer /> */}
    </>
  );
};

export default Root;

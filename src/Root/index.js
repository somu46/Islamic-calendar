import {  useOutlet } from 'react-router-dom';
import DefaultLayout from "../Components/Layout/DefaultLayout";
import Feature from '../Components/Feature/Feature';
import ScrollTop from '../Components/ScrollTop/ScrollTop';






const Root = () => {
  const outlet = useOutlet();

  return (
    <>
    
      <DefaultLayout>
        {outlet || <Feature />} {/* Render Feature if Outlet is empty */}
       <ScrollTop/>
      </DefaultLayout>
    </>
  );
};

export default Root;

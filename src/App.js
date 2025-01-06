import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ZakatCalculator from "./Components/ZakatCal/ZakatCal";

function App() {
  

  return (
    <div className="">
      <div>
        <Navbar/>
        <Home/>
        <ZakatCalculator/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;

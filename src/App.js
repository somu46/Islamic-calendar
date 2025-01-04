
import Calendar from "./Components/calendar/Calendar";
import Calendar1 from "./Components/calendar/Calendar1";
import IslamicCalendar from "./Test/test";




function App() {

 

  // console.log("valueData", valueData);
  
  return (
    <div className="App">

  <div><IslamicCalendar /></div>
  <div>
    <Calendar/>
  </div>
  <div>
    <Calendar1/>
  </div>
    </div>
  );
}

export default App;

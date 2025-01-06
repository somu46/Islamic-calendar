// import Calendar from "./Components/calendar/Calendar";
// import Calendar1 from "./Components/calendar/Calendar1";
import IslamicCalendar from "./Test/test";

function App() {
  // console.log("valueData", valueData);

  return (
    <div className="App">
      <div>
        <IslamicCalendar />
      </div>
      <div className="border-2 my-5 mx-auto ">
        <iframe
          id="iframe"
          title="prayerWidget"
          class="widget-m-top"
          style={{ height: "358px", border: "1px solid #ddd" }}

          scrolling="no"
          src="https://www.islamicfinder.org/prayer-widget/1275004/shafi/3/0/18.0/18.0"
        >
          
        </iframe>
      </div>
    </div>
  );
}

export default App;

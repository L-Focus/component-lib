import { useEffect, useRef, useState } from "react";
import "./App.css";
import MiniCalender, { MiniCalenderRef } from "./components/MiniCalender2";

function App() {
  const calendarRef = useRef<MiniCalenderRef>(null);

  const [date, setDate] = useState(new Date());

  return (
    <MiniCalender
      ref={calendarRef}
      // defaultValue={new Date("2023-3-1")}
      value={date}
      onChange={(date) => {
        setDate(date)
        alert(date.toLocaleDateString());
      }}
    />
  );
}

export default App;

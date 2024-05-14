import "./App.css";
import SimpleCalenderWithHook from "./components/SimpleCalenderWithHook";

function App() {
  return (
    <SimpleCalenderWithHook
      defaultValue={new Date("2024-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
}

export default App;

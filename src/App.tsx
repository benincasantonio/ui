import "./App.css";
import { Input } from "@/components/Input/Input.tsx";

function App() {
  return (
    <>
      <Input
        onChange={(e) => {
          console.log("Input changed:", e.target.value);
        }}
      ></Input>
    </>
  );
}

export default App;


import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Components/Footer";
import Header from "./Pages/Components/Header";

function App() {
  return (
    <div className="bg-white">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;

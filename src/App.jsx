import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import CustomeClock from "./Components/CustomClock";
import Footer from "./Components/navbar/Footer";
import Navbar from "./Components/navbar/Navbar";
import WorldClocks from "./Components/WroldClocks";

function App() {
  const darkMode = true

  return (
    <BrowserRouter >
   <div 
  className="flex flex-col min-h-screen text-gray-900 dark:text-white transition-colors duration-500"
>
      {/* Navbar */}
      <Navbar darkMode={darkMode} />
<Routes>
  <Route index element={<WorldClocks />} />
<Route path="/my-clock" element={ <CustomeClock />} />
     
</Routes>
      
      {/* Footer */}
    </div>
      <Footer />
      </BrowserRouter>
  );
}

export default App;

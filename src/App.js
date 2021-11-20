import { HomePage, CountryPage } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/:name" element={<CountryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Header from "./components/shared/header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";

function App() {
  return (
    <>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/:shortUrl" element={<Redirect />} />
        </>
      </Routes>
    </>
  );
}

export default App;

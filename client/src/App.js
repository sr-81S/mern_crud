import { Route, Routes } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from "./components/Home";
import Iteam from "./components/Iteam";
import Navbar from "./components/Navbar";
import "../src/App.css"
import IteamEdit from "./components/IteamEdit";
import ViewId from "./components/ViewId";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/iteam" element={<Iteam/>} />
        <Route exact path="/edit/:id" element={<IteamEdit/>} />
        <Route exact path="/view/:id" element={<ViewId/>} />

      </Routes>
    </>
  );
}

export default App;

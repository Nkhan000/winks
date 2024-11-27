import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./UI/AppLayout";
import Home from "./Pages/Home";
import NewChat from "./Pages/NewChat";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />\
          <Route path="/home" element={<Home />} />
          <Route path="/new-chat" element={<NewChat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

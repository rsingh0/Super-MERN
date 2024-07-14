import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Menu from "./components/home/Menu";
import RequireAuthWrapper from "./util/RequireAuthWrapper";

const App = () => {
  return (
    <AuthProvider>
      <Menu />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <RequireAuthWrapper>
              <Home />
            </RequireAuthWrapper>
          }
        />
        <Route
          exact
          path="/books/details/:id"
          element={
            <RequireAuthWrapper>
              <ShowBook />
            </RequireAuthWrapper>
          }
        />
        <Route
          exact
          path="/books/create"
          element={
            <RequireAuthWrapper>
              <CreateBook />
            </RequireAuthWrapper>
          }
        />
        <Route
          exact
          path="/books/delete/:id"
          element={
            <RequireAuthWrapper>
              <DeleteBook />
            </RequireAuthWrapper>
          }
        />
        <Route
          exact
          path="/books/edit/:id"
          element={
            <RequireAuthWrapper>
              <EditBook />
            </RequireAuthWrapper>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;

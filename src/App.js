import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    Login,
    Articles,
    SingleArticle,
    Admin,
    Register,
    Home,
    Edit,
    Error,
} from "./pages";
import { Footer, Navbar } from "./components";
function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/articles" element={<Articles />} />

                    <Route path="/articles/:id" element={<SingleArticle />} />
                    <Route path="/article/:id" element={<Edit />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;

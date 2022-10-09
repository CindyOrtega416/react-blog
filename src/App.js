import './App.css';
import './style.scss';
import './media-query.css';
//import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {Navigate, Route, Router, Routes, useNavigate} from "react-router-dom";
import AddEditBlog from "./pages/AddEditBlog";
import Detail from "./pages/Detail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import {useContext, useEffect, useState} from "react";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Settings from "./pages/settings/Settings";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home"
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SinglePost from "./components/singlePost/SinglePost";
import {Context} from "./context/Context";

function App() {
    const [active, setActive] = useState("home")
   // const [user, setUser] = useState(null) // pass this user to addblog

  /*  const navigate = useNavigate()

    useEffect(()=> {
        auth.onAuthStateChanged((authUser) => {
            if(authUser) { // if we have a authUser, setUser to our authUser
                setUser(authUser)
            } else {
                setUser(null)
            }
        })
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null)
            setActive("login")
            navigate("/auth")
        })
    }
*/
    const { user } = useContext(Context);

  return (
    <>
        <TopBar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={ user ? <Home /> : <Register />} />
            <Route path="/login" element={ user ? <Home /> : <Login />} />
            <Route path="/write" element={ user ? <Write /> : <Register />} />
            <Route path="/settings" element={ user ? <Settings /> : <Register />} />
            <Route path="/post/:postId" element={<Single />} />
        </Routes>
        {/*<Header
            setActive={setActive}
            acive={active}
            user={user}
            handleLogout={handleLogout}/>
        <ToastContainer position="top-center"/>
        <Routes>
            <Route path="/" element={<Home setActive={setActive} user={user} />} />
            <Route path="/detail/:id" element={<Detail setActive={setActive} />} />
            <Route
                path="/create"
                element={user?.uid ? <AddEditBlog user={user}/> : <Navigate to="/" />}
            />
            <Route
                path="/update/:id"
                element={user?.uid ? <AddEditBlog user={user} setActive={setActive}/> : <Navigate to="/" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth setActive={setActive}/>} />
            <Route path="/settings" element={<Settings setActive={setActive}/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>*/}
    </>
  );
}

export default App;

import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import AdminPanel from "./pages/Admin/AdminPanel";
import Sepet from "./pages/Sepet/Sepet";


function App() {
  /**
 * Slice lar içinde bulunann state bilgilerine ulaşmak için useSelector kullanacağız ve
 * bu bilgiler doğrultusunda sayfaların render olmasını sağlayacağız.
 */
const isLogin = useSelector(state => state.personel.isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/admin-panel' element={isLogin ? <AdminPanel/> : <Login/>} />
        <Route path='/sepet' element={<Sepet />}/>   

      </Routes>
    </BrowserRouter>
  );
}

export default App;

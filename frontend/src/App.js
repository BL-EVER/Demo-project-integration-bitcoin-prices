import ShowcasePrices from "./Components/ShowcasePrices";
import Header from "./Components/Header";
import {UserProvider} from "./context/UserContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Content from "./Content";

function App() {
  return (
    <UserProvider>
        <Header />
        <Content />
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}/>
    </UserProvider>
  );
}

export default App;

import Board from './Board'; // Asegúrate de importar el componente Board correctamente
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './Board.css';

function App() {

  return (
    <>


      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Board />
        <ToastContainer 
          position="bottom-center" 
          autoClose={3000} 
          hideProgressBar={true} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover
          className="custom-toast-container"
        />
      </div>

    </>
  );
}

export default App;

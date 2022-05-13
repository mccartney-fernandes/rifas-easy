import Routes from './routes';
import { AuthProvider } from './context/auth'
import './App.css';


function App() {  
 
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Routes />
        </AuthProvider>  
      </header>    
    </div>
  );
}

export default App;

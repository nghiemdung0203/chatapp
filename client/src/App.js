import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import Chat from './component/Chat';


function App() {  
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" exact element={<Home/>} />
          <Route path = "/chat/:userName/:Room" element = {<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

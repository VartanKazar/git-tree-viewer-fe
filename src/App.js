import './App.css';
import GraphPage from './Pages/GraphPage';
import CommitPage from './Pages/CommitPage';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/commit" element={<CommitPage/>}/>
          <Route path="/" element={<GraphPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

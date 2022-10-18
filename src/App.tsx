import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { WeatherDetail } from './components/weatherdetail/weatherDetail';

import { Home } from './components/home/home';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/weatherdetail" element={<WeatherDetail/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

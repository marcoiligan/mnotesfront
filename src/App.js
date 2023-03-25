import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import React from 'react'
import {useState} from 'react'

import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import {ReactComponent as Moon} from './assets/moon.svg'
import {ReactComponent as Sun} from './assets/sun.svg'

function App() {
  const [theme, setTheme] = useState('theme' ? 'container dark' : 'container root')

  const switchTheme = () => {
    const newTheme = theme === 'container root' ? 'container dark' : 'container root'
    setTheme(newTheme)
  }
  return (
    <Router>
      <div className={theme}>
        <div className ="app">
          <Header />
          {theme !== 'container root' ? (
            <h3 className="theme">
            <Moon  onClick={switchTheme}/>
            </h3>
          ): (
            <h3 className="theme">
            <Sun  onClick={switchTheme}/>
            </h3>
          )}
          
          <Routes>
            <Route path="/" exact element={<NotesListPage/>} />
            <Route path="/note/:id" element={<NotePage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

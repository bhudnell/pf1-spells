import React from 'react';
import './App.scss';

import { Main } from './Main';

const changeTheme = () => {
  if (document.documentElement.hasAttribute('theme')) {
    document.documentElement.removeAttribute('theme');
  }
  else {
    document.documentElement.setAttribute('theme', 'dark');
  }
}

function App() {
  return (
    <div className="App">
      <div className="content">
        <header>
          <br />
          <h1>Pathfinder 1E Spell Search</h1>
          <input type="checkbox" id="themeSwitch" className="themeSwitchInput" onClick={changeTheme} />
          <label htmlFor="themeSwitch" className="themeSwitchLabel">
            <span />
          </label>
          <span className="themeLabel">Toggle theme</span>
          <br />
        </header>
        <br />
        <Main />
      </div>
      <footer>
        <h6>
          Database sourced from <a href="http://home.pathfindercommunity.net/home/databases/spells" target="_blank" rel="noopener noreferrer">pathfindercommunity.net</a>. Designed by Brendon Hudnell. 2020
        </h6>
      </footer>
    </div>
  );
}

export default App;

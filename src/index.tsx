import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
/*
// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  //@ts-ignore
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs: any) => {
    // ...and send a request for the DOM info...
    //@ts-ignore
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        (panel: any)=>ReactDOM.render(
          <React.StrictMode>
            <App data={panel.data}/>
          </React.StrictMode>,
          document.getElementById('root')
        ));
  });
});
*/

let params: any = {
  data: {
    icon: "", name: "root", children: [
      {
        icon: "", id: "tree_name1", name: "PostgreSQL 12", children: [
          { name: "Роли входа/группы", icon: "", children: Array(0), id: "tree_name104" },
          { children: [], icon: "", id: "tree_name105", name: "Табличные пространства" },
          { name: "Роли входа/группы", icon: "", children: Array(0), id: "tree_name177" },
          { children: [], icon: "", id: "tree_name305", name: "Табличные пространства" },
          {
            icon: "", id: "tree_name2", name: "Базы данных (3)", "children": [
              { name: "postgres", icon: "", children: Array(0), id: "tree_name3" },
              { children: [], icon: "", id: "tree_name4", name: "sp_main" },
              { name: "sp_portal", icon: "", children: Array(0), id: "tree_name103" }
            ]
          }
        ]
      }
    ]
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App data={params.data} />
  </React.StrictMode>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

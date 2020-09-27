import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

//@ts-ignore
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  ReactDOM.render(
    <React.StrictMode>
      <App data={message.data} />
    </React.StrictMode>,
    document.getElementById('extension')
  )
});

window.addEventListener('DOMContentLoaded', () => {
  //@ts-ignore
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs: any) => {
    //@ts-ignore
    chrome.tabs.sendMessage( tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, null);
  });
});
/*

let params: any = {
  data: {
    icon: "", name: "root", children: [
      {
        icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", id: "tree_name1", name: "PostgreSQL 12", children: [
          { name: "Роли входа/группы", icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", children: Array(0), id: "tree_name104" },
          { children: [], icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", id: "tree_name105", name: "Табличные пространства" },
          { name: "Роли входа/группы", icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", children: Array(0), id: "tree_name177" },
          { children: [], icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", id: "tree_name305", name: "Табличные пространства" },
          {
            icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", id: "tree_name2", name: "Базы данных (3)", "children": [
              { name: "postgres", icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", children: Array(0), id: "tree_name3" },
              { children: [], icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", id: "tree_name4", name: "sp_main" },
              { name: "sp_portal", icon: "url('http://127.0.0.1:51262/browser/foreign_data_wrapper/static/img/coll-foreign_data_wrapper.svg?ver=42400')", children: Array(0), id: "tree_name103" }
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
  document.getElementById('extension')
)
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

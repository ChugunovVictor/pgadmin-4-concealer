import React from 'react';
import Switch from './Switch';
import Table from './Table';
import { Record } from '../models/Record'

// import { ReactComponent as SaveIcon } from '../images/save.svg';
import { ReactComponent as ZoomIcon } from '../images/zoom.svg';
import { ReactComponent as ApplyIcon } from '../images/apply.svg';

export let THEME = true
export let ZOOM = 20

type AppProps = {
  data: Record,
}

export default class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.dayNight = this.dayNight.bind(this)
    this.zoom = this.zoom.bind(this)
    document.getElementsByTagName('html')[0].setAttribute('data-theme', THEME ? 'night' : 'day');
  }

  dayNight() {
    THEME = !THEME;
    this.setState({});
    document.getElementsByTagName('html')[0].setAttribute('data-theme', THEME ? 'night' : 'day');
  }

  apply() {
    // @ts-ignore
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs: any) => {
      //@ts-ignore
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          from: 'popup',
          subject: 'toggle',
          //@ts-ignore
          value: [...document.querySelectorAll('.Row')].filter(e => e.getElementsByTagName('input')[0].checked).map(e => e.id)
        },
      )
    });
  }

  zoom(){
    if( ZOOM >= 25 ) ZOOM = 15
    else ZOOM += 5;
    this.setState({}) 
  }

  render() {
    //  <SaveIcon className="PanelButton" width={ZOOM * 1.5 + 'px'} height={ZOOM * 1.5 + 'px'} stroke={THEME ? 'lightcoral' : 'red'} />
          
    return (
      <div className="Template">
        <Table data={this.props.data} />
        <div className="Panel">
          <div className="PanelBlock">
            <ApplyIcon onClick={this.apply} className="PanelButton" width={ZOOM * 1.5 + 'px'} height={ZOOM * 1.5 + 'px'} stroke={THEME ? 'lightgreen' : 'green'} />
          </div>
          <div className="PanelBlock">
            <ZoomIcon onClick={this.zoom} className="PanelButton" width={ZOOM * 1.5 + 'px'} height={ZOOM * 1.5 + 'px'} stroke={THEME ? 'lightgreen' : 'green'} />
            <Switch toggle={this.dayNight} />
          </div>
        </div>
      </div>
    );
  }
}
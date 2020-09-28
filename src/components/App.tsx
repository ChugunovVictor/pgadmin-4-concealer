import React from 'react';
import Switch from './Switch';
import Table from './Table';
import { Record } from '../models/Record'

import { ReactComponent as SaveIcon } from '../images/save.svg';
import { ReactComponent as ZoomIcon } from '../images/zoom.svg';
import { ReactComponent as ApplyIcon } from '../images/apply.svg';

export let THEME = true

type AppProps = {
  data: Record,
}

export default class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.dayNight = this.dayNight.bind(this)
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

  render() {
    return (
      <div className="Template">
        <Table data={this.props.data} />
        <div className="Panel">
          <div className="PanelBlock">
            <ApplyIcon onClick={this.apply} className="PanelButton" width="32" height="32" stroke={THEME ? 'lightgreen' : 'green'} />
            <SaveIcon className="PanelButton" width="32" height="32" stroke={THEME ? 'lightcoral' : 'red'} />
          </div>
          <div className="PanelBlock">
            <ZoomIcon className="PanelButton" width="32" height="32" stroke={THEME ? 'lightgreen' : 'green'} />
            <Switch toggle={this.dayNight} />
          </div>
        </div>
      </div>
    );
  }
}
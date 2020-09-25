import React from 'react';
import Switch from './Switch';
import Table from './Table';
import {Record} from '../models/Record'

import {ReactComponent as SaveIcon} from './image/save.svg';
import {ReactComponent as ApplyIcon} from './image/apply.svg';

type AppProps = {
  data: Record,
}

export default class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.dayNight = this.dayNight.bind(this)
  }

  state = {
    theme: true
  }

  dayNight() {
    this.setState({theme: !this.state.theme})
    document.getElementsByTagName('html')[0].setAttribute('data-theme', this.state.theme ? 'night' : 'day')
  }

  render() {
    return (
      <div className="Template">
        <Table data={this.props.data} theme={this.state.theme} />
        <div className="Panel">
          <Switch value={this.state.theme} toggle={this.dayNight}/>
          <SaveIcon stroke="red" width="20" height="20"/>
          <ApplyIcon stroke="red" width="20" height="20" />
        </div>
      </div>
    );
  }
}
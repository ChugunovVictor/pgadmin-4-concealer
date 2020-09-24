import React, { ChangeEvent, MouseEvent, SyntheticEvent } from 'react';
import Switch from './Switch';
import Table from './Table';

type AppProps = {
  data: any,
}

export default class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.dayNight = this.dayNight.bind(this)
  }

  state = {
    theme: 1
  }

  dayNight() {
    if (this.state.theme) {
        document.getElementsByTagName('html')[0].setAttribute('data-theme', 'night')
        this.setState({theme: 0})
    } else {
        document.getElementsByTagName('html')[0].setAttribute('data-theme', 'day')
        this.setState({theme: 1})
    }
  }

  render() {
    return (
      <div className="Template">
        <Table data={this.props.data} />
        <div className="Panel">
          <Switch value={this.state.theme} toggle={this.dayNight}/>
        </div>
      </div>
    );
  }
}
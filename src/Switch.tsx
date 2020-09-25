import React, { ChangeEvent, MouseEvent, SyntheticEvent } from 'react';

import {ReactComponent as SunIcon} from './img/sun.svg';
import {ReactComponent as MoonIcon} from './img/moon.svg';

type SwitchProps = {
  value: boolean,
  toggle: (event: ChangeEvent) => void;
}

export default class Switch extends React.Component<SwitchProps> {
  constructor(props: SwitchProps) {
    super(props);
  }

  render() {
    return (
      <label className="SwitchCheckbox">
          <input type="checkbox" onChange={this.props.toggle} checked={this.props.value}/>
          <span className="SwitchSlider"></span>
          <SunIcon className="SwitchSunMark" stroke="yellow"/>
          <MoonIcon className="SwitchMoonMark" stroke="blue"/>
      </label>
    );
  }
}
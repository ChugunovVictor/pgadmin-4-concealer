import React, { ChangeEvent } from 'react';

import {ReactComponent as SunIcon} from '../images/sun.svg';
import {ReactComponent as MoonIcon} from '../images/moon.svg';
import { THEME } from './App';

type SwitchProps = {
  toggle: (event: ChangeEvent) => void;
}

export default class Switch extends React.Component<SwitchProps> {
  render() {
    return (
      <label className="SwitchCheckbox">
          <input type="checkbox" onChange={this.props.toggle} checked={THEME}/>
          <span className="SwitchSlider"></span>
          <SunIcon className="SwitchSunMark" stroke={THEME ? "yellow" : "yellow"}/>
          <MoonIcon className="SwitchMoonMark" stroke={THEME ? "blue" : "blue"}/>
      </label>
    );
  }
}
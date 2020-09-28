import React, { ChangeEvent } from 'react';

import {ReactComponent as SunIcon} from '../images/sun.svg';
import {ReactComponent as MoonIcon} from '../images/moon.svg';
import { THEME, ZOOM } from './App';

type SwitchProps = {
  toggle: (event: ChangeEvent) => void;
}

export default class Switch extends React.Component<SwitchProps> {
  render() {
    return (
      <label style={{width : ZOOM * 1.5 + 'px', height: ZOOM * 3 + 'px'}} className="SwitchCheckbox">
          <input type="checkbox" onChange={this.props.toggle} checked={THEME}/>
          <span style={{width : ZOOM * 1.5 + 'px', height: ZOOM * 1.5 + 'px'}} className="SwitchSlider"></span>
          <SunIcon width={ZOOM * 1.5 + 'px'} height={ZOOM * 1.5 + 'px'} className="SwitchSunMark" stroke={THEME ? "yellow" : "yellow"}/>
          <MoonIcon width={ZOOM * 1.5 + 'px'} height={ZOOM * 1.5 + 'px'} className="SwitchMoonMark" stroke={THEME ? "blue" : "blue"}/>
      </label>
    );
  }
}
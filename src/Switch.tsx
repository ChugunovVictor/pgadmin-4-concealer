import React, { ChangeEvent, MouseEvent, SyntheticEvent } from 'react';

type SwitchProps = {
  value: number,
  toggle: (event: ChangeEvent) => void;
}

export default class Switch extends React.Component<SwitchProps> {
  constructor(props: SwitchProps) {
    super(props);
  }

  render() {
    return (
      <label className="SwitchCheckbox">
          <input type="checkbox" onChange={this.props.toggle} value={this.props.value}/>
          <span className="SwitchSlider"></span>
          <span className="SwitchSunMark"></span>
          <span className="SwitchMoonMark"></span>
      </label>
    );
  }
}
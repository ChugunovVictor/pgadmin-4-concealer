import React, { MouseEvent, SyntheticEvent } from 'react';
import { ReactComponent as Sign } from './sign.svg';
import { ReactComponent as Warn } from './sign_warn.svg';

let VisibleIcon = () => <Sign stroke="lightgreen" />
let InvisibleIcon = () => <Sign stroke="red" />
let WarningIcon = () => <Warn stroke="yellow" fill="yellow" />

let SELECT: boolean = false;

type RowProps = {
  title: any,
  children: any[],
  margin: number
}

class Row extends React.Component<RowProps> {
  constructor(props: RowProps) {
    super(props);
    this.select = this.select.bind(this)
    this.click = this.click.bind(this)
  }

  select(event: SyntheticEvent) {
    if (SELECT) {
      (event.currentTarget as Element).classList.add('Selected')
    }
  }

  click(event: MouseEvent) {
    (event.currentTarget as Element).classList.add('Selected')
  }

  render() {
    return (
      <div>
        <div className="Row"
          onMouseMove={this.select}
          onClick={this.click}
        >
          <input type="checkbox" style={{ marginRight: this.props.margin }} />
          <label>{this.props.title}</label>
        </div>
        <div>
          {this.props.children.map((el: any) => (
            <Row
              key={Math.random()}
              margin={this.props.margin + 15}
              title={el.name}
              children={el.children}
            />
          ))}
        </div>
      </div>
    );
  }
}

type AppProps = {
  data: any,
}

export default class App extends React.Component<AppProps> {
  constructor(props: AppProps, public select: boolean) {
    super(props);
    this.startSelection = this.startSelection.bind(this)
    this.endSelection = this.endSelection.bind(this)
    this.keyPress = this.keyPress.bind(this)
  }

  keyPress(event: KeyboardEvent) {
    if (event.code == 'Space') {
      let elements = document.querySelectorAll('.Selected > input[type=checkbox]')
      let checked = 0;

      elements.forEach(
        el => {
          // @ts-ignore
          if (el.checked) checked++;
          else checked--;
        }
      )

      elements.forEach(
        // @ts-ignore
        el => { el.checked = checked >= 0 ? false : true }
      )
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress, false);
  }

  startSelection() {
    document.querySelectorAll('.Selected').forEach(
      el => el.classList?.remove('Selected')
    )
    SELECT = true;
  }

  endSelection() {
    SELECT = false;
  }

  render() {
    return (
      <div className="App"
        onMouseDown={this.startSelection}
        onMouseUp={this.endSelection}
      >
        <Row margin={0} title={this.props.data.name}
          children={this.props.data.children} />
      </div>
    );
  }
}

/*
    <VisibleIcon />
    <WarningIcon />
    <InvisibleIcon />
*/
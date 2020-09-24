import React, { ChangeEvent, MouseEvent, SyntheticEvent } from 'react';
import Row from './Row';
export let SELECT: boolean = false;

type TableProps = {
  data: any,
}

export default class Table extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.startSelection = this.startSelection.bind(this)
    this.endSelection = this.endSelection.bind(this)
    this.keyPress = this.keyPress.bind(this)
  }

  keyPress(event: KeyboardEvent) {
    if (event.code == 'Space') {
      let elements = document.querySelectorAll('.Selected input[type=checkbox]')
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
          <Row margin={25} title={this.props.data.name}
            children={this.props.data.children} />
      </div>
    );
  }
}
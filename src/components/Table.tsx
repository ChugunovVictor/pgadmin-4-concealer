import React from 'react';
import Row from './Row';
export let SELECT: boolean = false;

type TableProps = {
  data: any
}

export default class Table extends React.Component<TableProps> {
  subscribers: Set<Function> = new Set();

  constructor(props: TableProps) {
    super(props);
    this.startSelection = this.startSelection.bind(this);
    this.endSelection = this.endSelection.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.subscribe = this.subscribe.bind(this);

    console.log(this.props.data)
  }

  keyPress(event: KeyboardEvent) {
    if (event.code === 'Space') {
      /* define which values are more - checked or unchecked - and set to the value of least */
      let elements = document.querySelectorAll('.Selected input[type=checkbox]')
      let checked = 0;

      elements.forEach(
        el => {
          // @ts-ignore
          if (el.checked) checked++;
          else checked--;
        }
      )

      this.subscribers.forEach(childMethod => childMethod(checked >= 0 ? false : true, null));

      event.stopPropagation();
      event.preventDefault();
    }
  }

  subscribe(method: Function){
    this.subscribers.add(method)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress, false);
  }

  startSelection() {
    this.subscribers.forEach(childMethod => childMethod(null, true));
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
          <Row 
            margin={25} 
            record={this.props.data} 
            check={this.subscribe} 
            key={"root"} 
            id={"root"} 
            checkedChild={()=>{}}
          />
      </div>
    );
  }
}
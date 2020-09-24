import React, { MouseEvent, SyntheticEvent } from 'react';
import { ReactComponent as Sign } from './sign.svg';
import { ReactComponent as Warn } from './sign_warn.svg';

let VisibleIcon = () => <Sign stroke="lightgreen" />
let InvisibleIcon = () => <Sign stroke="red" />
let WarningIcon = () => <Warn stroke="yellow" fill="yellow" />

type RowProps = {
  title: any,
  children: any[],
  margin: number
}

class Row extends React.Component<RowProps> {
  render() {
    return (
      <div>
        <div className="Row">
          <input type="checkbox" style={{ marginRight: this.props.margin }} />
          <label>{this.props.title}</label>
        </div>
        <div>
          {this.props.children.map((el: any) => (
            <Row margin={this.props.margin + 15} title={el.name} children={el.children} />
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
  constructor(props: AppProps, public select:boolean){
    super(props);

    this.getSelectedNodes = this.getSelectedNodes.bind(this)
    this.startSelection = this.startSelection.bind(this)
    this.endSelection = this.endSelection.bind(this)
  }

  nextNode(node: Node | Node & ParentNode | null) {
    if (node?.hasChildNodes()) {
      return node?.firstChild;
    } else {
      while (node && !node.nextSibling) {
        node = node.parentNode;
      }
      if (!node) {
        return null;
      }
      return node.nextSibling;
    }
  }

  getRangeSelectedNodes(range: Range) {
    let node: ChildNode | Node | null = range.startContainer;
    let endNode = range.endContainer;

    // Special case for a range that is contained within a single node
    if (node == endNode) {
      return [node];
    }

    // Iterate nodes until we hit the end container
    let rangeNodes = [];
    while (node && node != endNode) {
      rangeNodes.push(node = this.nextNode(node));
    }

    // Add partially selected nodes at the start of the range
    node = range.startContainer;
    while (node && node != range.commonAncestorContainer) {
      rangeNodes.unshift(node);
      node = node.parentNode;
    }

    return rangeNodes;
  }

  getSelectedNodes() {
    if(!this.select) return;
    let sel = window.getSelection()
    if (sel) {
      if (!sel.isCollapsed) {
        (this.getRangeSelectedNodes(sel.getRangeAt(0)) as HTMLElement[])
          .filter(el => el.classList?.contains('Row'))
          .forEach(el => el.classList.toggle('Selected'))
      }
    }
  }

  startSelection() {
    document.querySelectorAll('.Row').forEach(
      el => el.classList?.remove('Selected')
    )
    this.select = true;
  }
  
  endSelection() {
    this.select = false;
  }

  render() {
    return (
      <div className="App" 
        onMouseDown={this.startSelection} 
        onMouseMove={this.getSelectedNodes}
        onMouseUp={this.endSelection}
      >
        <Row margin={0} title={this.props.data.name} children={this.props.data.children} />
      </div>
    );
  }
}

/*
    <VisibleIcon />
    <WarningIcon />
    <InvisibleIcon />
*/
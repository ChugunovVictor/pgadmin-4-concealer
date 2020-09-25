import React from "react";
import { ChangeEvent, SyntheticEvent, MouseEvent } from "react";
import { SELECT } from "./Table";
import {Record} from '../models/Record'
import {ReactComponent as ShowIcon} from './image/show.svg';
import {ReactComponent as HideIcon} from './image/hide.svg';
//import {ReactComponent as WarnIcon} from './image/warn.svg';

export type RowProps = {
    record: Record,
    margin: number,
    check: Function
}

export default class Row extends React.Component<RowProps> {
    constructor(props: RowProps) {
        super(props);
        this.select = this.select.bind(this)
        this.click = this.click.bind(this)
        this.changed = this.changed.bind(this)
        this.check = this.check.bind(this)
    }

    state = {
        checked: false,
        selected: false
    }

    componentDidMount(){
        this.props.check(this.check)
    }

    select(event: SyntheticEvent) {
        if (SELECT) {
            this.setState({selected : true})
        }
    }

    click(event: MouseEvent) {
        this.setState({selected : true})
    }

    changed(event: ChangeEvent) {
        this.setState({checked : !this.state.checked})
    }

    check(checked: boolean, selected: boolean){
        if(checked != null && this.state.selected)
            this.setState({checked : checked, selected: false})

        if(selected)
            this.setState({selected: false})
    }

    render() {
        return (
            <div>
                <div className={this.state.selected ? "Row Selected" : "Row"}
                    onMouseMove={this.select}
                    onClick={this.click}        
                >
                    <label style={{ marginRight: this.props.margin }} className="RowCheckbox">
                        <input onChange={this.changed} type="checkbox" checked={this.state.checked} />
                        { this.state.checked ? <HideIcon className="RowCheckboxMark"/> : <ShowIcon className="RowCheckboxMark"/> }
                    </label>

                    <label>{this.props.record.name}</label>
                </div>
                <div className="RowContent">
                    {this.props.record.children.map((el: any) => (
                        <Row
                            key={el.id}
                            margin={this.props.margin + 15}
                            record={el}
                            check={this.props.check}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
import React from "react";
import { ChangeEvent, SyntheticEvent, MouseEvent } from "react";
import { SELECT, ICONS } from "./Table";
import { THEME, ZOOM } from './App'
import { Record } from '../models/Record'
import { ReactComponent as ShowIcon } from '../images/show.svg';
import { ReactComponent as HideIcon } from '../images/hide.svg';
import { ReactComponent as WarnIcon } from '../images/warn.svg';

export type RowProps = {
    record: Record,
    margin: number,
    check: Function,
    checkedChild: Function,
    id: string
}

export default class Row extends React.Component<RowProps> {
    constructor(props: RowProps) {
        super(props);
        this.select = this.select.bind(this)
        this.click = this.click.bind(this)
        this.changed = this.changed.bind(this)
        this.check = this.check.bind(this)
        this.checkedChild = this.checkedChild.bind(this)
    }

    state = {
        checked: false,
        selected: false,
        checkedChild: 0
    }

    componentDidMount() {
        this.props.check(this.check)
        if(this.props.record.display?.indexOf('none') >= 0){
            this.setState({ checked: true })
        }
    }

    select(event: SyntheticEvent) {
        if (SELECT) {
            this.setState({ selected: true })
        }
    }

    click(event: MouseEvent) {
        this.setState({ selected: true })
    }

    changed(event: ChangeEvent) {
        this.props.checkedChild(!this.state.checked);
        this.setState({ checked: !this.state.checked })
    }

    check(checked: boolean, selected: boolean) {
        
        if (checked != null && this.state.selected){
            this.props.checkedChild(checked);
            this.setState({ checked: checked, selected: false, checkedChild: 0 })
        }

        if (selected)
            this.setState({ selected: false })
    }

    checkedChild(value: boolean) {
        this.setState({ checkedChild: this.state.checkedChild + (value ? 1 : -1) })
    }

    render() {
        //<img style={{display: 'inline-block', width:'20px', height:'20px'}} dangerouslySetInnerHTML={{ __html: this.props.icon}}/>
        return (
            <div>
                <div id={this.props.id} className={this.state.selected ? "Row Selected" : "Row"}
                    onMouseMove={this.select}
                    onClick={this.click}
                >
                    <label style={{ marginRight: this.props.margin }} className="RowCheckbox">
                        <input onChange={this.changed} type="checkbox" checked={this.state.checked} />
                        {this.state.checked?
                            <HideIcon width={ZOOM + 'px'} height={ZOOM + 'px'} className="RowCheckboxMark" stroke={THEME ? 'lightcoral' : 'red'} /> :
                            (this.state.checkedChild ?
                                <WarnIcon width={ZOOM + 'px'} height={ZOOM + 'px'} className="RowCheckboxMark" stroke={THEME ? 'yellow' : 'blue'}/> :
                                <ShowIcon width={ZOOM + 'px'} height={ZOOM + 'px'} className="RowCheckboxMark" stroke={THEME ? 'lightgreen' : 'green'} />)
                        }
                    </label>
                    
                    {
                        this.props.record.icon &&
                        <img width={ZOOM + 'px'} height={ZOOM + 'px'} src={ "data:image/svg+xml;base64," + ICONS.find(el => el.id == this.props.record.icon)?.svg } alt=""/>
                    }
                    
                    <label style={{fontSize: ZOOM + 'px', whiteSpace: 'nowrap'}}>{this.props.record.name}</label>
                </div>
                {
                    !this.state.checked && <div className="RowContent">
                        {this.props.record.children.map((el: any) => (
                            <Row
                                id={el.id}
                                key={el.id}
                                margin={this.props.margin + 15}
                                record={el}
                                check={this.props.check}
                                checkedChild={this.checkedChild}
                            />
                        ))}
                    </div>
                }
            </div>
        );
    }
}
import React, { Component } from 'react';
import './item-list.sass'
import SwapiService from '../../services/services'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

export default class ItemList extends Component{

    state = {
        itemList: null,
    }

    componentDidMount() {

        const { getData } = this.props;

        getData().then((itemList) => {
            this.setState({itemList})
        })
    }

    renderItems = (items) => {
        return items.map((item) => {
            const { id } = item;
            const label = this.props.children(item);
            return(
                <li key={id}
                    onClick = {() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render(){
        const { itemList } = this.state;
        if(!itemList) {
            return <Spinner />
        }
        const items = this.renderItems(itemList)
        return(
            <div className = "item-list">
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}
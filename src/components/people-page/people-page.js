import React, { Component } from 'react';
import './people-page.sass'
import SwapiService from '../../services/services'
import ErrorIndicator from '../error-indicator'
import PersonDetails from "../person-details";
import ItemList from "../item-list";

export default class PeoplePage extends Component{

    swapiService = new SwapiService()

    state={
        selectedPerson: 4,
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson})
    }

    render(){
        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>
                {({name, birthYear}) => (
                    <span>{name} ({birthYear})</span>
                )}
            </ItemList>
        );

        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson}/>
        )

        return(
            <ErrorBoundry>
                <Row item1 = {itemList} item2 = {personDetails}></Row>
            </ErrorBoundry>
        )
    }
}

const Row = ({ item1, item2 }) => {
    return(
        <div className="two-columns">
            <div className="item">
                {item1}
            </div>
            <div className="item">
                {item2}
            </div>
        </div>
    )
}

class ErrorBoundry extends Component {
   state = {
       hasError: false
   }

    componentDidCatch(){
        // debugger
        this.setState({
            hasError: true
        })
    }
   render(){

       if(this.state.hasError) {
           return <ErrorIndicator />
       }

       return this.props.children;
   }
}
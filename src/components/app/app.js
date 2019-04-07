import React, { Component } from 'react';
import './app.sass'
import Header from '../header';
import PlanetDetails from "../planet-details";
import ItemList from "../item-list"
import PersonDetails from "../person-details"
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";

export default class App extends Component{

    state = {
      showRandomPlanet: true,
      selectedPerson: 1,
    };

    componentDidCatch(){
        this.setState({
            hasError: true
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <PlanetDetails/>
                <PeoplePage/>
            </div>
        );
    };
}
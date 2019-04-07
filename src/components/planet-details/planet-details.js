import React, { Component } from 'react';
import './planet-details.sass'
import SwapiService from '../../services/services'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

export default class PlanetDetails extends Component{

    swapiService = new SwapiService()

    state = {
        planet: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, 3000);
        // clearInterval(this.interval)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false,
        });
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * (15 - 2)) + 2;
        this.swapiService
            .getPlanet(id)
            .then((planet) => {this.onPlanetLoaded(planet)})
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    render(){
        const { planet, loading, error } = this.state
        const content = !loading && !error ? <PlanetView planet={planet}/> : null;
        const spinner = loading ? <Spinner /> : null
        const errorMessage = error? <ErrorIndicator/> : null
        return(
            <div className={"planet-details"}>
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {
    const { id, name, population,
        rotationPeriod, diameter } = planet;

    return(
        <React.Fragment>
            <div className="planet-img">
                <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            </div>
            <div className="planet-container">
                <div className={"planet-name"}>{name}</div>
                <ul>
                    <li>Population: {population}</li>
                    <li>Rotation Period: {rotationPeriod}</li>
                    <li>Diameter: {diameter}</li>
                </ul>
            </div>
        </React.Fragment>
    )
}
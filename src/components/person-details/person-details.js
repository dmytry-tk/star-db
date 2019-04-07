import React, { Component } from 'react';
import './person-details.sass'
import SwapiService from '../../services/services'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

export default class PersonDetails extends Component{

    SwapiService = new SwapiService()

    state = {
        person: {},
        loading: true,
    }

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId !== prevProps.personId){
            this.setState({
                loading: true
            })
            this.updatePerson();
        }
    }

    updatePerson() {
        const { personId } = this.props;
        if(!personId) {
            return;
        }

        this.SwapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: false,
                });
            });
    }

    render(){
        const {person, loading} = this.state
        const personInfo = !loading? <PersonInfo person = {person}/> : null
        const spinner = loading? <Spinner/> : null
        return(
            <div className = "person-details">
                {spinner}
                {personInfo}
            </div>
        )
    }
}

const PersonInfo = ( {person} ) => {

    const { id, gender, name, eyeColor, birthYear } = person
    return(
        <React.Fragment>
            <div className="person-details-img"><img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt=""/></div>
            <div className="person-details-info">
                <div className="name">{name}</div>
                <div className="desc">
                    <ul>
                        <li>
                            Gender: {gender}
                        </li>
                        <li>
                            Birth year: {birthYear}
                        </li>
                        <li>
                            Eye color: {eyeColor}
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
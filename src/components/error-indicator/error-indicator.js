import React, { Component } from 'react';
import './error-indicator.sass'
import icon from "./smile.png"

export default class ErrorIndicator extends Component{
    render(){
        return(
            <div className = "error-indicator"><img src={icon} alt=""/>Something get wrong(</div>
        )
    }
}
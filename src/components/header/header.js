import React, { Component } from 'react';
import './header.sass'

export default class Header extends Component{
    render(){
        return(
            <header className="main-header">
                <div className="logo"><span>Star DB</span></div>
                <div className="menu">
                    <a href="" className="link">People</a>
                    <a href="" className="link">Planets</a>
                    <a href="" className="link">Starships</a>
                </div>
            </header>
        )
    }
}
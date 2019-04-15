import React, { Component } from 'react'

class Result extends Component {
    constructor(props) {
        super(props)

        this.img = 'http://localhost:3000/static/segmentedImage/' + this.props.location.state.fileName + '.png';
    }

    render(){
        return(
            <div>
                <p>Prediction Class : {this.props.location.state.prediction}</p>

                <img width="512" height="512" src={this.img} />
            </div>
        )
    }
}

export default Result
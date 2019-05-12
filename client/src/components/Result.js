import React, { Component } from 'react'
import jsPDF from 'jspdf'
import jwt_decode from 'jwt-decode'
import { string } from 'prop-types';

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name:'',
            last_name:''
        }
        this.timeToPredict = this.props.location.state.timeToPredict;
        this.patientID = this.props.location.state.patientID;
        this.prediction = this.props.location.state.prediction;
        this.tumorSize = this.props.location.state.tumorSize; 
        this.img = 'http://localhost:3000/static/segmentedImage/' + this.props.location.state.fileName.split('.',1)[0] + '.png';
        this._pdfGenerator = this._pdfGenerator.bind(this);
    }

    componentDidMount() {
        const token = localStorage.userToken
        const decoded = jwt_decode(token)
        this.setState({
          first_name: decoded.identity.first_name,
          last_name: decoded.identity.last_name,
        })
    }

    _pdfGenerator() {
        let doc = new jsPDF();
        const img = new Image();
        const date = new Date();
        const month = (date.getMonth()<10) ? ('0'+(date.getMonth()+1)) : (date.getMonth()+1);
        img.src = this.img;
        doc.setFontSize(32);
        doc.text('Classification Report', 105, 25, {align:'center'});
        doc.setFontSize(20);
        doc.text('TA.1819.1.1.Q', 105, 35, {align:'center'});
        doc.addImage(img, 'JPEG', 25, 60, 70, 70);
        doc.setFontSize(13);
        doc.setLineWidth(0.5);
        doc.line(25, 203, 185, 203);
        doc.text('Patient Id : ' + this.patientID, 115, 85);
        doc.text('Prediction : ' + this.prediction, 115, 95);
        doc.text('Tumor Size : ' + this.tumorSize + ' mm', 115, 105);
        doc.setFontSize(9);
        doc.text('2', 165, 103);
        doc.setFontSize(13);
        doc.text('Prediction Date : ' + date.getDate() + '-' + month  + '-' + date.getFullYear(), 185, 200, {align:'right'});
        doc.text('Modality : MRI', 105, 200, {align:'center'}); 
        doc.text( 'Radiologist : ' + this.state.first_name + ' ' + this.state.last_name, 25, 200);
        doc.save('Report' + this.patientID + '.pdf');
    }
    
    render(){
        return(
            <div>
                <h3 style={{position: 'absolute', top: 150, left:1100}}>Patient ID : {this.patientID}</h3>
                <h4 style={{position: 'absolute', top: 180, left:1100}}>Prediction Class : {this.prediction}</h4>
                <h4 style={{position: 'absolute', top: 210, left:1100}}>Tumor Size : {this.tumorSize} mm<sup>2</sup></h4>
                <h4 style={{position: 'absolute', top: 240, left:1100}}>Time to predict : {Math.round(this.timeToPredict * 100) / 100} Seconds</h4>
                <img style={{position: 'absolute', zIndex:0, top:120, left:500}} width="512" height="512" src={this.img} />
                <button type="button" class="btn btn-lg btn-primary" style={{position: 'absolute', top: 285, left:1100}} onClick={this._pdfGenerator} >Download Report</button>
            </div>
        )
    }
}

export default Result
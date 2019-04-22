import React, { Component } from 'react'
import jsPDF from 'jspdf'
import jwt_decode from 'jwt-decode'

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name:'',
            last_name:''
        }
        this.patientID = this.props.location.state.patientID;
        this.prediction = this.props.location.state.prediction;
        this.img = 'http://localhost:3000/static/segmentedImage/' + this.props.location.state.fileName.split('.',1)[0] + '.png';
        this._pdfGenerator = this._pdfGenerator.bind(this);
    }

    _pdfGenerator() {
        let doc = new jsPDF();
        const img = new Image();
        const date = new Date();
        const month = (date.getMonth()<10) ? ('0'+date.getMonth()) : date.getMonth();
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
        doc.text('Scanning Date : ' + date.getDate() + '-' + month  + '-' + date.getFullYear(), 185, 200, {align:'right'});
        doc.text('Modality : MRI', 97, 200, {align:'center'}); 
        doc.text( 'Radiologist : TA', 25, 200);
        doc.save('Report' + this.patientID + '.pdf');
    }
    
    render(){
        return(
            <div>
                <p>Patient ID : {this.patientID}</p>
                <p>Prediction Class : {this.prediction}</p>
                <img width="512" height="512" src={this.img} />
                <button onClick={this._pdfGenerator} >Download Report</button>
            </div>
        )
    }
}

export default Result
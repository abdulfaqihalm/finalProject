import React, { Component } from 'react'
import { createMask, classify } from './DataFunctions';

class Annotator extends Component {
    constructor(props) {
      super(props);
      this.i = 0;
      this.state = { 
        x: 0, 
        y: 0
      };
      this.arr = [];
      this.img = 'http://localhost:3000/static/rawImage/' + this.props.location.state.fileName.split('.',1)[0] + '.png';
      this.patientID = this.props.location.state.patientID;

      this._onMouseClick = this._onMouseClick.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._resetCounter = this._resetCounter.bind(this);
      this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
      const ctx = document.getElementById('canvasBackground').getContext('2d');
      let img = new Image();
      img.onload = function() {
        ctx.drawImage(img,0,0);
      }
      img.src = this.img; 
    }

    _drawPoint(x, y) {
      const ctx = document.getElementById('canvasSketch').getContext('2d');
      ctx.strokeStyle = ctx.fillStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath(); 
      ctx.moveTo(x+4, y);
      ctx.arc(x, y, 4, 0, Math.PI*2, false);
      ctx.fill();
    }
    
    _onMouseMove(e) {
      console.log(e.nativeEvent.offsetX, e.screenX);
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
    
    _storeCoordinate(xVal, yVal, arr) {
      arr.push({x: xVal, y: yVal});
    }
    
        
    _resetCounter() {
      const ctx = document.getElementById('canvasSketch').getContext('2d');
      this.i = 0; 
      this.arr = []; 
      ctx.clearRect(0, 0, 512, 512);
      console.log(this.i);
    }
    
    _onMouseClick(e) {
      let x = e.nativeEvent.offsetX;
      let y = e.nativeEvent.offsetY;
      this._storeCoordinate(x, y, this.arr);
      this._drawPoint(x, y);
      console.log(this.arr[this.i].x, this.arr[this.i].y, this.arr.length);
      this.i++; 
    }

    _onSubmit() {
      const annotData = {
        fileName: this.props.location.state.fileName,
        patientID: this.patientID,
        p0: this.arr[0],
        p1: this.arr[1]
      }
      
      //const data = JSON.stringify(annotData)
      createMask(annotData).then(response =>{
        console.log("File that has been segemented : " + response);
        classify(response).then(response => {
          console.log(response)
          this.props.history.push({pathname: "/brain/result/"+response.patientID, state:response});
        })
        
      });
    }
    
    render() {
      const { x, y } = this.state;
      return <div ref="elem" className="container">
        <div>
          <canvas alt="ini gambar" id="canvasBackground" width="512" height="512" 
            style={{position: 'absolute', zIndex:0, top:120, left:500}}>
          </canvas>
          <canvas onMouseMove={this._onMouseMove} onClick={this._onMouseClick} 
            id="canvasSketch" width="512" height="512" style={{position: 'absolute', zIndex:1, top:120}} >
          </canvas>
        </div>
        <div>
        <h3 style={{position: 'absolute', top: 150, left:1100}}>patientID : {this.patientID}</h3>
        <h4 style={{position: 'absolute', top: 180, left:1100}}>Mouse coordinates: { x } { y }</h4>
        <button type="button" class="btn btn-lg btn-primary" style={{position: 'absolute', top: 225, left:1100}} onClick={this._resetCounter}>Reset</button>
        <button type="button" class="btn btn-lg btn-primary" style={{position: 'absolute', top: 280, left:1100}} onClick={this._onSubmit}>Submit Points</button>
        </div>
      </div>;
    }
  }

  export default Annotator
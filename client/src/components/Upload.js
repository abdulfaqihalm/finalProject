import React, { Component } from 'react'
import { upload} from './DataFunctions'

class Upload extends Component {
    constructor() {
        super()

        this._onSubmit = this._onSubmit.bind(this)
    }
    
    _onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(); 
        formData.append("file", this.uploadedFile.files[0]);
        upload(formData).then( response => {
            if(response.error==="") {
                console.log("Promise of axios response: " + response.fileName)
                this.props.history.push({pathname: '/brain/annotator/'+response.patientID, state:{
                  fileName: response.fileName, patientID: response.patientID}})
            }
            else{
              console.log(response.error);
            }
        }
        );
    }
    render(){
        return(
            <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this._onSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">Please upload .dcm file</h1>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      className="file-upload"
                      id="input-file"
                      ref={(ref) => { this.uploadedFile = ref; }}
                      accept=".dcm"
                    />
                  </div>
                  <br/>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default Upload
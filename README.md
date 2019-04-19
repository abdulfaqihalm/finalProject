# Web-based Brain Tumor Semi-Automatic Segmentation and Classification 

This project was my final project as Biomedical Eng. Student 

## Getting Started

You can use the application to classify brain tumor types with three main steps : 
1. Uploading the .DICOM files 
2. Annotating the tumor region
3. Waiting for the application to display the result

### Dataset
You can download the dataset from [this](https://drive.google.com/drive/folders/1xMq05zgyZy3ewrHhwAa5heKsnZy2afXp)


### Prerequisites
- [npm 3.5 +](https://www.npmjs.com/)
- [python 3 +](https://www.python.org/downloads/)
- [anaconda](https://www.anaconda.com/)
- [mysql server 5.7 +](https://dev.mysql.com/downloads/mysql/)

### Installing

Exporting the python packages from the environment
Open the terminal, type : 

```
cd server
conda list --explicit > packages.yml

```

Exporting the javascript packages 
Open the other terminal, type:

```
cd client
npm install
```

Installing mysql server  
Open the other terminal, type:

```

```

### Running
Open the terminal, type : 

```
python app.py

```

Open the other terminal, type:

```
npm start
```

The npm will direct you automatically to the browser.

## Built With

* [Flask](http://flask.pocoo.org/) - The web backend
* [React](https://reactjs.org/) - The web frontend

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


import numpy as np
import matplotlib.pyplot as plt
import os
import pydicom

def extract(fileName, rawDataPath):
    filePath = (rawDataPath+ '/' + fileName)
    outputPath = '/home/faqih/ITB/TA/Web/server/static/rawImage'
    image = pydicom.filereader.dcmread(filePath).pixel_array
    patientID = pydicom.filereader.dcmread(filePath).PatientID
    plt.imsave(os.path.join(outputPath, fileName.split('.',1)[0])+'.png', image, cmap='gray', format='png')
    return (fileName, patientID)

if __name__ == '__main__':
    fileName = '1.dcm'
    rawDataPath = '/home/faqih/ITB/TA/Web/server/static/rawData'
    extract(fileName, rawDataPath)     

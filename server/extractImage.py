import h5py
import numpy as np
import matplotlib.pyplot as plt
import os

def extract(fileName, rawDataPath):
    filePath = (rawDataPath+ '/' + fileName)
    outputPath = '/home/faqih/ITB/TA/Web/server/static/rawImage'
    arrays = {}
    arr = {}    
    f = h5py.File(filePath, 'r')
    print(f)
    for k, v in f.items() : 
        arrays[k] = np.array(v)
        for i, j in v.items() : 
            arr[i] = np.array(j)
    image = arr['image']
    plt.imsave(os.path.join(outputPath, fileName.split('.',1)[0])+'.png', image, cmap='gray', format='png')
    return (fileName.split('.',1)[0]+'.png')

if __name__ == '__main__':
    fileName = '2.mat'
    path = '/home/faqih/ITB/TA/Web/server/data'
    extract(fileName, path)     
import numpy as np
import matplotlib.pyplot as plt
import math
from skimage.filters import gaussian
from skimage.segmentation import active_contour
import cv2
import pydicom
import os
from skimage.segmentation import (circle_level_set)
from skimage.segmentation import (morphological_geodesic_active_contour,
                                  inverse_gaussian_gradient)

def _init(x0, y0, x1, y1):
    a = (x0, y0)
    b = (x1, y1)
    radius = math.sqrt(sum([(c - d) ** 2 for c, d in zip(a, b)])) 
    init = circle_level_set((512,512), (y0, x0), radius)
    return init   

def createMask(x0, y0, x1, y1, fileName, patientID, rawDataPath):
    filePath = (rawDataPath + '/' + fileName)
    maskDataPath = '/home/faqih/ITB/TA/Web/server/static/maskData'
    segmentedImPath = '/home/faqih/ITB/TA/Web/server/static/segmentedImage'
    binaryCircle = _init(x0, y0, x1, y1)
    image = pydicom.filereader.dcmread(filePath).pixel_array
    gimage= inverse_gaussian_gradient(image, 200, 8)
    mask = morphological_geodesic_active_contour(gimage, 100, binaryCircle,
                                               smoothing=3, balloon=-1,
                                               threshold=0.6)

    fig, ax = plt.subplots(figsize=(7,7))
    plt.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
    ax.imshow(image, cmap=plt.cm.gray)
    ax.contour(mask, [0.5], colors='r', linestyles='dashed', linewidths=2)
    ax.set_xticks([]), ax.set_yticks([])
    ax.axis([0, image.shape[1], image.shape[0], 0])
    #plt.show()
    ax.figure.savefig(os.path.join(segmentedImPath, fileName.split('.',1)[0]))
    np.savez_compressed(os.path.join(maskDataPath, fileName.split('.',1)[0]+'.npz'), mask=mask)
    return (fileName, patientID)
    
if __name__ == '__main__':
    fileName = '1.dcm'
    path = '/home/faqih/ITB/TA/Web/server/static/rawData'
    patientID = '12345'
    createMask(336, 211, 312, 248, fileName, patientID, path)

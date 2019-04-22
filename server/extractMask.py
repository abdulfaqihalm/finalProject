import numpy as np
import matplotlib.pyplot as plt
import math
from skimage.filters import gaussian
from skimage.segmentation import active_contour
import cv2
import pydicom
import os

def _init(x0, y0, x1, y1):
    a = (x0, y0)
    b = (x1, y1)
    radius = math.sqrt(sum([(c - d) ** 2 for c, d in zip(a, b)])) 
    drawing = False
    s = np.linspace(0, 2*np.pi, 512)
    x_arr = x0 + radius*np.cos(s)
    y_arr = y0 + radius*np.sin(s)
    init = np.array([x_arr, y_arr]).T
    return init   

def createMask(x0, y0, x1, y1, fileName, patientID, rawDataPath):
    filePath = (rawDataPath + '/' + fileName)
    maskDataPath = '/home/faqih/ITB/TA/Web/server/static/maskData'
    segmentedImPath = '/home/faqih/ITB/TA/Web/server/static/segmentedImage'
    boundaries = _init(x0, y0, x1, y1)
    image = pydicom.filereader.dcmread(filePath).pixel_array
    snake = active_contour(gaussian(image, 3), boundaries, alpha=0.015, beta=10, gamma=0.001)
    snake = np.int0(snake)
    mask = np.zeros((512,512), np.uint8)
    mask = cv2.drawContours(mask, [snake], 0, [255,255,255],-1)

    fig, ax = plt.subplots(figsize=(7,7))
    plt.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
    ax.imshow(image, cmap=plt.cm.gray)
    ax.plot(snake[:, 0], snake[:, 1], '--r', lw=2)
    ax.set_xticks([]), ax.set_yticks([])
    ax.axis([0, image.shape[1], image.shape[0], 0])
    ax.figure.savefig(os.path.join(segmentedImPath, fileName.split('.',1)[0]))
    np.savez_compressed(os.path.join(maskDataPath, fileName.split('.',1)[0]+'.npz'), mask=mask)
    return (fileName, patientID)
    
if __name__ == '__main__':
    fileName = '1.dcm'
    path = '/home/faqih/ITB/TA/Web/server/static/rawData'
    createMask(213, 329, 239, 372, fileName, path)

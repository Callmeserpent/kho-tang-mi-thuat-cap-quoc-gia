#   _*_ coding:utf-8 _*_
from PIL import Image

__author__ = 'admin'

def transform(im):
    im = im.convert("L")
    #   initializationtxt
    txt = ""
    for i in range(im.size[1]):
        for j in range(im.size[0]):
            grey = im.getpixel((j, i))
            #   The smaller the gray value at the coordinate, the deeper the gray program, and the closer the corresponding replacement character should beascii_charIn front of
            txt += ascii_char[int(grey / unit)]
        txt += '\n'
    return txt

#   asciiCharacter list(Sorted in advance, for effect)
ascii_char = list(r"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ")
#   asciiTotal length of characters
length = len(ascii_char)
#   Gray value andascii_charThe coefficient of the character in the conversion, to ensure that the gray value will not exceed the list when converting the characterascii_char
unit = 256.0 / length
#   Open target image
im = Image.open(r"C:\Users\DELL\OneDrive\Hình ảnh\demon.png")
#   Get the size of the picture:(, 768)
width, height = im.size
#   Reduce the picture by a certain percentage(Resize the picture)
im = im.resize((int(width * 0.7), int(height * 0.3)))
print("The regenerated image size is:%d*%d" % (im.size[0], im.size[1]))


txt = transform(im)
f = open(r"C:\Users\DELL\OneDrive\Hình ảnh\drawing.txt", 'w')
f.write(txt)
f.close()
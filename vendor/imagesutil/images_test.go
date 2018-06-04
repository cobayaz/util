package imagesutil

import (
	"image/jpeg"
	"os"
	"testing"
	"time"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func TestMix(t *testing.T) {
	files, err := os.Open("./test.jpg")
	check(err)
	defer files.Close()
	pic, err := jpeg.Decode(files)
	check(err)
	rect := Rectrange{
		all:    false,
		startx: 10, starty: 20, endx: 60, endy: 70,
	}
	img := MixImg(pic, 4, rect)
	file, err := os.OpenFile("./tmp.jpeg", os.O_CREATE|os.O_WRONLY, 0600)
	check(err)
	defer file.Close()
	jpeg.Encode(file, img, &jpeg.Options{Quality: 100})
	time.Sleep(10 * time.Second)
	img = Loger()
	jpeg.Encode(file, img, &jpeg.Options{Quality: 100})
}

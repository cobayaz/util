package imagesutil

import (
	"image"
	"image/color"
)

type Rectrange struct {
	all                        bool
	startx, starty, endx, endy int
}

//swnb log
func Loger() {
}

//MixImage 创建马赛克图片
func MixImg(i image.Image, mixLevel int, rect Rectrange) image.Image {
	bounds := i.Bounds()
	sx, sy, ex, ey := bounds.Min.X, bounds.Min.Y, bounds.Max.X, bounds.Max.Y
	im := image.NewRGBA(image.Rect(sx, sy, ex, ey))
	for x := sx; x <= ex; x++ {
		for y := sy; y <= ey; y++ {
			r, g, b, a := i.At(x, y).RGBA()
			im.SetRGBA(x, y, color.RGBA{
				uint8(r >> 8), uint8(g >> 8), uint8(b >> 8), uint8(a >> 8),
			})
		}
	}
	if !rect.all {
		sx, sy, ex, ey = rect.startx, rect.starty, rect.endx, rect.endy
	}
	strip := mixLevel
	for x := sx; x < ex; x += strip {
		xnext := x + strip
		for y := sy; y < ey; y += strip {
			ynext := y + strip
			r, g, b, a := i.At(x, y).RGBA()
			for xx := x; xx <= xnext; xx++ {
				for yy := y; yy <= ynext; yy++ {
					im.Set(xx, yy, color.RGBA{uint8(r >> 8), uint8(g >> 8), uint8(b >> 8), uint8(a >> 8)})
				}
			}
		}
	}
	return im
}

package subcontract

import (
	"fmt"
	"io"
	"os"
	"strconv"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func Unpack(filePath string) {
	// 打开文件
	file, err := os.OpenFile(filePath, os.O_RDONLY, 0600)
	check(err)

	// 通讯的channel
	channel := make(chan []byte)
	// 关闭的channel
	end := make(chan bool)

	go func(c chan []byte) {
		var count int
		for {
			pack_chunk := make([]byte, 512*1024*1024)
			n, err := file.Read(pack_chunk)
			if err != nil {
				if err == io.EOF {
					fmt.Println(err)
					close(c)
					break
				} else {
					panic(err)
				}
			}
			count++
			fmt.Println(n, " read number ", count, " send to ", "pack")
			c <- pack_chunk[:n]
		}
	}(channel)

	go func(c chan []byte, endChannel chan bool) {
		var count int
		for chunk := range c {
			count++
			fmt.Println(count, " is arrived")
			fileName := "file" + strconv.Itoa(count) + ".chunk"
			file, err := os.OpenFile(fileName, os.O_WRONLY|os.O_CREATE, 0600)
			check(err)
			n, err := file.Write(chunk)
			if n != len(chunk) {
				fmt.Println(n, " is not equal to ", len(chunk))
			}
			check(err)
			fmt.Println("write ", n, " at file ", count, " over")
			file.Close()
		}
		endChannel <- true
	}(channel, end)

	<-end
}

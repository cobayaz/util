package pack

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"path/filepath"
)

func Pack(filePath string) {
	stats, err := os.Stat(filePath)
	check(err)
	if stats.IsDir() {
		fmt.Println(filePath)
	}
	channle := make(chan []byte)
	go Walk(filePath, channle)
	recieve(channle)
}

func Walk(filePath string, c chan []byte) {
	err := filepath.Walk(filePath, eachFile(c))
	close(c)
	check(err)
}

func eachFile(c chan []byte) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		fmt.Println(info.Name(), " is prepare to send")
		// open file
		file, err := os.Open(path)
		check(err)

		defer file.Close()
		fileReader := bufio.NewReader(file)

		for {
			// file chunk for each piece
			chunk := make([]byte, 1024*1024*100)
			n, err := fileReader.Read(chunk)
			if err != nil {
				if err == io.EOF {
					break
				}
				panic(err)
			}
			c <- chunk[:n]
		}
		fmt.Println(info.Name(), " end over")
		return nil
	}
}

func recieve(c chan []byte) {
	file, err := os.OpenFile("./all.iso", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0600)
	check(err)
	defer file.Close()
	for chunk := range c {
		fmt.Println("recieve chunks")
		file.Write(chunk)
		file.Sync()
		fmt.Println("chunks writed")
	}
}

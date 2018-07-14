package subcontract

import (
	"flag"
	"fmt"
	"math/rand"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func sync(file *os.File) {
	go func() {
		for {
			file.Sync()
			time.Sleep(2 * time.Second)
		}
	}()
}

func create() {
	file, err := os.OpenFile("./test.pack", os.O_WRONLY|os.O_CREATE, 0600)
	check(err)
	var num int64 = 1024 * 1024 * 1024
	n := make([]byte, num)
	sync(file)
	for _ = range n {
		_, err := file.WriteString(strconv.QuoteRuneToASCII(rand.Int31n(1000)))
		check(err)
	}
	file.Close()
}

func getPath() string {
	filePath := os.Args[1]
	filePath, err := filepath.Abs(filePath)
	check(err)
	return filePath
}

func main() {
	dirPathAddr := flag.String("pack", "none", "pack some dir files such as chunks/")
	filePathAddr := flag.String("unpack", "none", "sepreate large file into small pieces")
	createPathAddr := flag.String("create", "none", "create package for test")
	flag.Parse()

	dirPath := *dirPathAddr
	filePath := *filePathAddr
	createPath := *createPathAddr

	if dirPath == "none" && filePath == "none" {
		fmt.Println("filePath or dirPath is not legal")
	} else if dirPath != "none" && filePath != "none" {
		fmt.Println("can not point out dirPath or filePath at the same time")
	} else if dirPath == "none" {
		Unpack(filePath)
	} else {
		Pack(dirPath)
	}

	_ = createPath
}

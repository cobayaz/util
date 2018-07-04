package subcontract

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

type filePathStruct struct {
	Name     string
	filePath string
}

type filePathList []filePathStruct

func (self filePathList) Len() int {
	return len(self)
}

func (self filePathList) Less(i, j int) bool {
	namei := self[i].Name
	namej := self[j].Name
	namei, namej = strings.TrimSuffix(strings.TrimPrefix(namei, "file"), ".chunk"), strings.TrimSuffix(strings.TrimPrefix(namej, "file"), ".chunk")
	numi, err := strconv.ParseInt(namei, 10, 64)
	check(err)
	numj, err := strconv.ParseInt(namej, 10, 64)
	check(err)
	return numj > numi
}

func (self filePathList) Swap(i, j int) {
	self[i], self[j] = self[j], self[i]
}

// main function
func Pack(filePath string) {
	stats, err := os.Stat(filePath)
	check(err)
	if stats.IsDir() {
		fmt.Println(filePath)
	}
	channle := make(chan []byte, 4)
	go Walk(filePath, channle)
	recieve(channle)
}

//walk each file to  send package
func Walk(filePath string, c chan []byte) {
	for _, pathStruct := range getFilePathList(filePath) {
		path := pathStruct.filePath
		// open file
		file, err := os.Open(path)
		check(err)

		defer file.Close()
		fileReader := bufio.NewReader(file)

		for {
			// file chunk for each piece
			chunk := make([]byte, 1024*1024*512)
			n, err := fileReader.Read(chunk)
			if err != nil {
				if err == io.EOF {
					break
				}
				panic(err)
			}
			c <- chunk[:n]
		}
		fmt.Println(pathStruct.Name, " send over")
	}
	close(c)
}

//sort filepath by name
func getFilePathList(dirPath string) filePathList {
	var pathList filePathList = make(filePathList, 0, 10)
	err := filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		if err != nil {
			return err
		}
		pathList = append(pathList, filePathStruct{Name: info.Name(), filePath: path})
		return nil
	})
	check(err)
	sort.Sort(pathList)
	return pathList
}

//  recieve and comb each package
func recieve(c chan []byte) {
	file, err := os.OpenFile("./all.iso", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0600)
	check(err)
	defer file.Close()
	for chunk := range c {
		fmt.Println("recieve chunks")
		n, err := file.Write(chunk)
		check(err)
		if n != len(chunk) {
			fmt.Println("not enough")
		}
		file.Sync()
		fmt.Println("chunks writed")
	}
	file.Close()
}

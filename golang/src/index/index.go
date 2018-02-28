package main

import (
	"checkwin"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func interfaceFormat(v interface{}) (int, string) {
	var vInt int
	var str string
	switch val := v.(type) {
	case float64:
		vInt = int(val)
	case string:
		str = val
	}
	return vInt, str
}

func makeArrP(size int) [][2]int {
	arr := make([][2]int, size*size)
	var index int
	for i := 0; i < size; i++ {
		for j := 0; j < size; j++ {
			arr[index] = [2]int{i, j}
			index++
		}
	}
	return arr
}

func main() {
	data := make(map[string]interface{})
	dataInput := os.Args[1]
	err := json.Unmarshal([]byte(dataInput), &data)
	if err != nil {
		log.Fatal(err)
	}
	//整合数据
	index, _ := interfaceFormat(data["index"])
	winCount, _ := interfaceFormat(data["winCount"])
	checkSize, _ := interfaceFormat(data["checkSize"])
	_, arrString := interfaceFormat(data["arr"])
	arrP := makeArrP(checkSize)
	arr := []byte(arrString)
	fmt.Print(index, winCount, arrP, arr)
	winner := checkwin.IfWin(arr, arrP, index, winCount)
	fmt.Print(winner)
}

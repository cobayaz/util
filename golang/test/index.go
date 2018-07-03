package main

import (
	"arrjsgo"
	"fmt"
	"os"
)

func main() {
	data := os.Args[1]
	fmt.Println(data)
	arrjsgo.Mesh(data)
}

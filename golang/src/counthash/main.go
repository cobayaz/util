package main

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"io"
	"os"
	"path/filepath"
)

func main() {
	filePath := os.Args[1]
	filePath, err := filepath.Abs(filePath)
	if err != nil {
		panic(err)
	}
	fs, err := os.Open(filePath)
	if err != nil {
		panic(err)
	}
	hash := sha1.New()
	io.Copy(hash, fs)
	hashbyte := hash.Sum(nil)
	hashcode := hex.EncodeToString(hashbyte)
	fmt.Println("hashcode is " + hashcode)
}

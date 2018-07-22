package pipe

import (
	"io"
	"os"
)

func origin(file *os.File) chan []byte {
	output := make(chan []byte)
	go func() {
		defer file.Close()
		chunk := make([]byte, 1024)
		for {
			file.Read(chunk)

		}
	}()
	return output
}

// ReadFile read file just like pipe
func ReadFile(filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		panic(err)
	}
	origin(file)
	reader, writer := io.Pipe()
}

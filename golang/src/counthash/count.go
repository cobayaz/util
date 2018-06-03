package counthash

import (
	"bufio"
	"crypto/sha1"
	"io"
	"os"
)

func Count(input chan []byte) chan []byte {
	sha1hash := sha1.New()
	output := make(chan []byte)
	go func(input, output chan []byte) {
		for chunk := range input {
			sha1hash.Write(chunk)
		}
		output <- sha1hash.Sum(nil)
		close(output)
	}(input, output)
	return output
}

func IORead(file *os.File, chunkSize int, chanLens int) chan []byte {
	output := make(chan []byte, chanLens)
	go func(output chan []byte) {
		reader := bufio.NewReader(file)
		buffer := make([]byte, chunkSize)
		defer file.Close()
		for {
			n, err := reader.Read(buffer)
			if err != nil {
				if err == io.EOF {
					close(output)
					break
				} else {
					panic(err)
				}
			}
			output <- buffer[:n]
		}
	}(output)
	return output
}

package counthash

import (
	"encoding/hex"
	"os"
)

func CountHash(filePath string) string {
	file, err := os.Open(filePath)
	if err != nil {
		panic(err)
	}
	c := Count(IORead(file, 100*1024, 30))
	hash := <-c
	return hex.EncodeToString(hash)
}

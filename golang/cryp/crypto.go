package cryp

import (
	"crypto/aes"
	"crypto/cipher"
)

//sha1 from mylove "linwei"  [0:32]
const key = "5864d67cddd745e165c375e8c74c8316"

var commIV = []byte{0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f}

type CryptoSimple struct {
}

func (c *CryptoSimple) Encrypt(src string) []byte {
	return encryp(src)
}

func (c *CryptoSimple) Decrypt(code []byte) string {
	return decryp(code)
}

// 加密的代码
func encryp(plaintext string) []byte {
	c, err := aes.NewCipher([]byte(key))
	if err != nil {
		panic(err)
	}
	cfb := cipher.NewCFBEncrypter(c, commIV)
	ciphertext := make([]byte, len(plaintext))
	cfb.XORKeyStream(ciphertext, []byte(plaintext))
	return ciphertext
}

// 解密的代码
func decryp(ciphertext []byte) string {
	c, err := aes.NewCipher([]byte(key))
	if err != nil {
		panic(err)
	}
	cfbdec := cipher.NewCFBDecrypter(c, commIV)
	plaintextCopy := make([]byte, len(ciphertext))
	cfbdec.XORKeyStream(plaintextCopy, ciphertext)
	return string(plaintextCopy)
}

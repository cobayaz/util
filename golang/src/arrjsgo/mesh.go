package arrjsgo

import (
	"encoding/json"
	"fmt"
)

//Mesh take json arr to go arr
func Mesh(jsonstr string) {
	var data []string
	json.Unmarshal([]byte(jsonstr), &data)
	for _, v := range data {
		if v == "" {
			fmt.Println("sdda" + v + "dasdas")
		}
		fmt.Println(v)
	}
}

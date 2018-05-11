package timer

import (
	"fmt"
	"time"
)

func SetTimeout(callback func(c chan bool), t time.Duration) {
	c := make(chan bool)
	go func(c chan bool) {
		time.Sleep(t)
		callback(c)
	}(c)
	<-c
}

func SetInterval(callback func(c chan bool), t time.Duration) {
	c := make(chan bool)
	go func(c chan bool) {
		for {
			time.Sleep(t)
			go callback(c)
		}
	}(c)
	fmt.Println("end")
}

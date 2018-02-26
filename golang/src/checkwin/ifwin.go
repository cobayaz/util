package checkwin

import (
	"fmt"
)

func main() {
	c := &channel{
		4,
		make(chan bool),
		make(chan []int),
	}
	// go colWin(c.signalChan)
	// go rowWin()
	go func() {}()
	go func() {}()
	for i := 0; i < c.count; i++ {
		if <-c.signalChan {
			winArr := <-c.winArrChan
			fmt.Print(winArr)
			return
		}
	}
	if c.count == 0 {
		fmt.Print("no win")
	}
}

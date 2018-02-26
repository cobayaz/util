package checkwin

//arr表示数据点阵 []byte
//arrP 位置点阵 [][2]unit8 0-255
//pos 点击的位置坐标	[2]unit8 2-255
//index 点击的位置序号 unit16 0-2^16
//pos=arrP[index]
//winCount 输赢数目 unit16 0-2^16

type channel struct {
	count      int
	signalChan chan bool
	winArrChan chan []int
}

func sort(arr []int, winCount int) ([]int, bool) {
	//当数组的大小小于winCount的时候,退出false
	if len(arr) < winCount {
		return nil, false
	}
	for i := 0; i < len(arr)-1; i++ {
		if arr[i]+1 != arr[i+1] {
			//当末尾的序列号大于winCount
			if i+1 >= winCount {
				return arr, true
			}
			return sort(arr[i+1:], winCount)
		} else if i == len(arr)-2 && i+2 >= winCount {
			return arr, true
		}
	}
	return nil, false
}

func colWin(arr []byte, arrP [][2]int, index int, pos [2]int, winCount int, c channel) {
	var rowArr []int
	for i, v := range arrP {
		//空棋子
		if arr[i] == 0 {
			continue
		}
		//列数相同和元素相同
		if v[1] == pos[1] && arr[index] == arr[i] {
			//添加行的数目
			rowArr = append(rowArr, v[0])
		}
	}
	//排序
	winArr, winFlag := sort(rowArr, winCount)
	if winFlag {
		c.signalChan <- winFlag
		c.winArrChan <- winArr
		return
	}
	c.signalChan <- winFlag
}

func rowWin(arr []byte, arrP [][2]int, index int, pos [2]int, winCount int, c channel) {
	var colArr []int
	for i, v := range arrP {
		//空棋子
		if arr[i] == 0 {
			continue
		}
		//行数相同和元素相同
		if v[0] == pos[0] && arr[index] == arr[i] {
			//添加列的数目
			colArr = append(colArr, v[1])
		}
	}
	//排序
	winArr, winFlag := sort(colArr, winCount)
	if winFlag {
		//赢了就输出
		c.signalChan <- winFlag
		c.winArrChan <- winArr
		return
	}
	c.signalChan <- winFlag
}

func rcLeft(arr []byte, arrP [][2]int, index int, pos [2]int, winCount int, c channel) {
	var leftArr []int
	for i, v := range arrP {
		//空棋子
		if arr[i] == 0 {
			continue
		}
		//对角线相同和元素相同
		if v[0]-pos[0] == v[1]-pos[1] && arr[index] == arr[i] {
			//添加行的数目
			leftArr = append(leftArr, v[0])
		}
	}
	//排序
	winArr, winFlag := sort(leftArr, winCount)
	if winFlag {
		c.signalChan <- winFlag
		c.winArrChan <- winArr
		return
	}
	c.signalChan <- winFlag
}
func rcRight(arr []byte, arrP [][2]int, index int, pos [2]int, winCount int, c channel) {
	var rightArr []int
	for i, v := range arrP {
		//空棋子
		if arr[i] == 0 {
			continue
		}
		//右对角线相同和元素相同
		if v[0]-pos[0] == pos[1]-v[1] && arr[index] == arr[i] {
			//添加行的数目
			rightArr = append(rightArr, v[0])
		}
	}
	//排序
	winArr, winFlag := sort(rightArr, winCount)
	if winFlag {
		c.signalChan <- winFlag
		c.winArrChan <- winArr
		return
	}
	c.signalChan <- winFlag
}

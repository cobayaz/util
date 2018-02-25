package checkwin

//arr表示数据点阵 []byte
//arrP 位置点阵 [][2]unit8 0-255
//pos 点击的位置坐标	[2]unit8 2-255
//index 点击的位置序号 unit16 0-2^16
//pos=arrP[index]
//winCount 输赢数目 unit16 0-2^16

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

func colWin(arr []byte, arrP [][2]int, index int, pos [2]int, winCount int, signalChan chan bool, winArrChan chan []int) {
	var rowArr []int
	for i, v := range arrP {
		//空棋子
		if arr[i] == 0 {
			break
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
		signalChan <- winFlag
		winArrChan <- winArr
	}
	signalChan <- winFlag
}

func rWin() {

}

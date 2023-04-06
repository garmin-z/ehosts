package utils

import (
	"fmt"
	"os/exec"
	"strings"

	"github.com/axgle/mahonia"
)

func Exec() {
	cmd := exec.Command("ping", "baidu.com")

	out, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Printf("错误： %v", err.Error())
		return
	}

	if err := cmd.Start(); err != nil {
		fmt.Printf("错误： %v", err.Error())
		return
	}

	result := make([]byte, 1024)

	for {
		n, err := out.Read(result)
		if err != nil {
			fmt.Printf("错误： %v", err.Error())
			break
		}

		if n > 0 {
			enc := mahonia.NewDecoder("gbk")
			buf := []byte(enc.ConvertString(string(result[:n])))
			fmt.Println(string(buf))
		}

		if strings.Contains(string(result[:n]), "packets transmitted") {
			break
		}
	}

	if err := cmd.Wait(); err != nil {
		fmt.Println(err)
		return
	}
}

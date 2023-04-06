package utils

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

func Set(ip string, url string) {
	// 读取 hosts 文件
	hostsPath := filepath.Join(os.Getenv("SystemRoot"), "System32", "drivers", "etc", "hosts")
	file, err := os.OpenFile(hostsPath, os.O_RDWR, 0644)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	lines := []string{}
	// ip := "192.168.1.111"
	// url := "baidu.com"
	hasUrl := false
	currentTime := time.Now()
	format := "2006-01-02 15:04:05"
	for scanner.Scan() {
		line := scanner.Text()
		// 如果找到目标域名，将其替换为指定 IP 地址
		if strings.Contains(line, url) {
			hasUrl = true
			re, _ := regexp.Compile(fmt.Sprintf("^%s ", ip))
			if !re.MatchString(line) {
				line = fmt.Sprintf("%s %s # modify time %v", ip, url, currentTime.Format(format))
			}
		}
		lines = append(lines, line)
	}
	if !hasUrl {
		// fmt.Println("当前时间为：", currentTime.Format(format))
		lines = append(lines, fmt.Sprintf("%s %s # refresh time %v", ip, url, currentTime.Format(format)))
	}

	// 将修改后的 hosts 文件写回磁盘
	file.Truncate(0)
	file.Seek(0, 0)
	writer := bufio.NewWriter(file)
	for _, line := range lines {
		fmt.Println(line)
		fmt.Fprintln(writer, line)
	}
	writer.Flush()
}

func Get(fp string) {
	file, err := os.OpenFile(fp, os.O_RDWR, 0644)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer file.Close()
	// scanner := bufio.NewScanner(file)
	// lines := []string{}
}

package handlers

import (
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// 文件读取的响应结构体
type FileReadResponse struct {
	Errno int         `json:"errno"` // 错误码
	Msg   string      `json:"msg"`   // 错误信息
	Data  interface{} `json:"data"`  // 文件数据
}

// 文件读取的处理函数
func FileReadHandler(c *gin.Context) {
	// 获取传入的文件路径参数
	// filePath := c.Param("filepath")
	hostsPath := filepath.Join(os.Getenv("SystemRoot"), "System32", "drivers", "etc", "hosts")

	// fmt.Print(filePath)
	// 使用 ioutil 包读取文件内容
	data, err := ioutil.ReadFile(hostsPath)
	if err != nil {
		// 发生错误时返回错误响应
		c.JSON(http.StatusInternalServerError, FileReadResponse{
			Errno: 500,
			Msg:   "读取文件失败",
			Data:  nil,
		})
		return
	}

	// 返回成功响应
	c.JSON(http.StatusOK, FileReadResponse{
		Errno: 0,
		Msg:   "读取文件成功",
		Data:  string(data),
	})
}

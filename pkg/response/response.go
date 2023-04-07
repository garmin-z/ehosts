package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Response 是响应结构体
type Response struct {
	Errno int         `json:"errno"`
	Msg   string      `json:"msg"`
	Data  interface{} `json:"data,omitempty"`
}

// NewResponse 创建一个新的响应实例
func NewResponse(errno int, msg string, data interface{}) *Response {
	return &Response{
		Errno: errno,
		Msg:   msg,
		Data:  data,
	}
}

// WriteJSONResponse 将响应写入 gin.Context，并设置 Content-Type 为 application/json
func WriteJSONResponse(c *gin.Context, code int, errno int, msg string, data interface{}) {
	response := NewResponse(errno, msg, data)
	c.JSON(code, response)
}

// 成功响应
func SuccessResponse(c *gin.Context, errno int, data interface{}) {
	WriteJSONResponse(c, http.StatusOK, errno, "OK", data)
}

// 错误响应 - 客户端错误 (4xx)
func ClientErrorResponse(c *gin.Context, errno int, msg string, data interface{}) {
	WriteJSONResponse(c, http.StatusFound, errno, msg, data)
}

// 错误响应 - 未授权 (401)
func UnauthorizedResponse(c *gin.Context, msg string) {
	WriteJSONResponse(c, http.StatusUnauthorized, 1, msg, nil)
}

// 错误响应 - 禁止访问 (403)
func ForbiddenResponse(c *gin.Context, msg string) {
	WriteJSONResponse(c, http.StatusForbidden, 1, msg, nil)
}

// 错误响应 - 资源不存在 (404)
func NotFoundResponse(c *gin.Context, msg string) {
	WriteJSONResponse(c, http.StatusNotFound, 1, msg, nil)
}

// 错误响应 - 请求方法不允许 (405)
func MethodNotAllowedResponse(c *gin.Context, msg string) {
	WriteJSONResponse(c, http.StatusMethodNotAllowed, 1, msg, nil)
}

// 错误响应 - 服务器错误 (5xx)
func ServerErrorResponse(c *gin.Context, msg string) {
	WriteJSONResponse(c, http.StatusInternalServerError, 1, msg, nil)
}

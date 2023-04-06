package utils

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ApiResponse 代表一个响应给客户端的消息结构，包括错误码，错误消息，响应数据
type ApiResponse struct {
	RequestId string      `json:"request_id"`     // 请求的唯一ID
	ErrCode   int         `json:"err_code"`       // 错误码，0表示无错误
	Message   string      `json:"message"`        // 提示信息
	Data      interface{} `json:"data,omitempty"` // 响应数据，一般从这里前端从这个里面取出数据展示
}

// 自定义错误码，通常错误由错误码和错误信息两部分组成，便于跟踪和维护错误信息
// 错误码为0表示成功
// 错误码3开头，表示第三方api调用错误
// 错误码4开头，表示业务层面的错误，比如校验等
// 错误码5开头，表示服务器错误，比如数组越界等
// ----------------------------------
// 错误码过多时，可以根据业务功能拆分到不同的文件或者包中

const (
	// Success 表示成功
	Success = 0
	// Unknown 无法预知或者未手动处理的错误
	Unknown = -1
)

const (
	// MpApiErr 小程序接口调用错误
	MpApiErr = iota + 30000
)

const (
	// ValidateErr 校验错误
	ValidateErr = iota + 40000
	// RequireAuthErr 没有权限
	RequireAuthErr
	// NotFoundErr 没有记录
	NotFoundErr
	// UserLoginErr 登录错误
	UserLoginErr
	// AuthTokenErr token 鉴权错误或权限不足
	AuthTokenErr
	// RecordCreateErr 创建记录，数据持久化失败
	RecordCreateErr
)

const (
	// TransactionErr 事物提交失败
	TransactionErr = iota + 60000
	// DuplicateErr 记录存在重复
	DuplicateErr
)

const (
	// RequestId 请求id名称
	RequestId = "request_id"
	// TimeLayout 时间格式
	TimeLayout   = "2006-01-02 15:04:05"
	TimeLayoutMs = "2006-01-02 15:04:05.000"
	// UserID 用户id key
	UserID = "user_id"
)

// JSON 发送json格式的数据
func JSON(c *gin.Context, err error, data interface{}) {
	errCode, message := DecodeErr(err)
	// 如果code != 0, 失败的话 返回http状态码400（一般也可以全部返回200）
	// 返回400 更严谨一些，个人接触的项目中大部分都是400。
	var httpStatus int
	if errCode != Success {
		httpStatus = http.StatusBadRequest
	} else {
		httpStatus = http.StatusOK
	}
	c.JSON(httpStatus, ApiResponse{
		RequestId: c.GetString(RequestId),
		ErrCode:   errCode,
		Message:   message,
		Data:      data,
	})
}

// bizErrWithCode 自定义业务错误。拓展自https://github.com/pkg/errors
type bizErrWithCode struct {
	code  int
	msg   string
	cause error
}

func DecodeErr(err error) (int, string) {
	if err == nil {
		return Success, "success"
	}
	var b *bizErrWithCode
	if errors.As(err, &b) {
		return b.code, b.GetMsg()
	}
	return Unknown, err.Error()
}

func (b *bizErrWithCode) GetMsg() string {
	msg := b.msg
	if b.cause != nil {
		msg += ", " + b.cause.Error()
	}
	return msg
}

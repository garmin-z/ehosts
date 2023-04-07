package router

import (
	"github.com/gin-gonic/gin"
)

type Web struct{}

func (w *Web) Router(engine *gin.RouterGroup) {
	group := engine.Group("/")

	group.GET("/", func(ctx *gin.Context) {
		ctx.HTML(200, "index.html", gin.H{"message": "这是模板渲染"})
	})
}

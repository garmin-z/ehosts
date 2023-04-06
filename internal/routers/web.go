package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Web struct{}

func (w *Web) Router(engine *gin.RouterGroup) {
	group := engine.Group("/")
	group.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "message")
	})
}

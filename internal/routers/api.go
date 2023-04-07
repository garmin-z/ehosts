package router

import (
	handlers "ehosts/internal/handlers/hosts"

	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Api struct{}

func (a *Api) Router(engine *gin.RouterGroup) {
	group := engine.Group("/api")
	fmt.Print(group)

	group.GET("/hosts", handlers.FileReadHandler)

	group.PUT("/hosts", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "message")
	})

	group.GET("/smg", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "messagse")
	})
}

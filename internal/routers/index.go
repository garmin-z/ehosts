package router

import (
	middleware "ehosts/internal/middlewares"
	"log"

	"github.com/gin-gonic/gin"
)

func Init(e *gin.Engine) {
	gin.DebugPrintRouteFunc = func(httpMethod, absolutePath, handlerName string, nuHandlers int) {
		log.Printf("endpoint %v %v %v %v\n", httpMethod, absolutePath, handlerName, nuHandlers)
	}
	e.Use(gin.Recovery())

	registerRouter(e)
}

// 注册路由
func registerRouter(router *gin.Engine) {
	router.Static("/assets", "./template/client/dist/assets")
	router.LoadHTMLGlob("template/client/dist/index.html")
	router.NoRoute(func(c *gin.Context) {
		// c.File("index.html")
		c.HTML(200, "index.html", gin.H{"message": "这是模板渲染"})

	})
	engine := router.Group("/")
	engine.Use(middleware.Cors())

	new(Api).Router(engine)
	new(Web).Router(engine)
	// routes := router.Routes()
	// for _, route := range routes {
	// 	fmt.Println(route.Method, route.Path)
	// }
}

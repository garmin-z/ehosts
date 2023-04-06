package main

import (
	githubIp "ehosts/pkg/github_ip"
	"ehosts/public/router"

	"github.com/gin-gonic/gin"
)

func main() {
	// utils.Set()

	engine := gin.Default()
	router.Init(engine)
	// ip, _ := utils.GetLocalIP()

	// utils.Set("140.82.114.21", "education.github.com")
	// utils.Exec()
	i := new(githubIp.FetchIps)
	i.FetchIps()
	// fmt.Printf(" \n本地局域网IP：\033[31mhttp://%s:16033\033[0m \n", ip)
	// engine.Run(":16033")
}

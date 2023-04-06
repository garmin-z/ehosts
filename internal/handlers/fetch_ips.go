package githubIp

import (
	"ehosts/utils"
	"errors"
	"fmt"
	"net/http"

	"golang.org/x/net/html"
)

type FetchIps struct{}

var GITHUB_URLS = []string{
	"alive.github.com",
	"api.github.com",
	"assets-cdn.github.com",
	"avatars.githubusercontent.com",
	"avatars0.githubusercontent.com",
	"avatars1.githubusercontent.com",
	"avatars2.githubusercontent.com",
	"avatars3.githubusercontent.com",
	"avatars4.githubusercontent.com",
	"avatars5.githubusercontent.com",
	"camo.githubusercontent.com",
	"central.github.com",
	"cloud.githubusercontent.com",
	"codeload.github.com",
	"collector.github.com",
	"desktop.githubusercontent.com",
	"favicons.githubusercontent.com",
	"gist.github.com",
	"github-cloud.s3.amazonaws.com",
	"github-com.s3.amazonaws.com",
	"github-production-release-asset-2e65be.s3.amazonaws.com",
	"github-production-repository-file-5c1aeb.s3.amazonaws.com",
	"github-production-user-asset-6210df.s3.amazonaws.com",
	"github.blog",
	"github.com",
	"github.community",
	"github.githubassets.com",
	"github.global.ssl.fastly.net",
	"github.io",
	"github.map.fastly.net",
	"githubstatus.com",
	"live.github.com",
	"media.githubusercontent.com",
	"objects.githubusercontent.com",
	"pipelines.actions.githubusercontent.com",
	"raw.githubusercontent.com",
	"user-images.githubusercontent.com",
	"vscode.dev",
	"education.github.com",
}

func (fi *FetchIps) WriteFile(hc string, ut string) {

	fmt.Println(GITHUB_URLS)
}

func (fi *FetchIps) FetchIps() {

	urlIps := map[string]string{}
	for _, v := range GITHUB_URLS {
		ip, err := fi.GetIp(v)
		if err == nil {
			urlIps[ip] = v
			utils.Set(ip, v)
		}
	}

	fmt.Println(urlIps)
}

func (fi *FetchIps) GetIp(url string) (string, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", fmt.Sprintf("https://www.ipaddress.com/site/%v", url), nil)
	if err != nil {
		return "", errors.New(fmt.Sprintf("%v : %v", url, err.Error()))
	}

	// 设置请求头，例如User-Agent
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		return "", errors.New(fmt.Sprintf("%v : %v", url, err.Error()))

	}
	defer resp.Body.Close()

	// 获取指定dom元素
	doc, err := html.Parse(resp.Body)
	if err != nil {
		return "", errors.New(fmt.Sprintf("%v : %v", url, err.Error()))
	}

	node := findNode(doc, func(n *html.Node) bool {
		return n.Type == html.ElementNode && n.Data == "ul" && containsAttrClass(n, "separated2")
	})
	if node == nil {
		return "", errors.New(fmt.Sprintf("%v Node not found.", url))
	}

	ip := findIpVal(node)
	if ip == "" {
		return "", errors.New(fmt.Sprintf("%v no fund ip!", url))
	}
	return ip, nil
}

func findIpVal(n *html.Node) string {
	if n.FirstChild != nil {
		return findIpVal(n.FirstChild)
	}
	return n.Data
}
func findNode(n *html.Node, match func(*html.Node) bool) *html.Node {
	if match(n) {
		return n
	}
	for c := n.FirstChild; c != nil; c = c.NextSibling {
		if node := findNode(c, match); node != nil {
			return node
		}
	}
	return nil
}

func containsAttrClass(n *html.Node, name string) bool {
	for _, attr := range n.Attr {
		if attr.Key == "class" && attr.Val == name {
			return true
		}
	}
	return false
}

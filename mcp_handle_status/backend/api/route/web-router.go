package route

import (
	"embed"
	"net/http"
	"github.com/WeatherPal-AI/MCP-handle/mcp_handle_status/backend/api/middleware"
	"github.com/WeatherPal-AI/MCP-handle/mcp_handle_status/backend/common"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func setWebRouter(route *gin.Engine, buildFS embed.FS, indexPage []byte) {
	route.Use(middleware.GlobalWebRateLimit())
	route.Use(middleware.Cache())
	route.Use(static.Serve("/", common.EmbedFolder(buildFS, "frontend/dist")))
	route.NoRoute(func(c *gin.Context) {
		c.Data(http.StatusOK, "text/html; charset=utf-8", indexPage)
	})
}

package route

import (
	"embed"
	"github.com/WeatherPal-AI/MCP-handle/mcp_handle_status/backend/api/middleware"
	"github.com/WeatherPal-AI/MCP-handle/mcp_handle_status/backend/common"

	"github.com/gin-gonic/gin"
)

func SetRouter(route *gin.Engine, buildFS embed.FS, indexPage []byte) {
	// Apply CORS middleware globally
	route.Use(middleware.CORS())

	// Conditionally apply gzip middleware based on configuration
	if common.GetEnableGzip() {
		// Apply gzip middleware to the entire application
		route.Use(middleware.GzipDecodeMiddleware()) // Decode gzipped requests
		route.Use(middleware.GzipEncodeMiddleware()) // Compress responses with gzip
	}

	SetApiRouter(route)
	setWebRouter(route, buildFS, indexPage)
}

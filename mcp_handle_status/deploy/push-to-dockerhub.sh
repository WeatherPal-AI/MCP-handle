#!/bin/bash
set -e

VERSION=$(cat ../VERSION)
DOCKER_REPO="buru2020/mcp-handle-status"

echo "Setting up Docker Buildx for multi-architecture builds..."

# 检查 Docker 登录状态
echo "Checking Docker login status..."
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker daemon is not running or not accessible"
    exit 1
fi

# 验证 Docker Hub 登录
echo "Verifying Docker Hub authentication..."
if ! docker system info | grep -q "Username:"; then
    echo "Warning: Not logged in to Docker Hub"
    echo "Please run: docker login"
    read -p "Do you want to login now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker login
    else
        echo "Exiting..."
        exit 1
    fi
fi

# 清理可能的缓存问题
# echo "Cleaning up Docker buildx cache..."
# docker buildx prune -f || true

# 创建并使用多架构构建器（如果不存在）
if ! docker buildx ls | grep -q multiarch; then
    echo "Creating multiarch builder..."
    docker buildx create --use --name multiarch --driver docker-container
else
    echo "Using existing multiarch builder..."
    docker buildx use multiarch
fi

# 确保构建器正在运行
echo "Inspecting and starting builder..."
docker buildx inspect --bootstrap

echo "Building and pushing multi-architecture images..."
echo "Building version: $VERSION"

# 构建并推送多架构镜像（同时推送 latest 和版本标签）
docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t $DOCKER_REPO:latest \
    -t $DOCKER_REPO:$VERSION \
    --push \
    ../

echo "Successfully pushed multi-architecture images to Docker Hub!"
echo "Latest: https://hub.docker.com/r/$DOCKER_REPO/tags"
echo "Supported platforms: linux/amd64, linux/arm64"
echo ""
echo "You can now pull the image with:"
echo "  docker pull $DOCKER_REPO:latest"
echo "  docker pull $DOCKER_REPO:$VERSION"
echo ""
echo "Verifying multi-architecture manifest:"
docker buildx imagetools inspect $DOCKER_REPO:latest 
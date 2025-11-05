#!/bin/bash

echo "========================================"
echo "  MCP-Handle 项目介绍网站"
echo "========================================"
echo ""

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "[1/2] 正在安装依赖..."
    npm install
    echo ""
else
    echo "[跳过] 依赖已安装"
    echo ""
fi

echo "[2/2] 启动开发服务器..."
echo ""
echo "服务器将在 http://localhost:5173 启动"
echo "按 Ctrl+C 停止服务器"
echo ""
echo "========================================"
echo ""

npm run dev


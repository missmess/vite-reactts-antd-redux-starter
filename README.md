# Vite + React scaffold

通用的Vite for React快速启动脚手架，已经集成了全生态的常用三方框架。

## 框架
- Vite
- React, use Hooks Api
- TypeScript
- Antd
- Redux, use redux toolkit
- React Router
- Eslint
- Prettier
- Axios
- Sass

## 安装

clone项目或者下载项目压缩包，然后 `yarn install`

## 启动

在依赖包全部安装成功后运行：

```
yarn dev
```

## 示例页面

该脚手架同时添加了一个中后台管理的常见的一个示例demo。
包括**Login页面**（用户信息使用redux），**管理页面**，**404页面**。

管理页面中，为了方便菜单和路由的配置，在demo中已经自带了下列功能：
- 支持配置式路由，直接在一个文件中（亦可自行修改为从网络读取）配置左侧菜单项和所有可访问界面
- 支持n级菜单
- 解决了react-router与antd组件难以融合的问题
- 左侧菜单项与路由绑定，完美联动
- 面包屑与路由绑定，完美联动

*界面截图如下：*

![管理页面截图](https://raw.githubusercontent.com/missmess/vite-reactts-antd-redux-starter/master/snapshot/1.png "管理页面截图")

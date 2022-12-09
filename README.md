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
- Less

## 安装

支持三种方式，推荐第三种：

1. clone项目
2. 下载项目压缩包并解压
3. npx degit missmess/vite-reactts-antd-redux-starter (my-project-name)

## 启动

执行`yarn install`，在依赖包全部安装成功后运行：

```
yarn dev
```

## 已支持功能

该脚手架同时添加了一个中后台管理的常见的一个示例demo。

在demo中已经支持了下列功能：
- 支持配置式路由，直接在menus.tsx中（亦可自行修改为从网络读取json）配置左侧菜单项和所有可访问界面
- 配置式路由支持的组件包括：微应用组件，pages下的页面，iframe内嵌网页，外链网址等
- 支持n级嵌套菜单
- 解决了react-router与antd组件难以融合的问题
- 左侧菜单项与路由绑定，完美联动
- 面包屑与路由绑定，完美联动
- 已集成idaas（需要手动修改clientId和serviceId）

*界面截图如下：*

![管理页面截图](https://gitlab.chehejia.com/li-cfe/share-code/vite-reactts-antd-redux-starter/-/raw/master/snapshot/1.png "管理页面截图")

*示例menu配置（src/pages/home/menus.tsx）*

![menus.tsx](https://gitlab.chehejia.com/li-cfe/share-code/vite-reactts-antd-redux-starter/-/raw/master/snapshot/2.png "menus.tsx")

### 关于作者
有任何问题和BUG，欢迎反馈给我，可以用以下联系方式跟我交流：

* 邮箱：<478271233@qq.com>
* GitHub: [@missmess](https://github.com/missmess)

---
###### CopyRight：`missmess`

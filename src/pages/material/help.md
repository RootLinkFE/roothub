

### 官方物料仓库

[vue物料](https://git.souche-inc.com/loan/magic-park/vue-materials)
[React物料](https://git.souche-inc.com/loan/magic-park/vue-materials)

通过向官方仓库拉分支开发，开发完成后提mr或者pr给管理员，codeReview后合到主分支，就完成了上架官方物料市场。

下面会介绍各种物料的开发方式      

### 区块开发

下面以vue区块开发为例 UserInfo

```
git clone git@git.souche-inc.com:loan/magic-park/vue-materials.git

git checkout -b block/UserInfo
```

克隆对应的官方仓库到本地


```
mp add
```

选择你想开发的物料类型并填写相关信息，完成后在blocks下会生成包含基础代码的文件夹
```
-UserInfo
    --src  // 编写代码的地方
        --index.vue
        ...
    --README.md // 说明文件
    --package.json // 版本信息，名称，维护人等信息
```    

注意👹：区块代码中不能依赖除node_modules和区块文件夹src以外的文件，因为区块被下载时，只会下载区块的src目录，可以把区块想象成一个未打包的组件。



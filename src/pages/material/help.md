

### 官方物料仓库

[vue物料](https://git.souche-inc.com/loan/magic-park/vue-materials)
[React物料](https://git.souche-inc.com/loan/magic-park/vue-materials)

通过向官方仓库拉分支开发，开发完成后提mr或者pr给管理员，codeReview后合到主分支，就完成了上架官方物料市场。

下面会介绍各种物料的开发方式      

### 区块

区块位于仓库中的blocks文件夹下，一个文件夹对应一个区块，文件夹名称大写，此名称也是区块的名称。

区块代码中不能依赖除node_modules和区块文件夹src以外的文件，因为区块被下载时，只会下载区块的src目录，

可以把区块想象成一个未打包的组件。

目录结构如下

```
-BlockName
    --src  // 编写代码的地方
        --index.vue
        --img.png
        ...
    --README.md // 说明文件
    --package.json // 版本信息，名称，维护人等信息
```

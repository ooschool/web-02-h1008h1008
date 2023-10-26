# web-02-h1008h1008
web-02-h1008h1008 created by GitHub Classroom
# web-02-h1008h1008
web-02-h1008h1008 created by GitHub Classroom
電商網站
## 安裝
### 取得專案
使用 git clone 命令來複製專案到你的本地機器上：
```bash
git@github.com:ooschool/web-02-h1008h1008.git
```

```bash
cd /web-02-h1008h1008
```


### 安裝套件
在專案目錄中執行以下命令以安裝所需的套件：
```bash
npm install
```


### 運行專案
執行以下命令以啟動專案：      
```bash
node app.js
```


### 開啟專案
在瀏覽器中打開以下 URL 以查看你的專案：
http://localhost:8000/


## 資料夾說明

- views - 畫面放置處
  - layouts main.handlebars檔案放置處
  - static - 靜態資源放置處
...

## 本地数据库连接指南

这个文档将指导你如何在本地环境中连接到数据库，使用 Sequelize 和提供的配置信息。

### 步骤 1: 安装 Sequelize
确保你的本地环境已经安装了 Node.js 和 npm。然后，在你的项目目录中运行以下命令安装 Sequelize 和 MySQL 驱动程序：
```bash
npm install sequelize mysql2
```

### 步骤 2: 初始化项目
创建数据库：如果 'web02' 数据库不存在，你可以在数据库服务器上创建一个新的数据库。

```sql
CREATE DATABASE web02;
```

### 步骤 3: 测试数据库连接
使用以下命令测试数据库连接是否正常工作：
```bash
sequelize db:seed:all
```
如果一切设置正确，你应该能够成功连接到数据库。

### 步骤 4: 運行create.js 來創建table
使用以下命令來創建table：
```bash
node ./create.js
```

### 步骤 5: 運行seed.js 來創建種子資料
使用以下命令來創建種子資料：
```bash
node ./seed.js
```

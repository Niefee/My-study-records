# Git

## Git命令

### git init

在命令行输入`git init`，会在当前的目录创建新仓库。

### git clone

在命令行输入`git clone`，会克隆一个git的仓库到本目录下。

>如果一个仓库包含另一个仓库，有可能报错。

### git add

你的本地仓库由 git 维护的三棵“`树`”组成。第一个是你的 `工作目录`，它持有实际文件；第二个是 `暂存区（Index）`，它像个缓存区域，临时保存你的改动；最后是 `HEAD`，它指向你最后一次提交的结果。

```bash
## 你可以提出更改（把它们添加到暂存区），使用如下命令：
git add <filename>
git add *
```

### git status

`git status`命令用于查看项目的当前状态。

### git commit

```bash
git commit -m "代码提交信息"
```
用命令`git commit`告诉Git，把文件提交到仓库。
`-m`后面输入的是本次提交的说明。

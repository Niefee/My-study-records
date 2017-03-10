<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Git](#git)
    * [Git命令](#git命令)
        * [git init](#git-init)
        * [git clone](#git-clone)
        * [git add](#git-add)
        * [git status](#git-status)
        * [git commit](#git-commit)
        * [git diff](#git-diff)
        * [git push](#git-push)
        * [git remote](#git-remote)

<!-- tocstop -->

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

### git diff

`git diff`可以查看还没有提交到暂存区的文件的变化情况。显示的格式正是Unix通用的diff格式。

### git push

```bash
git push origin master
```
把本地仓库中的`HEAD`提交到远端的仓库中。

`master`可以换成你想要推送的任何分支。

### git remote

 - 生成ssh秘钥

```bash
ssh-keygen -t rsa -C "abcd@efgh.com" //github登录邮箱
```

把生成的秘钥添加到GitHub中，名字可以随意，秘钥内容不可更改。

测试是否成功添加了

```bash
>ssh git@github.com
##正常情况下，回显如下
PTY allocation request failed on channel 0
Hi Xxx! You\'ve successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
```

然后远程推送

```bash
git remote add origin https://github.com/UserName/gitTest.git
git push -u origin master
```

>第一次要添加 -u 这个参数。这样Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

>资料：[http://www.cnblogs.com/plinx/archive/2013/04/08/3009159.html](http://www.cnblogs.com/plinx/archive/2013/04/08/3009159.html)

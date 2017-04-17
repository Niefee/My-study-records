
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Linux命令](#linux命令)
    * [基本常用命令](#基本常用命令)
        * [man](#man)
        * [cd](#cd)
        * [ls](#ls)

<!-- tocstop -->

# Linux命令

## 基本常用命令

### man

可以通过 `man` 命令获取帮助。执行以后，在 man page 页面中按 `q` 退出。

```bash
#查看ls命令使用文档
man ls

#查看cp命令使用文档
man cp
```

### cd
`cd` 是打开某个路径的命令，也就是打开某个文件夹，并跳转到该处。

```bash
cd path[相对路径或绝对路径]      ### path 为你要打开的路径。
```

其中 `path` 有绝对路径和相对路径之分，绝对路径强调从 `/` 起，一直到所在路径。相对路径则相对于当前路径来说，假设当前家目录有`etc` 文件夹（绝对路径应为 `/home/username/etc`），如果直接 `cd etc` 则进入此文件夹，但若是 `cd /etc/` 则是进入系统 `etc` ，多琢磨一下就可以理解了。另外在 Linux 中， `.` 代表当前目录， `..` 代表上级目录，因此返回上级目录可以 `cd ..` 。

### ls

`ls` 即 list ，列出文件。

选项与参数：

```bash
ls -a ：全部的文件，连同隐藏档( 开头为 . 的文件) 一起列出来(常用)
ls -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
ls -l ：长数据串列出，包含文件的属性与权限等等数据(常用)
ls -l ：列出当前目录可见文件详细信息
ls -hl ：列出详细信息并以可读大小显示文件大小
ls -al ：列出所有文件（包括隐藏）的详细信息
```

### pwd

`pwd`是`Print Working Directory`的缩写，也就是显示目前所在目录的的绝对路径命令。

```bash
#-P  ：可选，显示出确实的路径，而非使用连结 (link) 路径。
pwd [-P]
```

### mkdir

`mkdir`用于新建文件夹。

选项与参数：

 - -m ：配置文件的权限喔！直接配置，不需要看默认权限 (umask) 的脸色～

```bash
#创建权限为rwx--x--x的目录
mkdir -m 711 test1
```

 - -p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！

```bash
mkdir p1/p2
# mkdir: cannot create directory 'test1/test2/test3/test4'
mkdir: 无法创建目录'p1/p2':没有那个文件或目录     #  <== 没办法直接创建此目录啊！
mkdir -p p1/p2 # 加了这个 -p 的选项，可以自行帮你创建多层目录！
```

### rmdir

`rmdir` 删除空的目录

```bash
rmdir p1

#-p ：连同上一级(空的)目录也一起删除
rmdir p1/p2 -p
```
>这个 rmdir 仅能删除空的目录，你可以使用 rm 命令来删除非空目录。

### cp

`cp`即拷贝文件和目录。

>资料参考：https://linux.cn/article-6160-1.html 、http://www.runoob.com/linux/linux-file-content-manage.html

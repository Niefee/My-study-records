
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [Linux命令](#linux命令)
    * [文件操作命令](#文件操作命令)
        * [man](#man)
        * [cd](#cd)
        * [ls](#ls)
        * [pwd](#pwd)
        * [mkdir](#mkdir)
        * [rmdir](#rmdir)
        * [cp](#cp)
        * [rm](#rm)
        * [mv](#mv)
        * [cat](#cat)
        * [tac](#tac)
        * [nl](#nl)
        * [head](#head)
        * [tail](#tail)
        * [more](#more)
        * [less](#less)
        * [nano](#nano)
    * [系统操作](#系统操作)
        * [reboot](#reboot)
        * [poweroff](#poweroff)
        * [ping](#ping)
        * [grep](#grep)
        * [tar](#tar)
        * [chmod](#chmod)
        * [useradd](#useradd)
        * [passwd](#passwd)
        * [whereis](#whereis)
        * [find](#find)
        * [wget](#wget)

<!-- tocstop -->

# Linux命令

## 文件操作命令

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

```bash
$ cp source dest            ### 将 source 复制到 dest
$ cp folder/*  dest         ### 将 folder 下所有文件(不含子文件夹中的文件或空文件夹)复制到 dest
$ cp -r folder  dest        ### 将 folder 下所有文件（包含子文件夹中的所有文件）复制到 dest

$ cp -i dest  folder/dest1  ### 将dest复制到folder下，并命名为dest1，-i参数会询问当同名文件存在时是否覆盖
% cp：是否覆盖'm1/hhh.txt'？  ### <==n不覆盖，y为覆盖
```
选项与参数：

 - -a：相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)
 - -d：若来源档为连结档的属性(link file)，则复制连结档属性而非文件本身；
 - -f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；
 - -i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)
 - -l：进行硬式连结(hard link)的连结档创建，而非复制文件本身；
 - -p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；
 - -r：递归持续复制，用於目录的复制行为；(常用)
 - -s：复制成为符号连结档 (symbolic link)，亦即『捷径』文件；
 - -u：若 destination 比 source 旧才升级 destination ！

### rm

`rm` 即 remove ，删除文件。

选项与参数：
 - -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
 - -i ：互动模式，在删除前会询问使用者是否动作
 - -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！

```shell
$ rm filename      ### 删除 filename
$ rm -i filename   ### 删除 filename 前提示，若多个文件则每次提示
$ rm -rf folder/subfolder/  ### 递归删除 subfolder 下所有文件及文件夹，包括 subfolder 自身
$ rm -d folder     ###  删除空文件夹，这个文件夹里面不可有任何文件或空文件夹
```

### mv

`mv` 即 move ，移动文件。

选项与参数：
 - -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
 - -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
 - -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)

```shell
$ mv source  folder        ### 将 source 移动到 folder 下，完成后则为  folder/source
$ mv -i source folder      ### 在移动时，若文件已存在则提示 **是否覆盖**
$ mv source dest           ### 在 dest 不为目录的前提下，重命名 source 为 dest
$ mv folder folder1        ### 两者为目录的情况下，将folder重命名为folder1
```

### cat

`cat` 用于输出文件内容到 Terminal 。

```shell
$ cat /etc/locale.gen     ### 输出 locale.gen 的内容
$ cat -n /etc/locale.gen  ### 输出 locale.gen 的内容并显示行号
```
选项与参数：
 - -A ：相当於 -vET 的整合选项，可列出一些特殊字符而不是空白而已；
 - -b ：列出行号，仅针对非空白行做行号显示，空白行不标行号！
 - -E ：将结尾的断行字节 $ 显示出来；
 - -n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同；
 - -T ：将 [tab] 按键以 ^I 显示出来；
 - -v ：列出一些看不出来的特殊字符

### tac
`tac`与`cat`命令刚好相反，文件内容从最后一行开始显示，可以看出 `tac` 是 `cat` 的倒着写！

### nl

显示文件，并输出行号。

选项与参数：
 - -b ：指定行号指定的方式，主要有两种：
     - -b a ：表示不论是否为空行，也同样列出行号(类似 cat -n)；
     - -b t ：如果有空行，空的那一行不要列出行号(默认值)；
 - -n ：列出行号表示的方法，主要有三种：
     - -n ln ：行号在萤幕的最左方显示；
     - -n rn ：行号在自己栏位的最右方显示，且不加 0 ；
     - -n rz ：行号在自己栏位的最右方显示，且加 0 ；
 - -w ：行号栏位的占用的位数。

### head

取出文件前面几行
```shell
# 默认的情况中，显示前面 10 行！若要显示前 20 行，就得要这样：
$ head -n 20 test.txt
```

### tail
取出文件后面几行
```shell
# 默认的情况中，显示最后的十行！若要显示最后的 20 行，就得要这样：
$ tail -n 20 test.txt

# -f ：表示持续侦测后面所接的档名，要等到按下[ctrl]-c才会结束tail的侦测
$ tail -fn 20 test.txt
```

### more

`more` 与 `cat` 相似，都可以查看文件内容，所不同的是，当一个文档太长时， cat 只能展示最后布满屏幕的内容，前面的内容是不可见的。

```shell
$ more /etc/locale.gen
$ more +100 /etc/locale.gen       ### 从 100 行开始显示
```

查看时的操作：
 - 空白键 (space)：代表向下翻一页；
 - Enter         ：代表向下翻『一行』；
 - /字串         ：代表在这个显示的内容当中，向下搜寻『字串』这个关键字；
 - :f            ：立刻显示出档名以及目前显示的行数；
 - q             ：代表立刻离开 more ，不再显示该文件内容。
 - b 或 [ctrl]-b ：代表往回翻页，不过这动作只对文件有用，对管线无用。

### less
`less`与 `more`相似，不过 `less` 支持上下滚动查看内容，而 `more`只支持逐行显示。

```shell
$ less /etc/locale.gen
$ less +100 /etc/locale.gen
```

操作命令：

 - 空白键    ：向下翻动一页；
 - [pagedown]：向下翻动一页；
 - [pageup]  ：向上翻动一页；
 - /字串     ：向下搜寻‘字串’的功能；
 - ?字串     ：向上搜寻‘字串’的功能；
 - n         ：重复前一个搜寻 (与 / 或 ? 有关！)
 - N         ：反向的重复前一个搜寻 (与 / 或 ? 有关！)
 - q         ：离开 less 这个程序；

### nano
`nano` 是一个简单实用的文本编辑器，使用简单。

```shell
$ nano  filename       ### 编辑 filename 文件，若文件不存在，则新打开一个文件，若退出时保存，则创建该文件
```

## 系统操作

### reboot

`reboot` 为重启命令。

```
# reboot
```

`$` 和 `#` 的区别在于 `$` 普通用户即可执行，而 `#` 为 **root** 用户才可执行，或普通用户使用 `sudo`。

### poweroff

`poweroff` 为关机命令。
```
# poweroff
```

### ping

`ping` 主要用于测试网络连通，通过对目标机器发送数据包来测试两台主机是否连通，及延时情况。
```shell
$ ping locez.com    ### 通过域名 ping，若 DNS 未设置好，可能无法 ping 通
$ ping linux.cn
PING linux.cn (211.157.2.94) 56(84) bytes of data.
64 bytes from 211.157.2.94.static.in-addr.arpa (211.157.2.94): icmp_seq=1 ttl=53 time=41.5 ms

...
```

### grep
`grep` 主要用于返回匹配的项目，支持正则表达式。

```shell
$ grep PATTERN filename      ### 返回所有含有 PATTERN 的行
$ grep zh_CN /etc/locale.gen ### 返回所有含 zh_CN 的行
```
>[grep正则表达式](http://www.cnblogs.com/kaituorensheng/p/4236254.html)

### tar

`tar` 主要用于创建归档文件，和解压归档文件，其本身是没有压缩功能的，但可以调用 `gzip` 、 `bzip2` 进行压缩处理。

参数选项：

 - -c 创建归档
 - -x 解压归档
 - -v 显示处理过程
 - -f 目标文件，其后必须紧跟 目标文件
 - -j 调用 bzip2 进行解压缩
 - -z 调用 gzip 进行解压缩
 - -t 列出归档中的文件

```shell
$ tar -cvf filename.tar .       ### 将当前目录所有文件归档，但不压缩，注意后面有个 ’.‘ ，不可省略，代表当前目录的意思
$ tar -xvf filename.tar         ### 解压 filename.tar 到当前文件夹
$ tar -cvjf filename.tar.bz2 .  ### 使用 bzip2 压缩
$ tar -xvjf  filename.tar.bz2   ### 解压 filename.tar.bz2 到当前文件夹
$ tar -cvzf filename.tar.gz     ### 使用 gzip  压缩
$ tar -xvzf filename.tar.gz     ### 解压 filename.tar.gz 到当前文件夹
$ tar -tf   filename            ### 只查看 filename 归档中的文件，不解压
```

### chmod

`chmod` 永远更改一个文件的权限

```shell
#有 读取 、 写入 、 执行 ，三种权限，其中 所有者 、 用户组 、 其他 各占三个
-rwxr--r-- 1 locez users   154 Aug 30 18:09 filename
```
>r=read ， w=write ， x=execute

```
# chmod +x filename        ### 为 user ，group ，others 添加执行权限
# chmod -x filename        ### 取消 user ， group ，others 的执行权限
# chmod +w filename        ### 为 user 添加写入权限
# chmod ugo=rwx filename   ### 设置 user ，group ，others 具有 读取、写入、执行权限
# chmod ug=rw filename     ### 设置 user ，group 添加 读取、写入权限
# chmod ugo=--- filename   ### 取消所有权限
```

### useradd

`useradd`用于添加一个普通用户。

```
# useradd -m -g users -G audio -s /usr/bin/bash newuser     
### -m 创建 home 目录， -g 所属的主组， -G 指定该用户在哪些附加组， -s 设定默认的 shell ，newuser 为新的用户名
```

### passwd

`passwd` 用于改变用户登录密码。

```
$ passwd                 ### 不带参数更改当前用户密码
# passwd newuser         ### 更改上述新建的 newuser 的用户密码
```

### whereis

`whereis` 用于查找文件、手册等。

```shell
$ whereis bash
bash: /bin/bash /etc/bash.bashrc /usr/share/man/man1/bash.1.gz
```

### find
`find` 也用于查找文件，但更为强大，支持正则，并且可将查找结果传递到其他命令。

```shell
$ find . -name PATTERN    ### 从当前目录查找符合 PATTERN 的文件
$ find /home -name PATTERN -exec ls -l {} \;  # 从 /home 文件查找所有符合 PATTERN 的文件，并交由 ls 输出详细信息
```

### wget

`wget`是一个下载工具，简单强大。
```shell
$ wget -O newname.md https://github.com/.../README.md     ### 下载 README 文件并重命名为 newname.md
$ wget -c url     ### 下载 url 并开启断点续传
```
>资料参考：https://linux.cn/article-6160-1.html 、http://www.runoob.com/linux/linux-file-content-manage.html

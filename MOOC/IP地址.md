
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [IP地址](#ip地址)
    * [无分类编址和CIDR](#无分类编址和cidr)
    * [子网编址](#子网编址)
        * [子网地址](#子网地址)
        * [广播地址](#广播地址)

<!-- tocstop -->

# IP地址

IP地址是一个32位的二进制数，通常被分割为4个“`8位二进制数`”。

IP地址分为`网络地址`和`主机地址`两部分。

IP地址分为A、B、C、D、E5类，适用于大型网络、中型网络、小型网络、多点地址、备用地址。常用的是B和C两类。

<table log-set-param="table_view" class="table-view log-set-param"><tbody><tr><td width="46" align="center" valign="center"><div class="para" label-module="para">类别</div>
</td><td width="84" align="center" valign="center"><div class="para" label-module="para">最大网络数</div>
</td><td width="182" align="center" valign="center"><div class="para" label-module="para">IP地址范围</div>
</td><td width="71" align="center" valign="center"><div class="para" label-module="para">最大主机数</div>
</td><td width="193" align="center" valign="center">私有IP地址范围</td></tr><tr><td width="46" align="center" valign="center"><div class="para" label-module="para">A</div>
</td><td width="84" align="center" valign="center"><div class="para" label-module="para">126（2^7-2)</div>
</td><td width="182" align="center" valign="center"><div class="para" label-module="para">0.0.0.0-127.255.255.255</div>
</td><td width="71" align="center" valign="center"><div class="para" label-module="para">16777214</div>
</td><td width="193" align="center" valign="center"><div class="para" label-module="para">10.0.0.0-10.255.255.255</div>
</td></tr><tr><td width="46" align="center" valign="center"><div class="para" label-module="para">B</div>
</td><td width="84" align="center" valign="center"><div class="para" label-module="para">16384(2^14)</div>
</td><td width="182" align="center" valign="center">128.0.0.0-191.255.255.255</td><td width="71" align="center" valign="center"><div class="para" label-module="para">65534</div>
</td><td width="193" align="center" valign="center">172.16.0.0-172.31.255.255</td></tr><tr><td width="46" align="center" valign="center"><div class="para" label-module="para">C</div>
</td><td width="84" align="center" valign="center"><div class="para" label-module="para">2097152(2^21)</div>
</td><td width="182" align="center" valign="center">192.0.0.0-223.255.255.255</td><td width="71" align="center" valign="center"><div class="para" label-module="para">254</div>
</td><td width="193" align="center" valign="center">192.168.0.0-192.168.255.255</td></tr></tbody></table>

D类IP地址叫多点广播地址，范围从`224.0.0.0`到`239.255.255.255`。多点广播地址用来一次寻址一组计算机，它标识共享同一协议的一组计算机。

E类IP地址以`11110`开头的地址都留着将来作为特殊用途使用

全零(`0.0.0.0`)地址对应于当前主机。全**1**的IP地址(`255.255.255.255`)是当前子网的广播地址。

以`127`开头的是回送地址(`127.x.x.x`)，用于网络软件测试以及本地机进程间通信，不进行任何网络传输。

## 无分类编址和CIDR

CIDR与传统分类IP地址相比

1. IP地址都是二级编址（由网络号部分和主机号部分组成）
2. 传统的网络前缀是：A类8位；B类16位；C类：24位；CIDR是1-32位都可以

CIDR中的`网络前缀`等同于子网划分中的`网络号`和`子网号`；
```
202.119.230.0/24（斜线后面的24是网络前缀的长度）
```
主机号，全`0`跟全`1`不分配给主机，会作为子网网络地址跟网络的广播地址。
## 子网编址

多个物理网络可以共用一个网络前缀，叫`划分子网`。

从主机域中借用若干个比特作为子网号`subnet-id`，而主机号`host-id` 也就相应减少了若干个比特。

IP 地址= [ 网络号，子网号，主机号 ]

子网号的位数是可变的，为了反映有多少位用于表示子网号，采用`子网掩码`( mask )
>[百度百科：子网掩码](http://baike.baidu.com/link?url=yOHZdfU6bjdU9_tSkRf3Fmb7m7DKMqoqwqWZB4__hfsDl8Qt0704tsjqlrEmd1FSDJcOBADuNDNxye0fQjWjNXOwUFdjMQNlT_Zr-p2fZPehSd6ngUWX5EE3tKAX8BkH)

1. 掩码中连续的1的个数：网络前缀的长度
2. 掩码中连续的0的个数：主机号部分的长度

```
IP 地址= [ 网络号，子网号，主机号]

子网掩码= [ 11....11, 11...11,  00....00]
```

>网络号与子网号都用1表示，主机号用0表示。

### 子网地址
子网地址也是一个特殊的IP地址，就是网络号部分和子网号部分不变，主机号部分全`0`的地址。

![IP地址.jpg](img/IP地址.png)
>IP地址是128.10.32.6，子网掩码是255.255.224.0

### 广播地址

广播地址的特点是网络号部分和子网号部分不变，主机号部分全为`1`。

![广播地址.jpg](img/广播地址.jpg)
>在子网128.10.32.0中


>[慕课地址](http://www.icourse163.org/learn/NJUPT-1001639008?tid=1002014006#/learn/content?type=detail&id=1002615362&cid=1002865806)
> [课程PDF文件](http://nos.netease.com/edu-lesson-pdfsrc/1911457B1E4AB1893B315E5E9E9A9B05-1490188790873?NOSAccessKeyId=7ba71f968e4340f1ab476ecb300190fa&Expires=1494598332&Signature=IV6jbThsiwluKcYyuRkX%2BmosfWYpWobe3Inkf08qAg8%3D&download=%E7%BD%91%E7%BB%9C%E6%8A%80%E6%9C%AF%E4%B8%8E%E5%BA%94%E7%94%A8-IPv4---%E7%AC%AC%E4%BA%8C%E9%83%A8%E5%88%86-%E4%BF%AE%E6%94%B9.pdf)

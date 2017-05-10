
<!-- toc orderedList:0 depthFrom:1 depthTo:6 -->

* [WebSocket](#websocket)
    * [TCP的三次握手与四次分手](#tcp的三次握手与四次分手)
        * [三次握手](#三次握手)
        * [四次分手：](#四次分手)

<!-- tocstop -->

# WebSocket

## TCP的三次握手与四次分手
### 三次握手
TCP是主机对主机层的传输控制协议，提供可靠的连接服务，采用三次握手确认建立一个连接:

位码即tcp标志位,有6种标示:

1. SYN(synchronous建立联机)
2. ACK(acknowledgement 确认)
3. PSH(push传送)
4. FIN(finish结束)
5. RST(reset重置)
6. URG(urgent紧急)
7. Sequence number(顺序号码)
8. Acknowledge number(确认号码)

握手过程：

第一次握手：建立连接。客户端发送连接请求报文段，将`SYN`位置为1，`Sequence Number`为x；然后，客户端进入`SYN_SEND`状态，等待服务器的确认；
第二次握手：服务器收到`SYN`报文段。服务器收到客户端的`SYN`报文段，需要对这个`SYN`报文段进行确认，设置`Acknowledgment Number`为`x+1(Sequence Number+1)`；同时，自己自己还要发送`SYN`请求信息，将`SYN`位置为1，`Sequence Number`为y；服务器端将上述所有信息放到一个报文段（即`SYN+ACK`报文段）中，一并发送给客户端，此时服务器进入`SYN_RECV`状态；
第三次握手：客户端收到服务器的`SYN+ACK`报文段。然后将`Acknowledgment Number`设置为y+1，向服务器发送`ACK`报文段，这个报文段发送完毕以后，客户端和服务器端都进入`ESTABLISHED`状态，完成`TCP`三次握手。

![TCP/IP](img/TCP4.jpg)

### 四次分手：

由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。这个原则是当一方完成它的数据发送任务后就能发送一个`FIN`来终止这个方向的连接。收到一个 `FIN`只意味着这一方向上没有数据流动，一个`TCP`连接在收到一个`FIN`后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。

操作：

1. 客户端A发送一个`FIN`，用来关闭客户A到服务器B的数据传送。
2. 服务器B收到这个`FIN`，它发回一个`ACK`，确认序号为收到的序号加1。和`SYN`一样，一个`FIN`将占用一个序号。
3. 服务器B关闭与客户端A的连接，发送一个`FIN`给客户端A。
4. 客户端A发回`ACK`报文确认，并将确认序号设置为收到序号加1。

![TCP/IP](img/TCP4.jpg)

>参考：
http://www.jellythink.com/archives/705
http://www.cnblogs.com/Jessy/p/3535612.html
https://www.zhihu.com/question/24853633

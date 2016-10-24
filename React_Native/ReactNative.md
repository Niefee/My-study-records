## Fetch()

```js
loadData(){
    var vn='2.3.0',OS_IOS=(Platform.OS == 'ios'?true:false);

    const promise =new Fetch({
            url: 'app/update.json',
            method:'POST',
            data: {
                //上传本地的系统信息，后端处理后返回结果。
                "platformDeviceTypeCode" : OS_IOS ? 'ios-hand':'aos-hand',//传入当前版本系统
                "versionNumber" :vn//版本号
            }
    }).dofetch();

    promise.then((data)=>{
        console.log('-------Platform-----',Platform);
        console.log('------OS_IOS------',OS_IOS);
        console.log('--------vn------',vn);
        console.log('=>data',data);

    })
    .catch((error)=>{
        console.log('=>catch',error);
    })
}
```

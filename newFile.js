var fs=require("fs");
var rq=new Date();
var time=rq.getFullYear()+"年"+(rq.getMonth()+1)+"月"+rq.getDate()+"日";
var fileName=time+".markdown";
var fileAd=rq.getFullYear()+"/"+(rq.getMonth()+1)+"/"+fileName;

fs.exists(fileAd, function(isExists){
	//console.log(isExists);
	if (!isExists) {
		fs.writeFile(fileAd,"[TOC]\r#"+time,function(err){
			if (err) {
				console.log("出错了。");
			}else{
				console.log("fs.writeFile()新建成功。");
			}
		});
	}else{
		fs.appendFile(fileAd, "\r<!-- 删除此段内容，继续添加笔记。 -->", "utf8", function(err){
			if (err) {
				console.log("出错了。");
			}else{
				console.log("fs.appendFile()新建成功。");
			}
		});
	}
});
console.log(fileName);

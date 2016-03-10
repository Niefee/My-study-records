var fs=require("fs");
var rq=new Date();

var time=rq.getFullYear()+"年"+(rq.getMonth()+1)+"月"+rq.getDate()+"日";
var fileName=time+".markdown";
console.log(fileName);
fs.writeFile(rq.getFullYear()+"/"+(rq.getMonth()+1)+"/"+fileName,"#"+time,function(){
	console.log(arguments);
	console.log("新建成功！");
});
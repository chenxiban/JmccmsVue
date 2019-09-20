const token = window.localStorage.getItem("token"); //取出暂存的token数据
const loginIds = window.localStorage.getItem("userIds"); // 登录用户的id
const loginNames = window.localStorage.getItem("loginName"); // 登录用户的名称
const projectPath="http://localhost:3010/serve-jmccms/Jmccms";

console.log('访问项目地址为==>'+projectPath);
console.log('取出暂存的token数据==>'+token);
console.log('登录用户的id==>'+loginIds);
console.log('登录用户的名称==>'+loginNames);
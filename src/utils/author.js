//用来保存缓存到本地的数据
//也就是对token操作的封装


//定义键,即保存在那个变量中
const Author_KEY= "storageData"
//数据的保存
function setAuthor(value){
    window.localStorage.setItem(Author_KEY,JSON.stringify(value))
}


//获取数据
function getAuthor(){
    return window.localStorage.getItem(Author_KEY)?JSON.stringify(window.localStorage.getItem(Author_KEY)):null
}



//删除数据

function removeAuthor(){
    window.localStorage.removeItem(Author_KEY)
}


//暴露接口

export {setAuthor,getAuthor,removeAuthor}
 // 拿到可视区域的高度
 let viewHeight = document.documentElement.clientHeight
 let viewWidth = document.documentElement.clientWidth
 function lazyLoad() {
   let eles = document.querySelectorAll('img[data-original][lazyload]') 
   // console.log(eles)
   // 判断每一个img是否出现在了可视区域内
   // Array.from(eles).forEach(item => {
   //   console.log(item)
   // })
   Array.prototype.forEach.call(eles, item => {
     let rect;
     rect = item.getBoundingClientRect() // 用于获取页面上某个元素的左上右下分别相对于浏览器视窗的位置
     
     if(rect.bottom >= 0 && rect.top < viewHeight) { // 在可视区域内
       !function() {
         let img = new Image()
         img.src = item.dataset.original
         img.onload = function() {
           item.src = img.src
         }
         item.removeAttribute('data-original') // 移除属性下次不再遍历
         item.removeAttribute('lazyload')
       }()
     }
   })
  }
  function nolazyload() {
    let eles = document.querySelectorAll('img[data-original][lazyload]')
    Array.prototype.forEach.call(eles,item => {
      let img = new Image()
      img.src = item.dataset.original
      img.onload = function() {
        item.src = img.src
      }
      item.removeAttribute('data-original')
      item.removeAttribute('lazyload')
      
    })

  }
 window.onload = function () {
  if (viewWidth <= 480) { //移动端
       nolazyload()
     
    }else{
       lazyLoad() 
      
    }  
 }
 document.addEventListener('scroll', lazyLoad)

(function preloadLoadingImages() {
  var image1 = new Image()
    , image2 = new Image()
    , image3 = new Image()
  image1.src='/images/sending.png'
  image2.src='/images/processing.png'
  image3.src='/images/authorizing.png'
})()

var field = document.getElementById('file-field')
var imgs  = document.getElementsByTagName('img')

field.addEventListener('click', function(e) {e.preventDefault() })
field.addEventListener('change', function(e) {
  var files  = e.target.files

  for(var i = 0; i < files.length; i++) {
    multipartPost('/photos/create', files[i])
  }
})
for(var i=0; i < imgs.length; i++) {
  imgs[i].addEventListener('load', resizeUploader)
}
window.onresize = resizeUploader

function resizeUploader() {
  field.style.height='10px'
  var height = document.height
  field.style.height=height+'px'
}

function makeImage() {
  var numImages = document.getElementsByTagName('img').length
    , column    = document.getElementsByClassName('photo-column')[numImages%3]
    , img       = document.createElement("img")
  img.className = "loading"
  column.appendChild(img)
  return img
}

function multipartPost(url, params, callback) {
  var xml  = new XMLHttpRequest()
    , data = new FormData()
    , image= makeImage()
  data.append('file', params)

  xml.upload.onprogress = function(e) { progressHandler.call(xml, e, image) } 
  xml.onreadystatechange = function() { if (xml.readyState===4) finishedHandler.call(xml, image) } 

  xml.open('post', url)
  xml.setRequestHeader("X-Requested-With","XMLHttpRequest")
  xml.send(data)
}

function progressHandler(e, image) {
  var progress = parseInt((e.loaded/e.total)*4, 10)
  switch(progress) 
  {
  case 0:
    if(image.src!=='/images/sending.png') image.src = '/images/sending.png'
    break;
  case 1:
    if(image.src!=='/images/processing.png') image.src = '/images/processing.png'
    break;
  case 2:
    if(image.src!=='/images/authorizing.png') image.src = '/images/authorizing.png'
    break;
  }
}

finishedHandler = function(image) {
  if(this.status===200) {
    image.src = this.responseText
  } else {
    console.log(this.status, "Error")
  }
}

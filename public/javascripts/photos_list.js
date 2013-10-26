var field = document.getElementById('file-field')
var imgs  = document.getElementsByTagName('img')

for(var i=0; i < imgs.length; i++) {
  imgs[i].addEventListener('load', resizeUploader)
}


field.addEventListener('change', function(e) {
  var files  = e.target.files
  for(var i = 0; i < files.length; i++) {
    multipartPost('/photos/create', files[i], appendPhoto)
  }
})

field.addEventListener('click', function(e) {
  e.preventDefault()
})

window.onresize = resizeUploader

function resizeUploader() {
  field.style.height='10px'
  var height = document.height
  field.style.height=height+'px'
}

function appendPhoto(data) {
  var numImages = document.getElementsByTagName('img').length
    , column    = document.getElementsByClassName('photo-column')[numImages%3]
    , img       = document.createElement("img")
  img.src = data
  column.appendChild(img)
}

function multipartPost(url, params, callback) {
  var xml  = new XMLHttpRequest()
  var data = new FormData()
  data.append('file', params)

  xml.open('post', url)

  xml.setRequestHeader("X-Requested-With","XMLHttpRequest")
  xml.send(data)

  xml.onreadystatechange = function() {
    if(xml.readyState===4) {
      if(xml.status===200) {
        callback(xml.responseText)
      } else {
        console.log(xml.status, "Error")
      }
    }
  }
}

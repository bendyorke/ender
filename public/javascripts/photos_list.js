var field = document.getElementById('file-field')

field.addEventListener('change', function(data) {
  var files  = data.target.files

  for(var i = 0; i < files.length; i++) {
    multipartPost('/photos/create', files[i])
  }
})

function multipartPost(url, params, callback) {
  var xml  = new XMLHttpRequest()
  var data = new FormData()
  data.append('file', params)
  console.log('processing..', params)

  xml.open('post', url, false)
  xml.send(data)

  if(xml.readyState===4) {
    console.log('success')
  }

}
  //console.log(data.target.files)
  //var reader = new FileReader()
  //
  //reader.onload = function(e) {
  //  console.log(e.target)
  //}
  //reader.readAsDataURL(files[0])



 // xml.onreadystatechange = function() {
 //   if(xml.readyState===4) {
 //     if(xml.status===200) {
 //       console.log('success')
 //     } else {
 //       console.log(xml.status, "Error")
 //     }
 //   }
 // }

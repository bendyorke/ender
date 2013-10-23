var Photo = require('../models')('photo')
var s3    = require('../aws.js')

exports.new = function(req, res) {
  res.render('photos/form')
}

exports.create = function(req, res) {
  var fs       = require('fs')
    , im       = require('imagemagick-native')
    , filepath = req.files.file.path
    , filename = req.files.file.originalFilename
    , processed_file = im.convert({
        srcData: fs.readFileSync(filepath)
      , width: 1000
      , resizeStyle: 'aspectfit' })

  s3.put(processed_file, filename, function(err, s3_res, name) {
    if (err) throw err
    var photo = new Photo({ url: 'https://s3-us-west-1.amazonaws.com/enderisapuppy/'+name })
    photo.save( function(err, photo) {
      if (err) res.render('index', {title: 'error'} )
      res.redirect('photos')
    })
  })
}

exports.list = function(req, res) {
  Photo.find( function(err, photos) {
    res.render('photos/list', { photos: photos} )
  })
}

exports.remove = function(req, res) {
  Photo.remove({}, function(err) {
    if (err) throw err
    console.log("Photos Removed")
  })
}

var Photo = require('../models')('photo')
var s3    = require('../aws.js')

exports.new = function(req, res) {
  res.render('photos/form')
}

exports.create = function(req, res) {
  s3.put(req.files.file, function(err, s3Res, name) {
    if (err) throw err
    var photo = new Photo({ url: 'https://s3-us-west-1.amazonaws.com/enderisapuppy/'+name })
    console.log(name, "successfully uploaded to S3")
    photo.save( function(err, photo) {
      if (err) res.render('index', {title: 'error'} )
      console.log(name, "successfully saved")
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

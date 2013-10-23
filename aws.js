var fs     = require('fs');
var AWS    = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS
, secretAccessKey: process.env.SECRET
})

exports.put = function(file, filename, callback) {
  var s3bucket = new AWS.S3({params: {Bucket: 'enderisapuppy'}});
  //fs.readFile(file.path, function(err, data) {
    s3bucket.createBucket(function() {
      params = {
        Key  : new Date().getTime() + '_' + filename
      , Body : file 
      , ACL  : 'public-read'
      }
      s3bucket.putObject(params, function(err, res) {
        callback(err, res, params.Key)
      })
    })
  //})
}

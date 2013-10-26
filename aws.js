var fs     = require('fs');
var AWS    = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS
, secretAccessKey: process.env.SECRET
})

exports.put = function(file, key, callback) {
  var s3bucket = new AWS.S3({params: {Bucket: 'enderisapuppy'}});
  s3bucket.createBucket(function() {
    params = {
      Key  : key
    , Body : file 
    , ACL  : 'public-read'
    }
    s3bucket.putObject(params, function(err, res) {
      callback(err, res)
    })
  })
}

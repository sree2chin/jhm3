/*
* Dependencies
*/

var gulp = require('gulp');
var fs   = require('fs');
var mime = require('mime-types');
var AWS  = require('aws-sdk');
var walk = require('walk');
var path = require('path');

/*
 * Declaration of global variables
 */

var isPaused = false;

var awsConfig = {
  key    : '',
  secret : '',
  region : 'us-east-1',
  bucket : 'reactcdn'
};

/*
 * Bucket access informations
 */

AWS.config.accessKeyId = awsConfig.key || null;
AWS.config.secretAccessKey = awsConfig.secret || null;
AWS.config.region = awsConfig.region || null;
AWS.config.signatureVersion="v4";
//AWS.config.ServerSideEncryption="aws:kms";
AWS.config.ServerSideEncryption="AES256";
/*
 * Publishing function: uses a stream to push the files on the AWS Bucket
 */

function publishit(filename) {
var file = filename.substring('./'.length);
var key = file;//file.substring('dist/'.length);
var fileStream = fs.createReadStream(file);
isPaused = true;
filename = __dirname+"/"+filename.substring('./'.length);
var uploadmimeType = mime.lookup(filename).toString();
var file_name = path.basename(filename);
var content_length = fs.stat(filename,function(err,stats){
    return stats.size;
});
// Check if there is an error on the file
fileStream.on('error', function (err) {
        if (err) { throw err; }
    });

// Action to do on opening of the file
fileStream.on('open', function () {
        var s3 = new AWS.S3();
        
        // Uploading the stream to the bucket
        s3.putObject({
                    Bucket: awsConfig.bucket || null,
                    //ServerSideEncryption: "aws:kms",
                    Key:key,
                    ContentType:uploadmimeType,
                    ContentDisposition:"inline filename='"+file_name+"'",
                    ContentLength:content_length,
                    CacheControl:"1",
                    Body: fileStream,
                    ACL:'public-read'
                    }, function (err,data) {
                // Show the error if there is any
                if (err) { throw err; }

                // If everything went successfully, print which file is being uploaded
                else { console.log("Uploading asset "+ key); }

                // Closing the stream to avoid leaks and socket timeouts
                fileStream.close();

                // Changing the status of 'isPaused' to false to continue uploading the other assets
                isPaused = false;
            });
    });
}

gulp.task('uploadtos3', function() {
    var files   = [];

    // Walker options (first arg is the folder you want to upload)
    var walker  = walk.walk('./dist', { followLinks: false });
    walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            files.push(root + '/' + stat.name);            
            next();
        });

    // Action after every file has been added to 'files'
    walker.on('end', function() {
            for (var filename in files){                
                // Publish every file added to 'files'
                publishit(files[filename]);
                // Wait for one push on the server to be done before calling the next one
                function waitForIt(){
                    if (isPaused) {
                        setTimeout(function(){waitForIt()},100);
                    }
                };

            };
        });
});
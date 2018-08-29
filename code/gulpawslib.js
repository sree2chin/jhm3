/*
* Dependencies
*/

var gulp = require('gulp');
var AWS  = require('aws-sdk');
var fs   = require('fs');
var walk = require('walk');
var path = require('path');
/*
 * Declaration of global variables
 */

var isPaused = false;

var awsConfig = {
  key    : '',
  secret : '',
  region : '',
  bucket : ''
};

/*
 * Bucket access informations
 */

AWS.config.accessKeyId = awsConfig.key || null;
AWS.config.secretAccessKey = awsConfig.secret || null;
AWS.config.region = awsConfig.region || null;

/*
 * Publishing function: uses a stream to push the files on the AWS Bucket
 */

function publishit(filename) {
var file = filename.substring('./'.length);
var key = file;//file.substring('dist/'.length);
var fileStream = fs.createReadStream(file);
isPaused = true;
var filePathObj = path.parse(file);
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
                    Key:key,
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
const fs = require('fs');
const AWS = require('aws-sdk');

// var parse = require('csv-parse');
// var async = require('async');
const csv = require('csv-parser');

const math = require('mathjs');

var os = require('os');

var dataToWrite="unprocessed";


// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });
const s3 = new AWS.S3({
  accessKeyId:'<<REPLACE IT WITH YOUR ACCESS KEY ID>>',
  secretAccessKey:'<<REPLACE IT WITH YOUR SECRET ACCESS KEY>>'
});

//========logic to process data and create a new file=====

 var inputFilePath='datainput.csv';


//-------read file and perform calculations at line level

var tvdata=[],radiodata=[],newspaperdata=[],salesdata=[];

fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try {
        console.log("S.No is: "+data.sno);
        console.log("TV is: "+data.TV);
        console.log("radio is: "+data.radio);
        console.log("newspaper is: "+data.newspaper);
        console.log("sales is: "+data.sales);
        tvdata.push(data.TV);
        radiodata.push(data.radio);
        newspaperdata.push(data.newspaper);
        salesdata.push(data.sales);

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    //some final operation
    console.log("successfully read the data -------------------------------------->");

    var mean1,mean2,mean3,mean4;
    var median1,median2,median3,median4;
    var mode1,mode2,mode3,mode4;
    var total1=0.0,total2=0.0,total3=0.0,total4=0.0;
    mean1=math.mean(tvdata);
    mean2=math.mean(radiodata);
    mean3=math.mean(newspaperdata);
    mean4=math.mean(salesdata);
    median1=math.median(tvdata);
    median2=math.median(radiodata);
    median3=math.median(newspaperdata);
    median4=math.median(salesdata);
    total1=math.sum(tvdata);
    total2=math.sum(radiodata);
    total3=math.sum(newspaperdata);
    total4=math.sum(salesdata);

    dataToWrite="type,total,mean,median"+os.EOL;
    dataToWrite=dataToWrite+"tvsales"+","+total1+","+mean1+","+median1+os.EOL;
    dataToWrite=dataToWrite+"radiosales"+","+total2+","+mean2+","+median2+os.EOL;
    dataToWrite=dataToWrite+"newspapersales"+","+total3+","+mean3+","+median3+os.EOL;
    dataToWrite=dataToWrite+"onlinesales"+","+total4+","+mean4+","+median4+os.EOL;

    console.log(dataToWrite);

    fs.writeFile('results.csv', dataToWrite.toString(), function (err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else{
        console.log('It\'s saved!');
      }
    });

    uploadFile();


});  
//----to write the data collected and computed into new file-----

//========================================================
const fileName = 'results.csv';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: '<<your Bucket name and folder where you want to upload the file>>', // pass your bucket name
         Key: 'results.csv', // file will be saved as YOUR-BUCKET-NAME/FOLDER/results.csv
         Body: data
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};




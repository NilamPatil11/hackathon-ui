var router = require('express').Router();
var mysql   = require('mysql');
var async   = require('async');
var databaseOptions = require('../db/config');
var conn;
var xpathId=1;

router.post('/saveXPath', function(req, res) {
    console.info("request parameters===>", req.body);
    let xpathArr = req.body.XPATH;
    let url = req.body.URL;
    let appName = req.body.APPNAME;
    let appid = req.body.APPID;
    let pagename = req.body.PAGENAME;
    let insertSql = "";
    let updateSql = "";
    let deleteSql = "";
    var conn = mysql.createConnection(databaseOptions.databaseOptions);
    conn.connect();
    async.forEach(xpathArr, (values, callback) => {
        // console.log("xpath======>", values);
        async.forEach(values.path, (val, callback2)=>{
            conn.query("select count(*) as cnt from xpathdb.ht_sqd_xpath_mapping where url='"+url+"' and fullXpath='"+val+"' and version=1", function (error, results, fields) {
          if (error){
               // throw error;
               console.log("Mysql Error 1: ", error);
           }
          let queryResult = results;
          if(queryResult[0].cnt != 0){
                deleteSql = "delete from xpathdb.ht_sqd_xpath_mapping where url='"+url+"' and fullXpath='"+val+"' and version=0";
                updateSql = "update xpathdb.ht_sqd_xpath_mapping set version=0 where url='"+url+"' and fullXpath='"+val+"' and version=1 ";
                insertSql = "insert into xpathdb.ht_sqd_xpath_mapping(app_id, app_name, page_name, url, fullXpath, relXpath, version) values( 1, '"+appName+"', '"+pagename+"', '"+url+"', '"+val+"', '', 1)";
              conn.query(deleteSql, function (error, results, fields) {
                  if (error){
                       // throw error;
                       console.log("Mysql Error 2: ", error);
                   }
                   conn.query(updateSql, function (error, results, fields) {
                      if (error){
                           // throw error;
                          console.log("Mysql Error 3: ", error);
                       }
                       conn.query(insertSql, function (error, results, fields) {
                          if (error){
                               // throw error;
                               console.log("Mysql Error 4: ", error);
                           }
                           //callback();
                       })
                   })
               })
               
          }else{
              conn.query("select count(*) as cnt0 from xpathdb.ht_sqd_xpath_mapping where url='"+url+"' and fullXpath='"+val+"' and version=0", function (error, results, fields) {
                  if (error){
                   // throw error;
                   console.log("Mysql Error 5: ", error);
                   }
                   if(results[0].cnt0 != 0){
                       insertSql = "insert into xpathdb.ht_sqd_xpath_mapping(app_id, app_name, page_name, url, fullXpath, relXpath, version) values( 1, '"+appName+"', '"+pagename+"', '"+url+"', '"+val+"', '', 1)";
                   }else{
                       insertSql = "insert into xpathdb.ht_sqd_xpath_mapping(app_id, app_name, page_name, url, fullXpath, relXpath, version) values( 1, '"+appName+"', '"+pagename+"', '"+url+"', '"+val+"', '', 0)";
                   }

                   conn.query(insertSql, function (error, results, fields) {
                      if (error){
                           // throw error;
                          console.log("Mysql Error 6: ", error);
                       }
                       
                   })
               });
          }
          callback2();
        });
        }, ()=>{
            callback();
        })
        
    }, ()=>{
        conn.end();
        res.status(200).json({success: true, message: "Xpath saved successf"})
    })
    
});

router.get('/getXPath', function(req, res) {
   let respData = [], responseData = [];
    var conn = mysql.createConnection(databaseOptions.databaseOptions);
    // conn.connect();
    conn.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + conn.threadId);
    });
    conn.query("select * from xpathdb.ht_sqd_xpath_mapping where version=1", (error, results) => {
       if(error){
           console.log("Error===>", error);
       }
        
        async.forEach(results, (val, callback)=>{
            // console.log("val.xpath====>", val.fullXpath);
               conn.query("select count(*) as cnt0 from xpathdb.ht_sqd_xpath_mapping where url='"+val.url+"' and fullXpath='"+val.fullXpath+"' and version=0", function (error, results, fields) {
                  if (error){
                   // throw error;
                   console.log("Mysql Error 9: ", error);
                   }
                   if(results[0].cnt0 != 0){//matching
                       val.status = "Matching";
                       val.fullXpath = val.fullXpath.toLowerCase();
                   }else{
                       val.status = "New Field";
                       val.fullXpath = "";
                   }
                   responseData.push(val);
                   callback();
               });
        }, ()=>{
            conn.end();
            console.log("matching data====>", responseData);
            res.status(200).json({success: true, responseData});
        })
    })
});

module.exports = router;
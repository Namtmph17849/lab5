var express = require('express');
var router = express.Router();
var fs = require('fs')
const url = require('url')

//mongo
var db = 'mongodb+srv://admin:bfbzjC57bseMmBsT@cluster0.nz34l.mongodb.net/Lab8?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const e = require("express");
mongoose.connect(db).catch(error =>{
  console.log("Có lỗi xảy ra")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang thêm' , message:''});
});
router.get('/sua',function (req,res) {
  console.log('Sua')
  res.render('sua',{title : 'Trang sửa', message:''});
})
// router.get('/xem',function (req,res) {
//   console.log('Xem')
//   res.render('xem',{title : 'Trang xem', message:''});
// })


//mongo
const studentSchema = new mongoose.Schema({
  tenAnh: 'string',
  ndAnh: 'string',
  linkAnh: 'string'
});
const Student = mongoose.model('students',studentSchema);
router.post('/uploads', function (req,res) {
  var tenAnh = req.body.tenAnh;
  var ndAnh = req.body.ndAnh;
  var linkAnh = req.body.linkAnh;
  console.log(tenAnh);
  console.log(ndAnh);
  console.log(linkAnh);

  const data = new Student({
    tenAnh: tenAnh,
    ndAnh: ndAnh,
    linkAnh: linkAnh
  });

  data.save(function (err) {
    if (err) return handleError(err);
    res.render('index', {
      title: 'Thêm',
      message: 'Đã thêm'
    })
    console.log('Da them')
  });
});

router.post('/uploadss', async function (req,res) {
  var tenAnh2 = req.body.tenAnh;
  var ndAnh2 = req.body.ndAnh;
  var linkAnh2 = req.body.linkAnh;
  console.log(tenAnh2);
  console.log(ndAnh2);
  console.log(linkAnh2);

    res.render('sua', {
      title: 'Thêm',
      message: 'Đã sửa'
    })
    console.log('Đã sửa')

  const filter = {tenAnh: tenAnh2};
  const update = {ndAnh: ndAnh2, linkAnh: linkAnh2};
  let ketqua = await Student.findOneAndUpdate(filter, update, {
    new: true
  });
});
router.post('/uploadsss', async function (req,res) {
  var tenAnh3 = req.body.tenAnh;
  console.log(tenAnh3);



  console.log('Đã xóa')

  const filter = {tenAnh: tenAnh3};
  let xoa = await Student.findOneAndDelete(filter, function (error) {
    console.log(error)
    console.log("xóa thành công");
  })
  res.render('xoa', {
    title: 'xoa',
    message: 'Đã xóa'
  })
});

router.get('/xem',function (req,res) {
  console.log('Xem')
  Student.find({},function (err,data){
    res.render('xem',{data: data});
  })
});
router.get('/xoa',function (req,res) {
  console.log('xoa')
    res.render('xoa', {title: 'Xóa', message: ''});

});
router.get('/allMobile',function (req,res) {
  Student.find({}, function (err,data){
    res.send(data)
  })

});

module.exports = router;

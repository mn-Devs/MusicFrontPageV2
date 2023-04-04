const fs = require('fs');


const testupload = (req, res) => {
    console.log(req.cookies.auth)
  //req.body.(de name="" value van het upload element) geeft een hoop data wat je kan grabben
  //res.redirect('/')
  console.log(req.files.img)


}



exports.testupload = testupload;
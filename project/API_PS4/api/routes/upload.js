import {
	Router
} from 'express'
const router = Router()
import multer from 'multer'
import xlstojson from 'xls-to-json-lc'
import xlsxtojson from 'xlsx-to-json-lc'

const storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function (req, file, cb) {
		var datetimestamp = Date.now();
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
	}
})

const upload = multer({ //multer settings
				storage: storage,
				fileFilter : function(req, file, callback) { //file filter
					if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
						return callback(new Error('Wrong extension type'));
					}
					callback(null, true);
				}
			}).single('file')

router.post('/', (req, res) => {
	let exceltojson
	upload(req, res, (err) => {
		if(err){
			res.json({error_code:1, err_desc:err})
			return
	   }
	   /** Multer gives us file info in req.file object */
	   if(!req.file) {
		   res.json({error_code:1,err_desc:"No file passed"})
		   return
	   }
	   /** Check the extension of the incoming file and 
		*  use the appropriate module
		*/
	   if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx') {
		   exceltojson = xlsxtojson
	   } else {
		   exceltojson = xlstojson
	   }
	   try {
		   exceltojson({
			   input: req.file.path,
			   output: null, //since we don't need output.json
			   lowerCaseHeaders: true
		   }, function(err, result) {
			   if(err) {
				   return res.json({error_code:1, err_desc:err, data: null})
			   } 
			   res.json({error_code:0, err_desc:null, data: result})
		   });
	   } catch (e) {
		   res.json({error_code:1, err_desc:"Corupted excel file"})
	   }
	})
})	

export default router
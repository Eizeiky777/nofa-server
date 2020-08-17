const express = require('express');
const router = express.Router();

// const { upload } = require('../middleware/uploadMp3');
// const { uploadImage } = require('../middleware/uploadImage');

const { auth } = require('../middleware/auth-m');

// const { cekSub } = require('../middleware/cekSubscription');

const { register, login, cekAuth } = require('../controllers/auth');

const { addFeature, deleteFeature, findFeature, allFeature, updateFeature } = require('../controllers/feature');

// const { getArtist, addArtist } = require('../controllers/artist');

// const { getMusic, getDetailMusic, addMusic } = require('../controllers/music');

// const {
// 	addTransaction,
// 	getTransaction,
// 	editTransaction,
// 	deleteTransaction
// } = require('../controllers/transaction');

// Authentication Routes >>> <<<
router.post('/register', register);
router.post('/login', login);
router.get('/auth', auth, cekAuth);

// Feature Routes >>> <<<
router.patch('/feature/update/:idFeature', auth, updateFeature);
router.post('/feature', auth, addFeature);
router.delete('/feature/delete/:idFeature', auth, deleteFeature);
router.get('/feature/find/:idFeature', auth, findFeature);
router.get('/feature/findall', auth, allFeature);


// // User Routes
// router.get('/user', auth, authAdmin, getUser);
// router.delete('/user/:id', auth, authAdmin, deleteUser);
// router.post('/profile', auth, uploadImage('image'), changeProfile);

// // Artist Routes
// router.get('/artist', getArtist);
// router.post('/artist', auth, authAdmin, addArtist);

// // Music Routes
// router.get('/music', getMusic);
// router.get('/music/:id', auth, getDetailMusic);
// router.post('/music', auth, authAdmin, uploadImage('thumbnail'), addMusic);

// // Transcation Routes
// router.get('/transaction', getTransaction);
// router.post('/transaction', auth, uploadImage('attache'), addTransaction);
// router.patch('/transaction/:id', auth, authAdmin, editTransaction);
// router.delete('/transaction/:id', auth, authAdmin, deleteTransaction);

router.get('*', function(req, res) {
	res.status(404).send({
		error: '404 Not Found'
	});
});

module.exports = router;
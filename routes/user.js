const {Router} = require('express');
const { userGet, userDelete, userPut, userPost } = require('../controllers/userController');

const router = Router();

router.get('/', userGet)
router.put('/', userPut)
router.post('/',userPost)
router.delete('/', userDelete)

module.exports = router;
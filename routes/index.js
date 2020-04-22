const router = require('express').Router();
const controller = require('../controllers');

router.get('/', (req, res) => {
    controller.goToHome(req, res);
});

router.get('/confirmation', (req, res) => {
    res.render('confirmation');
});

router.get('/annecylacapitale', (req, res) => {
    res.render('admin');
});

router.post('/vote', (req, res) => {
    controller.makeUserVote(req, res);
});

router.get('/confirm/:token', (req, res) => {
    controller.confirmEmail(req, res);
});

router.get('/votes', (req, res) => {
    controller.getVotes(req, res);
});

router.put('/vote/:id', (req, res) => {
    controller.putVotes(req, res);
});

router.get('/api/email/:email', (req, res) => {
    controller.getEmail(req, res);
});

module.exports = router;
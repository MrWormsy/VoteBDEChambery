function goToHome(req, res) {
    res.render('index', {page : 'home', session: req.session});
}

function makeUserVote(req, res) {
    const Models = require('../models');
    const newVote = Models.Vote({
        nom: req.body.nom,
        prenom: req.body.prenom,
        filliere: req.body.filliere,
        email: req.body.email,
        vote: req.body.vote,
        emailconfirmation: false,
        adminconfirmation: false
    });

    newVote.save(function (err, vote) {
        if (err) throw err;
        sendEmailTo(vote.email, vote.token);
        res.end('done');
    });
}

function sendEmailTo(email, token) {

    const nodeMailer = require('nodemailer');

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nopnop@gmail.com',
            pass: 'nopnopnop'
        }
    });
    let mailOptions = {
        from: 'VoteBDEChambery@rosacorp.net',
        to: email,
        subject: 'Veuillez confirmer votre adresse email pour voter !',
        html: `Pour confirmer votre vote pour la nouvelle équipe de Chambéry veuillez cliker ici : <a href="http://51.178.46.76:7374/confirm/${token}">Confirmer le vote !</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.render('index');
    });
}

function confirmEmail(req, res) {
    const Models = require('../models');

    Models.Vote.findOne({ token: req.params.token}, function(err, p) {
        if (!p)
            return;
        else {
            p.emailconfirmation = true;

            p.save(function(err) {
                if (err)
                    console.log('error')
            });
        }
    });

    res.render('confirm');
}

function getVotes(req,res){
    const Models = require('../models');
    Models.Vote.find({adminconfirmation: false}, function (err,obj) {
        if (err) throw err;
        res.json(obj);
        console.log(obj)
    });
} 

function putVotes(req,res){
    const Models = require('../models');
    const update = {adminconfirmation: true}
    Models.Vote.findOneAndUpdate({_id: req.params.id},update,function (err,obj) {
        if (err) throw err;
        res.send("update");
    });
}

function getEmail(req, res) {
    const Models = require('../models');

    Models.Vote.find({email: req.params.email}, function (err, email) {
        if (err) throw err;
        res.json(email);
    });
}

module.exports.goToHome = goToHome;
module.exports.makeUserVote = makeUserVote;
module.exports.confirmEmail = confirmEmail;
module.exports.sendEmailTo = sendEmailTo;
module.exports.getVotes = getVotes;
module.exports.putVotes = putVotes;
module.exports.getEmail = getEmail;


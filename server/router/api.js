const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const dburl = "mongodb+srv://sivaprasad1110:admin@cluster0-lcbr7.mongodb.net/videoplayer?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

mongoose.connect(dburl, options, function(err){
    if(!err){
        console.log('Mongo DB connection is successful');
    }else{
        console.log('Error in connecting to db '+JSON.stringify(err, undefined, 2));
    }
});

const Video = require('../models/Video');

router.get('/videos', (req, res) => {
    console.log('get videos');
    Video.find()
    .then(videos => {
		res.json(videos);
	}).catch(err => {
		res.json({
			confirmation:'failure',
			message: 'Error while retriving videos :'+err.message
		});
	});

});

router.get('/videos/:id', (req, res) => {
    console.log('get one video by id');
    let id = req.params.id;
    Video.findById(id)
    .then(video => {
		res.json({
			confirmation: 'success',
			data: video
		})
	}).catch(err => {
		res.json({
			confirmation:'failure',
			message: 'Error while retriving video :'+err.message
		})
	});

});

router.post('/video', (req, res) => {

    let newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.Description = req.body.Description;
    console.log('insert video : '+newVideo);

    Video.create(newVideo)
    .then(insertVideo => {
		res.json({
			confirmation: 'success',
			data: insertVideo
		})
	}).catch(err => {
		res.json({
			confirmation:'failure',
			message: 'Error while create video :'+err.message
		})
	});

});

router.put('/video/:id', (req, res) => {
    console.log('update Video ');
    Video.findByIdAndUpdate(req.params.id, 
    {
        $set: {
            title: req.body.title,
            url : req.body.url,
            Description : req.body.Description
        }
    },
    {
        new : true        
    })
    .then(updateVideo => {
		res.json({
			confirmation: 'success',
			data: updateVideo
		})
	}).catch(err => {
		res.json({
			confirmation:'failure',
			message: 'Error while update video :'+err.message
		})
	});
});

router.delete('/video/:id', (req, res) => {
    console.log('delete Video ');
    Video.findByIdAndRemove(req.params.id)
    .then(deleteVideo => {
		res.json({
			confirmation: 'success',
			data: deleteVideo
		})
	}).catch(err => {
		res.json({
			confirmation:'failure',
			message: 'Error while delete video :'+err.message
		})
	});
});

module.exports = router;
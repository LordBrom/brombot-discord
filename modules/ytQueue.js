const ytdl = require('ytdl-core-discord');
const handleError = require("./handleError");

let connection;
let dispatcher;
let queue = [];
let started = false;
let playing = false;
let videoUrl;
let startTime;
let pauseTime;
let playLength;
let videoInfo;
let nextTimeout;

module.exports = class ytQueue {
	constructor(_connection){
		connection = _connection;
	}

	async add(newUrl, start = false) {
		var newVideoInfo = await ytdl.getInfo(newUrl);
		queue.push({
			url: newUrl,
			info: newVideoInfo.videoDetails
		});
		if (start) {
			this.next();
		}
	}

	clear(){
		queue = [];
	}

	async play(newUrl){
		if (newUrl) {
			var newVideoInfo = await ytdl.getInfo(newUrl);
			queue.unshift({
				url: newUrl,
				info: newVideoInfo.videoDetails
			});
			this.next();
		} else if(started){
			dispatcher.resume();
		} else {
			this.next();
		}
	}

	pause(){
		dispatcher.pause();
		playing = false;
	}

	async next(){
		let video = queue.pop();
		if (!video){return;}

		dispatcher = connection.play(await ytdl(video.url), { type: 'opus' });

		dispatcher.on('start', () => {
			console.log('audio is now playing!');
		});
		dispatcher.on('error', handleError);
		startTime = new Date();
		playing = true;
		started = true;

		videoInfo = video.info;
		playLength = videoInfo.lengthSeconds;

		if (nextTimeout) {
			clearTimeout(nextTimeout);
			nextTimeout = 0;
		}
		var self = this;
		nextTimeout = setTimeout(function () { self.next(); }, playLength * 1000);
	}

	getQueue() {
		let result = [];
		queue.forEach((video) => {
			result.push(video.info.title);
		})
		return result;
	}

	getPlaying() {
		if (playing) {
			return videoInfo;
		}
		return;
	}
};

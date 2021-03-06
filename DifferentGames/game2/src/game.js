let config = {
	width: 700,
	height: 600,
	backgroundColor: 0x000000,
	scene: [Scene1, Scene2, Scene3],
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	}
};

let gameSettings = {
	playerSpeed: 200,
	maxPowerups: 2,
	powerUpVel: 50,
};

let game = new Phaser.Game(config);

window.onLoad = function () {
	if (screen.width > 1500) {
		game = new Phaser.Game(480, 640, Phaser.AUTO, 'ph_game');
	} else {
		game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'ph_game')
	}

	game.state.add('StateMain', StateMain);
	game.state.start('StateMain');
};


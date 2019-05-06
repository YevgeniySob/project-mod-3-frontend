class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	}

	create() {
		this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background");
		this.background.setOrigin(0, 0);
		this.background.setScrollFactor(0);

		// this.background.height = config.height;
		// this.background.width = config.width;

		this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, 'ship1')
		this.ship2 = this.add.sprite(config.width/2, config.height/2, 'ship2')
		this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, 'ship3')

		this.ship1.play('ship1_anim');
		this.ship2.play('ship2_anim');
		this.ship3.play('ship3_anim');

		this.ship1.setInteractive();
		this.ship2.setInteractive();
		this.ship3.setInteractive();

		this.input.on('gameobjectdown', this.destroyShip, this);

		this.player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
		this.player.play('thrust');
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.player.setCollideWorldBounds(true);
		this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.physics.world.setBoundsCollision();

		this.powerUps = this.physics.add.group();

		for (let i = 0; i < gameSettings.maxPowerups; i++) {
			let powerUp = this.physics.add.sprite(16,16, 'power-up');
			this.powerUps.add(powerUp);
			powerUp.setRandomPosition(0,0, game.config.width, game.config.head)

			if (Math.random() > 0.5) {
				powerUp.play('red')
			} else {
				powerUp.play('gray')
			}

			powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
			powerUp.setCollideWorldBounds(true);
			powerUp.setBounce(1)
		}

		this.add.text(20,20, 'Playing Game', {
			font: '25px Arial',
			fill: 'yellow'
		});
	}

	movePlayerManager() {
		if (this.cursorKeys.left.isDown) {
			this.player.setVelocityY(0);
			this.player.setVelocityX(-gameSettings.playerSpeed)
		} else if (this.cursorKeys.right.isDown) {
			this.player.setVelocityY(0);
			this.player.setVelocityX(gameSettings.playerSpeed)
		}

		if (this.cursorKeys.up.isDown) {
			this.player.setVelocityX(0);
			this.player.setVelocityY(-gameSettings.playerSpeed)
		} else if (this.cursorKeys.down.isDown) {
			this.player.setVelocityX(0);
			this.player.setVelocityY(gameSettings.playerSpeed)
		}
	}

	static moveShip(ship, speed) {
		ship.y += speed;
		if (ship.y > config.height) {
			Scene2.resetShipPos(ship)
		}
	}

	static resetShipPos(ship) {
		ship.y = 0;
		ship.x = Phaser.Math.Between(0, config.width);
	}

	destroyShip(pointer, gameObject) {
		gameObject.setTexture('explosion');
		gameObject.play('explode');
	}

	update() {
		Scene2.moveShip(this.ship1, 1);
		Scene2.moveShip(this.ship2, 2);
		Scene2.moveShip(this.ship3, 3);
		this.movePlayerManager();

		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			console.log("FIRE!");
		}

		this.background.tilePositionX += 0.5;
	}

//	init()

//	preload()

//	create()

//	update()
}


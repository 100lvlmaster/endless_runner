import Phaser from 'phaser';
const gameOptions = {
	platformStartSpeed: 350,
	spawnRange: [100, 350],
	platformSizeRange: [50, 250],
	playerGravity: 900,
	jumpForce: 400,
	playerStartPosition: 200,
	jumps: 2
};

// playGame scene
export class playGame extends Phaser.Scene {
	constructor() {
		super('PlayGame');
	}
	static platform: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	static player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	preload(): void {
		this.load.image('platform', 'static/platform.png');
		this.load.image('player', 'static/player.png');
	}
	create(): void {
		// pool
		// adding a platform to the game, the arguments are platform width and x position

		// adding the player;
		playGame.player = this.physics.add
			.sprite(gameOptions.playerStartPosition, 100, 'player')
			// .setAccelerationX(10)
			.setScale(0.3);

		playGame.platform = this.physics.add.sprite(200, 300, 'platform');
		playGame.platform.setGravity(0).setImmovable(true).setCollideWorldBounds(true);
		// setting collisions between the player and the platform group
		this.physics.add.collider(playGame.player, playGame.platform);
		this.input.on('pointerdown', this.jump, this);
	}
	jump(): void {
		if (playGame.player.body.touching.down) {
			playGame.player.y -= 60;
		}
	}
	// the core of the script: platform are added from the pool or created on the fly
	update(): void {
		// game over
		// recycling platforms
	}
}

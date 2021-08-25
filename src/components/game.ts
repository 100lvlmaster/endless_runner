import Phaser from 'phaser';
const gameOptions = {
	platformStartSpeed: 350,
	spawnRange: [100, 350],
	platformSizeRange: [50, 250],
	playerGravity: 500,
	jumpForce: 400,
	playerStartPosition: 200,
	jumps: 2,
	playerStartX: 200,
	playerStartY: 600
};

// playGame scene
export class playGame extends Phaser.Scene {
	constructor() {
		super('PlayGame');
	}
	static initPlatforms = false;
	static platformPool: Phaser.GameObjects.Group;
	static activePlatforms: Phaser.GameObjects.Group;
	static player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	static nextPlatformDistance: number;
	static spaceBarKey: Phaser.Input.Keyboard.Key;
	preload(): void {
		this.load.image('platform', 'static/platform.png');
		this.load.image('player', 'static/player.png');
	}
	async create(): Promise<void> {
		// Player
		playGame.player = this.physics.add
			.sprite(gameOptions.playerStartX, gameOptions.playerStartY, 'player')
			.setScale(0.3)
			.setAccelerationX(0)
			.setVelocityX(0)
			.setCollideWorldBounds(true);

		// Active platforms
		playGame.activePlatforms = this.physics.add.group({
			removeCallback: (platform) => playGame.platformPool.add(platform)
		});
		// Saved Platform pool
		playGame.platformPool = this.physics.add.group({
			removeCallback: (platform) => playGame.activePlatforms.add(platform)
		});
		//
		this.physics.add.collider(playGame.player, playGame.activePlatforms);
		//
		playGame.spaceBarKey = this.input.keyboard.addKey('SPACE');

		this.addPlatform();
		// on('pointerdown', this.jump);
		// await this.addPlatform();
	}
	async addPlatform(): Promise<void> {
		setInterval(async () => {
			if (playGame.activePlatforms.getLength() > 3 && !playGame.player.data) {
				playGame.player.setGravityY(gameOptions.playerGravity);
				playGame.player.setData({ gravity: gameOptions.playerGravity });
			}

			const width = Phaser.Math.Between(
				gameOptions.platformSizeRange[0],
				gameOptions.platformSizeRange[1]
			);
			playGame.activePlatforms
				.create(+this.game.config.width * 0.9, +this.game.config.height * 0.8, 'platform')
				.setDisplaySize(width, 30)
				.setVelocityX(gameOptions.platformStartSpeed * -1)
				.setImmovable(true);
		}, 600);

		return;
	}
	/// The User jumps
	jump(): void {
		if (playGame.player.body.touching.down) {
			playGame.player.y -= 100;
		}
	}
	// the core of the script: platform are added from the pool or created on the fly
	async update(): Promise<void> {
		if (playGame.spaceBarKey.isDown) {
			this.jump();
		}
		if (playGame.player.y > this.game.config.height) {
			this.scene.start('PlayGame');
		}
		// recycling platforms
		// adding new platforms
		//.Keyboard.KeyCodes.SPACE
		// recycling platforms
	}
}

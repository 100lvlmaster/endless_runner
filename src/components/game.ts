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
	static initPlatforms = false;
	static platformPool: Phaser.GameObjects.Group;
	static activePlatforms: Phaser.GameObjects.Group;
	static player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	static nextPlatformDistance: number;
	preload(): void {
		this.load.image('platform', 'static/platform.png');
		this.load.image('player', 'static/player.png');
	}
	async create(): Promise<void> {
		// Player
		playGame.player = this.physics.add
			.sprite(200, 100, 'player')
			.setScale(0.3)
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
		// this.addPlatform(+this.game.config.width, +this.game.config.width / 2);
		this.input.on('pointerdown', this.jump);
		await this.addPlatform();
	}
	async addPlatform(): Promise<void> {
		setInterval(async () => {
			playGame.activePlatforms
				.create(+this.game.config.width * 0.9, +this.game.config.height * 0.8, 'platform')
				.setVelocityX(gameOptions.platformStartSpeed * -1)
				.setImmovable(true)
				.setBounce(0)
				.setCollideWorldBounds(true);
		}, 600);

		return;
	}
	/// The User jumps
	jump(): void {
		if (playGame.player.body.touching.down) {
			playGame.player.y -= 40;
		}
	}
	// the core of the script: platform are added from the pool or created on the fly
	async update(): Promise<void> {
		// if (playGame.player.y > this.game.config.height) {
		// 	this.scene.start('PlayGame');
		// }
		// recycling platforms
		// adding new platforms
		//.Keyboard.KeyCodes.SPACE
		// recycling platforms
	}
}

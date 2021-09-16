import Phaser from 'phaser';
const gameOptions = {
	platformStartSpeed: 350,
	spawnRange: [100, 350],
	platformSizeRange: [50, 250],
	playerGravity: 400,
	jumpForce: 400,
	playerStartPosition: 200,
	jumps: 2,
	playerStartX: window.innerWidth * 0.5,
	playerStartY: window.innerHeight * 0.5
};

// playGame scene
export class playGame extends Phaser.Scene {
	///
	constructor() {
		super('PlayGame');
	}
	///
	static initPlatforms = false;
	static platformPool: Phaser.GameObjects.Group;
	static activePlatforms: Phaser.GameObjects.Group;
	static player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	static nextPlatformDistance: number;
	static spaceBarKey: Phaser.Input.Keyboard.Key;

	/// Preload
	preload(): void {
		this.load.image('platform', 'platform.png');
		this.load.image('player', 'player.png');
	}
	/// Create
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
		}, 800);

		return;
	}
	/// The User jumps
	jump(): void {
		if (playGame.player.body.touching.down) {
			playGame.player.setVelocityY(gameOptions.jumpForce * -1);
		}
	}
	/// Update
	async update(): Promise<void> {
		if (playGame.spaceBarKey.isDown) {
			this.jump();
		}
		if (playGame.player.y > +this.game.config.height) {
			this.scene.start('PlayGame');
		}
	}
}

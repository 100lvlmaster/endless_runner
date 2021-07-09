<script lang="ts">
	import Phaser from 'phaser';

	var config = {
		type: Phaser.AUTO,
		width: window.innerHeight,
		height: window.innerWidth,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 200 }
			}
		},
		scene: {
			preload: reload,
			create: create
		}
	};

	var game: Phaser.Game = new Phaser.Game(config);
	window.focus();
	function reload() {
		this.load.image('morty', '/static/rick_morty_sprite.png');
		this.load.image('bg', '/static/landscape.jpg');
	}
	function create() {
		this.add.image(400, 300, 'bg');
		let morty_sprite = this.game.add.sprite(300, 200, 'morty');
		this.game.physics.enable(morty_sprite, Phaser.AUTO);

		const logo = this.physics.add.image(200, 10, 'morty');

		logo.setVelocity(100, 200);
		logo.setBounce(1, 1);
		logo.setCollideWorldBounds(true);

		// emitter.startFollow(logo);
	}
</script>

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
			preload: preload,
			create: create
		}
	};

	var game: Phaser.Game = new Phaser.Game(config);
	window.focus();
	function preload() {
		this.load.image('morty', '/static/rick_morty_sprite.png');
		this.load.image('bg', '/static/landscape.jpg');
		this.load.svg('platform', '/static/platform.svg');
	}
	function create() {
		this.add.image(400, 300, 'bg');
		let morty_sprite = this.game.add.sprite(300, 200, 'morty');
		morty_sprite.name = 'morty';
		this.game.physics.enable(morty_sprite, Phaser.AUTO);

		// var emitter = particles.createEmitter({
		// 	speed: 10,
		// 	scale: { start: 1, end: 0 },
		// 	blendMode: 'ADD'
		// });

		var logo = this.physics.add.image(200, 10, 'morty');

		logo.setVelocity(100, 200);
		logo.setBounce(1, 1);
		logo.setCollideWorldBounds(true);

		// emitter.startFollow(logo);
	}
</script>

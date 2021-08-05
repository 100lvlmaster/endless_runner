<script lang="ts">
	import Phaser from 'phaser';
	import { playGame } from './game';
	const config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		backgroundColor: '#FFF1F1',
		width: window.innerWidth,
		height: window.innerHeight,
		title: `Endless runner`,
		parent: 'gameContainer',
		scale: {
			parent: 'gameContainer',
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 200 }
			}
		},
		scene: playGame
	};

	const game: Phaser.Game = new Phaser.Game(config);
	window.focus();
</script>

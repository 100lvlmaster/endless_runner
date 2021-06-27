<script lang="ts">
	import { onMount } from 'svelte';
	let screen: any;

	onMount(async () => {
		screen = (await import('../components/screen.svelte')).default;
	});
</script>

<svelte:component this={screen} />

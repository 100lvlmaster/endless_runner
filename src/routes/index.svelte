<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	let screen: any;
	if (browser) {
		onMount(async () => {
			screen = (await import('../components/screen.svelte')).default;
		});
	}
</script>

<svelte:head><title>Endless Runner</title></svelte:head>
<svelte:component this={screen} />

<script lang="ts">
	import LettersView from '$lib/views/LettersView.svelte';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
    <title>Your Letters</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<LettersView />

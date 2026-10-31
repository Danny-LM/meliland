<script lang="ts">
	import puzzle from '$lib/assets/puzzle.svg';
	import PuzzleView from '$lib/views/PuzzleView.svelte';
</script>

<svelte:head>
	<title>Secret Puzzle</title>
	<link rel="icon" href={puzzle} />
</svelte:head>

<PuzzleView />

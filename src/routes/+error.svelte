<script lang="ts">
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { onMount } from 'svelte';

    onMount(() => {
        if (page.status === 404) {
            goto(resolve('/'));
        }
    });
</script>

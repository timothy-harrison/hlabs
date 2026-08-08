<script lang="ts">
	import type { ComponentProps } from "svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { ChevronDown, ChevronRight } from "@lucide/svelte";

	let {
		expanded = false,
		...restProps
	}: ComponentProps<typeof Button> & { expanded: boolean } = $props();
</script>

<Button variant="ghost" {...restProps}>
	{#if expanded}
		<ChevronDown></ChevronDown>
	{:else}
		<ChevronRight></ChevronRight>
	{/if}
</Button>

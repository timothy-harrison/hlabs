<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { CircleX } from "@lucide/svelte";
	import WindowPaneMenuBar from "./WindowPaneMenuBar.svelte";
	import { cn } from "$lib/utils";

	let { win, updateActive, children, ...rest } = $props();
</script>

<div class="group w-1/2 h-full p-2" {...rest}>
	<Card.Root
		class={cn("w-full h-full rounded-xs p-0 border-2 border-accent outline-0")}
	>
		<Card.Header
			class="flex rounded-t-xs bg-accent/30 border-b py-0.5 items-center justify-between w-full px-1"
		>
			<WindowPaneMenuBar />
			<button class="text-red-300 flex justify-end flex-1 px-0.5">
				<CircleX size="16" class="" />
			</button>
		</Card.Header>
		<Card.Content class="w-full h-full">
			{@render children?.()}
		</Card.Content>
	</Card.Root>
</div>

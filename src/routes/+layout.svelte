<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { ModeWatcher, toggleMode, mode } from "mode-watcher";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";

	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import {
		ChevronDown,
		ChevronDownIcon,
		ChevronUp,
		Ellipsis,
		Files,
		GalleryHorizontal,
		House,
		LayoutGridIcon,
		Plus,
		Square,
		Terminal,
		User,
		type IconProps,
	} from "@lucide/svelte";
	import { Slider } from "$lib/components/ui/slider/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input";
	import * as Card from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils";
	import { onMount, type Component } from "svelte";
	import { browser } from "$app/env";

	let view = $state<"grid" | "infinite">("grid");
	let newConnDialog = $state(false);

	let addWindowDialogOpen = $state(false);
	let filterValue = $state("");
	const windowTypes = [
		{ name: "NeoVim", description: "Text editor" },
		{ name: "Files", description: "File Browser" },
		{ name: "Flows", description: "Flow creator" },
	];

	if (browser) {
		window.alertHello = (msg: string) => alert(msg);
	}

	let connected = $state(false);

	let { children } = $props();
</script>

<ModeWatcher />

<svelte:head
	><link rel="icon" href={favicon} />
	<link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
	<script src="node_modules/@xterm/xterm/lib/xterm.js"></script>
</svelte:head>

{#snippet ExtensionNode({
	name,
	description,
	icon: Icon,
	image,
}: {
	name: string;
	description: string;
	icon?: Component<IconProps>;
	image?: string;
})}
	<Button variant="ghost" class="w-full h-10 rounded-none m-0 flex p-1">
		<div class="overflow-hidden w-8 h-full">
			<Icon />
			{@html image}
			<!-- <Files class="self-center" /> -->
			<!-- <img src="vim.png" alt="" class="object-cover" /> -->
		</div>
		<div class="flex flex-col items-start flex-1">
			<h1 class="font-mono">{name}</h1>
			<p class="font-medium text-xs text-muted-foreground">{description}</p>
		</div>
	</Button>
{/snippet}

<div class="w-screen h-screen flex flex-col">
	<div class="w-screen bg-background/30 border-b flex p-1 max-h-32">
		<div class="flex items-center gap-1">
			<Drawer.Root direction={"left"}>
				<Drawer.Trigger class={buttonVariants({ variant: "default" })}>
					<Plus
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all!"
					/>
				</Drawer.Trigger>
				<Drawer.Content
					onpointerdowncapture={(e) => {
						if (e.pointerType == "mouse") {
							e.stopPropagation();
						}
					}}
					class="rounded-xs border-none flex flex-col items-center"
				>
					<div class="p-1 w-full py-4">
						<Input class="rounded-none" placeholder="Search windows..." />
					</div>
					<Collapsible.Root open class="w-full space-y-2">
						<div class="flex items-center justify-between">
							<Collapsible.Trigger
								class="w-full group flex items-center justify-between bg-accent/30 px-4 py-1"
							>
								<h4 class="text-sm font-semibold">INSTALLED</h4>
								<ChevronDownIcon class="group-data-[state=open]:hidden block" />
								<ChevronUp class="group-data-[state=open]:block hidden" />
								<span class="sr-only">Toggle</span>
							</Collapsible.Trigger>
						</div>
						<Collapsible.Content class="space-y-2 px-2">
							{@render ExtensionNode({
								name: "Text Editor",
								description: "Text editor",
								image: `<img src='vim.png' class='object-cover' />`,
							})}
							{@render ExtensionNode({
								name: "Terminal",
								description: "Terminal emulator",
								icon: Terminal,
							})}
							{@render ExtensionNode({
								name: "Files",
								description: "File Explorer",
								icon: Files,
							})}
						</Collapsible.Content>
					</Collapsible.Root>
				</Drawer.Content>
			</Drawer.Root>
			<Button variant="secondary" href="/">
				<House />
			</Button>
			<Button variant="outline" href="/molstar" class="self-start">Mol*</Button>
		</div>
		<div class="flex-1"></div>
		<div class="flex items-center gap-1">
			<ButtonGroup.Root class="border rounded-full">
				<Button variant="outline" size="icon">
					<Square />
				</Button>
				<Button size="icon" variant="ghost">2</Button>
				<Button size="icon" variant="ghost">3</Button>
				<Button size="icon" variant="ghost"><Ellipsis /></Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button
					onclick={() => (view = "grid")}
					class={cn(
						buttonVariants({ variant: "outline" }),
						view === "grid" && "text-accent",
					)}
					size="icon"><LayoutGridIcon /></Button
				>
				<Button
					onclick={() => (view = "infinite")}
					class={cn(
						buttonVariants({ variant: "outline" }),
						view === "infinite" && "text-accent",
					)}
					size="icon"><GalleryHorizontal /></Button
				>
			</ButtonGroup.Root>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class={cn(buttonVariants({ variant: "outline" }), "min-w-60")}
				>
					{#if connected}
						<div class="flex w-full gap-2">
							<div class="flex flex-col">
								<div class="flex items-center gap-2">
									<span class="text-[8pt]">RAM</span>
									<span class="text-xs text-muted-foreground">
										8.1 / 12.7 GB
									</span>
								</div>
								<Slider
									thumbPositioning="exact"
									type="single"
									value={(8.1 * 100) / 12.7}
									max={100}
									step={1}
								/>
							</div>
							<div class="flex flex-col w-20">
								<div class="flex items-center gap-2">
									<span class="text-[8pt]">Disk</span>
								</div>
								<Slider type="single" value={4} max={20} step={1} />
							</div>
						</div>
						<ChevronDown />
					{:else}
						<div class="flex w-full items-end justify-end align-baseline">
							<p class="flex-1">Connect</p>
							<ChevronDown size="icon" class="self-center" />
						</div>
					{/if}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Available Connections</DropdownMenu.Label>
						<DropdownMenu.Item
							disabled={!connected}
							onclick={() => (connected = false)}>Disconnect</DropdownMenu.Item
						>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={() => (connected = true)}
							>Local</DropdownMenu.Item
						>
						<DropdownMenu.Item disabled>RMIT AWS HPC Adapter</DropdownMenu.Item>
						<DropdownMenu.Item disabled>HPC</DropdownMenu.Item>
						<DropdownMenu.Item disabled>Gadi</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={() => (newConnDialog = true)}
							>New Connection</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class={cn(buttonVariants({ variant: "outline" }))}
				>
					<User />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="min-w-50">
					<DropdownMenu.Group>
						<DropdownMenu.Label>s3850189@student.rmit.edu.au</DropdownMenu.Label
						>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Organisation: RMIT</DropdownMenu.Label>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>Change Org.</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent>
									<DropdownMenu.Item>RMIT</DropdownMenu.Item>
									<DropdownMenu.Item>Monash</DropdownMenu.Item>
									<DropdownMenu.Item>Personal</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>Add...</DropdownMenu.Item>
									<DropdownMenu.Item>New...</DropdownMenu.Item>
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />

						<DropdownMenu.Item>Profile</DropdownMenu.Item>
						<DropdownMenu.Item>Billing</DropdownMenu.Item>
						<DropdownMenu.Item>Team</DropdownMenu.Item>
						<DropdownMenu.Item>Subscription</DropdownMenu.Item>
						<DropdownMenu.Item class="" onclick={toggleMode}>
							<span class="flex-1"> Theme </span>
							<div class={buttonVariants({ variant: "outline" })}>
								{#if mode.current === "light"}
									<SunIcon
										size="icon"
										class="h-[1.2rem] w-[1.2rem] scale-100"
									/>
								{:else}
									<MoonIcon size="icon" class="h-[1.2rem] w-[1.2rem]" />
								{/if}
							</div>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<div class="w-full h-full">
		{@render children()}
	</div>
</div>

{#snippet WindowCard({
	name,
	description,
}: {
	name: string;
	description: string;
})}
	<button onclick={() => (addWindowDialogOpen = false)}>
		<Card.Root class="w-40 h-20 hover:outline outline-accent">
			<Card.Header>
				<Card.Title>
					<span>
						{name}
					</span>
				</Card.Title>
				<Card.Description>{description}</Card.Description>
			</Card.Header>
		</Card.Root>
	</button>
{/snippet}

<Dialog.Root bind:open={addWindowDialogOpen}>
	<Dialog.Content class="w-3/4 rounded-xs">
		<Dialog.Header>
			<Dialog.Title>Add Window</Dialog.Title>
			<Dialog.Description>
				<Input
					class="max-w-50"
					bind:value={filterValue}
					placeholder="Filter..."
				/>
			</Dialog.Description>
		</Dialog.Header>
		<div class="justify-items-center grid grid-cols-3 gap-2 p-1">
			{#each windowTypes.filter((w) => w.name
					.toLowerCase()
					.includes(filterValue)) as windows}
				{@render WindowCard(windows)}
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>

<!-- New Connection dialog -->
<Dialog.Root bind:open={newConnDialog}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account
				and remove your data from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

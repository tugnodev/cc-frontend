<script lang="ts">
    import { House, Search, CircleUserRound } from "@lucide/svelte";
    import { page } from "$app/stores";
    import { slide } from "svelte/transition";
    import { cubicOut, linear } from "svelte/easing";

    function isActive(path: string) {
        return $page.url.pathname === path
            ? "flex bg-base-200 px-4 py-2 rounded-4xl"
            : "";
    }

    const navItems = [
        { label: "Marche", href: "/market", icon: House },
        { label: "Recherche", href: "/market/search", icon: Search },
        { label: "Profile", href: "/market/profile", icon: CircleUserRound },
    ];
</script>

<nav class="flex bg-base-300/50 rounded-4xl shadow-lg">
    <ul class={`flex items-center justify-center p-2 gap-4`}>
        {#each navItems as item}
            <li class={isActive(item.href) + ` transition-all duration-300`}>
                <a
                    class="flex justify-center gap-2 items-center"
                    href={item.href}
                >
                    <item.icon size={40} />
                    <p class="font-semibold text-xl">
                        {$page.url.pathname === item.href ? item.label : ""}
                    </p>
                </a>
            </li>
        {/each}
    </ul>
</nav>

<script lang="ts">
    import { House, Search, CircleUserRound } from "@lucide/svelte";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";

    function isActive(path: string) {
        return page.url.pathname === path
            ? "flex bg-base-100 px-2 py-1.5 rounded-full"
            : "";
    }

    const navItems = [
        { label: "Marche", href: "/market", icon: House },
        { label: "Recherche", href: "/market/search", icon: Search },
        { label: "Profile", href: "/market/profile", icon: CircleUserRound },
    ];
</script>

<nav
    class="flex bg-base-300/60 backdrop-blur-md border-2 shadow-md border-base-300 rounded-full"
>
    <ul class={`flex items-center justify-center p-1 gap-2`}>
        {#each navItems as item}
            <li class={isActive(item.href) + ` transition-all duration-400`}>
                <a
                    class="flex justify-center gap-1 px-1 items-center"
                    href={item.href}
                >
                    <item.icon  />
                    <p class="font-semibold">
                        {page.url.pathname === item.href ? item.label : ""}
                    </p>
                </a>
            </li>
        {/each}
    </ul>
</nav>

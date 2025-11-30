<script>
    import { House, Search, CircleUserRound } from "@lucide/svelte";
    import { page } from "$app/stores";

    const navItems = [
        { label: "Home", href: "/market", icon: House },
        { label: "Recherche", href: "/market/search", icon: Search },
        { label: "Profile", href: "/market/profile", icon: CircleUserRound },
    ];
</script>

<nav class="flex bg-base-300/50 rounded-4xl">
    <ul class="flex p-4 gap-8">
        {#each navItems as item}
            <li>
                <a href={item.href}>
                    <item.icon size={40} />
                </a>
            </li>
        {/each}
    </ul>
</nav>

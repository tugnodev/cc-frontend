<script lang="ts">
    import { ShoppingCart, LayoutDashboard, Package } from "@lucide/svelte";
    import { page } from "$app/stores";

    function isActive(path: string) {
        return $page.url.pathname === path
            ? "flex bg-base-100 p-2 rounded-4xl"
            : "";
    }

    const navItems = [
        { label: "Dashboard", href: "/shop", icon: LayoutDashboard },
        { label: "Commande", href: "/shop/commande", icon: ShoppingCart },
        { label: "Article", href: "/shop/article", icon: Package },
    ];
</script>

<nav
    class="flex bg-base-300/60 backdrop-blur-md border-2 shadow-md border-base-300 rounded-4xl"
>
    <ul class={`flex items-center justify-center p-2 gap-2`}>
        {#each navItems as item}
            <li class={isActive(item.href) + ` transition-all duration-400`}>
                <a
                    class="flex justify-center gap-2 items-center"
                    href={item.href}
                >
                    <item.icon size={28} />
                    <p class="font-bold text-xl">
                        {$page.url.pathname === item.href ? item.label : ""}
                    </p>
                </a>
            </li>
        {/each}
    </ul>
</nav>

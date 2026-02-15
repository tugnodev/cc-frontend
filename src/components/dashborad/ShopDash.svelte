<script lang="ts">
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
    import { orders } from "$lib/store/order";
    import { type orderDto } from "$lib/services/dtos/order";

    // --- 1. Gestion des Données (Runes) ---
    let salesCanvas;
    let categoryCanvas;
    let salesChart;
    let categoryChart;

    let labels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    // Données brutes du store
    let commandeData: orderDto[] = $state([]);

    // Données pour les graphiques
    let salesData = $state(new Array(12).fill(0));
    let categoryData = $state({ labels: [], values: [] });

    // --- 2. KPIs Dérivés (Automatiquement mis à jour) ---
    let totalRevenue = $derived(
        commandeData
            .filter(o => o.order_status === "completed")
            .reduce((acc, order) => acc + order.article_details.reduce((sum, art) => sum + art.article.price, 0), 0)
    );

    let totalOrdersCount = $derived(commandeData.length);

    let avgBasket = $derived(
        totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount).toFixed(2) : 0
    );

    onMount(() => {
        const unsubscribe = orders.subscribe((data) => {
            if (!data) return;
            commandeData = data;

            // --- Calcul Ventes Mensuelles ---
            const monthlyTotals = new Array(12).fill(0);
            const categoriesMap = new Map();

            commandeData.forEach(order => {
                // Calcul du total par commande
                let orderTotal = order.article_details.reduce((sum, art) => sum + art.article.price, 0);

                if (order.order_status === "completed") {
                    const monthIndex = new Date(order.createdAt).getMonth();
                    monthlyTotals[monthIndex] += orderTotal;
                }

                // --- Calcul Répartition par Catégorie ---
                order.article_details.forEach(item => {
                    const catName = item.article.category || "Inconnu";
                    categoriesMap.set(catName, (categoriesMap.get(catName) || 0) + 1);
                });
            });

            salesData = monthlyTotals;
            categoryData = {
                labels: Array.from(categoriesMap.keys()),
                values: Array.from(categoriesMap.values())
            };
        });

        return unsubscribe;
    });

    // --- 3. Initialisation et Mise à jour des Graphiques ---
    $effect(() => {
        if (!salesCanvas || !categoryCanvas) return;

        const style = getComputedStyle(document.documentElement);
        const colorPrimary = style.getPropertyValue("--color-primary").trim() || "#3b82f6";
        const colorSecondary = style.getPropertyValue("--color-secondary").trim() || "#641ae3";
        const colorAccent = style.getPropertyValue("--color-accent").trim() || "#1fb2a6";
        const colorBaseContent = style.getPropertyValue("--color-base-content").trim() || "#1f2937";

        // Chart de Ventes
        if (!salesChart) {
            salesChart = new Chart(salesCanvas, {
                type: "line",
                data: {
                    labels: [...labels],
                    datasets: [{
                        label: "Revenus",
                        data: [...salesData],
                        borderColor: colorPrimary,
                        backgroundColor: colorPrimary,
                        tension: 0.4,
                        fill: false,
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        } else {
            salesChart.data.datasets[0].data = salesData;
            salesChart.update();
        }

        // Chart de Catégories
        if (!categoryChart) {
            categoryChart = new Chart(categoryCanvas, {
                type: "doughnut",
                data: {
                    labels: categoryData.labels,
                    datasets: [{
                        data: categoryData.values,
                        backgroundColor: [colorPrimary, colorSecondary, colorAccent, "#fbbf24", "#ef4444"],
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: "75%" }
            });
        } else {
            categoryChart.data.labels = categoryData.labels;
            categoryChart.data.datasets[0].data = categoryData.values;
            categoryChart.update();
        }
    });
</script>

<div class="text-base-content mb-8 p-4 md:p-8">
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-3xl font-bold">Tableau de Bord</h1>
            <p class="opacity-60">Basé sur {totalOrdersCount} commandes enregistrées.</p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card bg-base-200/50 border border-base-300 p-6">
            <p class="text-sm opacity-70 font-medium">Revenu Total</p>
            <h3 class="text-3xl font-bold text-primary mt-1">{totalRevenue.toLocaleString()} FCFA</h3>
        </div>

        <div class="card bg-base-200/50 border border-base-300 p-6">
            <p class="text-sm opacity-70 font-medium">Commandes</p>
            <h3 class="text-3xl font-bold text-secondary mt-1">{totalOrdersCount}</h3>
        </div>

        <div class="card bg-base-200/50 border border-base-300 p-6">
            <p class="text-sm opacity-70 font-medium">Panier Moyen</p>
            <h3 class="text-3xl font-bold text-accent mt-1">{avgBasket} FCFA</h3>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="card lg:col-span-2 bg-base-100 border border-base-300 shadow-xl p-6">
            <h2 class="card-title text-lg mb-4">Analyse des Ventes Mensuelles</h2>
            <div class="relative h-[300px] w-full">
                <canvas bind:this={salesCanvas}></canvas>
            </div>
        </div>

        <div class="card bg-base-100 border border-base-300 shadow-xl p-6">
            <h2 class="card-title text-lg mb-4">Répartition Catégories</h2>
            <div class="relative h-[250px] w-full flex justify-center">
                <canvas bind:this={categoryCanvas}></canvas>
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
                    <div>
                        <span class="block text-xl font-bold">{categoryData.labels.length}</span>
                        <span class="text-xs opacity-50">Types</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    import Chart from "chart.js/auto";

    // --- 1. Gestion des Données (Runes) ---
    let salesCanvas;
    let categoryCanvas;
    let salesChart;
    let categoryChart;

    // Vos données réactives
    let salesData = $state([12000, 19000, 15000, 22000, 18000, 24500]);
    let labels = $state(["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"]);

    let kpi = {
        revenue: "24 500 €",
        orders: 342,
        avgBasket: "71 €",
        growth: "+12.5%",
    };

    // --- 2. Initialisation Unique (Au montage du composant) ---
    $effect(() => {
        if (!salesCanvas || !categoryCanvas) return;

        const getThemeColor = (variableName) => {
            if (typeof window !== "undefined") {
                const style = getComputedStyle(document.documentElement);
                return style.getPropertyValue(variableName).trim() || "#3b82f6";
            }
            return "#3b82f6";
        };

        const colorPrimary = getThemeColor("--color-primary");
        const colorSecondary = getThemeColor("--color-secondary");
        const colorAccent = getThemeColor("--color-accent");
        const colorBaseContent = getThemeColor("--color-base-content");

        // Initialisation Sales Chart
        salesChart = new Chart(salesCanvas.getContext("2d"), {
            type: "line",
            data: {
                labels: [...labels],
                datasets: [
                    {
                        label: "Revenus",
                        data: [...salesData],
                        borderColor: colorPrimary,
                        backgroundColor: colorPrimary,
                        borderWidth: 3,
                        tension: 0.4,
                        pointBackgroundColor: getThemeColor("--color-base-100"),
                        pointBorderColor: colorPrimary,
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        ticks: {
                            color: colorBaseContent,
                            font: { family: "Raleway" },
                        },
                    },
                    x: {
                        ticks: {
                            color: colorBaseContent,
                            font: { family: "Raleway" },
                        },
                    },
                },
            },
        });

        // Initialisation Category Chart
        categoryChart = new Chart(categoryCanvas.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ["Digital", "Physique", "Services", "Autres"],
                datasets: [
                    {
                        data: [55, 30, 10, 5],
                        backgroundColor: [
                            colorPrimary,
                            colorSecondary,
                            colorAccent,
                            colorBaseContent,
                        ],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "75%",
            },
        });

        return () => {
            salesChart?.destroy();
            categoryChart?.destroy();
        };
    });

    // --- 3. Mise à jour Dynamique (Surveille les changements de salesData) ---
    $effect(() => {
        if (salesChart) {
            salesChart.data.labels = [...labels];
            salesChart.data.datasets[0].data = [...salesData];
            salesChart.update(); // Force le dessin du graphique
        }
    });

    // --- 4. Simulation de Ventes (Pour tester la réactivité) ---
    function simulerVente() {
        salesData[5] += 5000;
    }
</script>

<div class="text-base-content mb-8 p-4 md:p-8">
    <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
        <div>
            <h1 class="text-3xl font-bold text-base-content">
                Tableau de Bord
            </h1>
            <p class="text-base-content/60 mt-1">
                Bon retour, voici vos performances du jour.
            </p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
            class="card rounded-xl bg-base-200/50 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="card-body flex flex-row items-center justify-between p-6"
            >
                <div>
                    <p class="text-sm font-medium text-base-content/70">
                        Revenu Total
                    </p>
                    <h3 class="text-3xl font-bold text-primary mt-1">
                        {kpi.revenue}
                    </h3>
                </div>
                <div
                    class="radial-progress text-primary text-xs font-bold"
                    style="--value:70; --size:3rem;"
                    role="progressbar"
                >
                    70%
                </div>
            </div>
        </div>

        <div
            class="card rounded-xl bg-base-200/50 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="card-body flex flex-row items-center justify-between p-6"
            >
                <div>
                    <p class="text-sm font-medium text-base-content/70">
                        Commandes
                    </p>
                    <h3 class="text-3xl font-bold text-secondary mt-1">
                        {kpi.orders}
                    </h3>
                </div>
                <div
                    class="badge badge-secondary badge-lg text-secondary-content gap-2"
                >
                    ▲ {kpi.growth}
                </div>
            </div>
        </div>

        <div
            class="card rounded-xl bg-base-200/50 border border-base-300 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="card-body flex flex-row items-center justify-between p-6"
            >
                <div>
                    <p class="text-sm font-medium text-base-content/70">
                        Panier Moyen
                    </p>
                    <h3 class="text-3xl font-bold text-accent mt-1">
                        {kpi.avgBasket}
                    </h3>
                </div>
                <div class="p-3 bg-accent/20 rounded-full text-accent">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
            class="card rounded-xl lg:col-span-2 bg-base-100 border border-base-300 shadow-xl"
        >
            <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="card-title text-lg">Analyse des Ventes</h2>
                    <select
                        class="select select-sm select-bordered w-32 rounded-selector bg-base-200"
                    >
                        <option>6 mois</option>
                        <option>1 an</option>
                    </select>
                </div>
                <div class="relative h-[300px] w-full">
                    <canvas bind:this={salesCanvas}></canvas>
                </div>
            </div>
        </div>

        <div
            class="card rounded-xl bg-base-100 border border-base-300 shadow-xl"
        >
            <div class="card-body">
                <h2 class="card-title text-lg mb-4">Répartition</h2>
                <div class="relative h-[250px] w-full flex justify-center">
                    <canvas bind:this={categoryCanvas}></canvas>
                    <div
                        class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div class="text-center">
                            <span
                                class="block text-2xl font-bold text-base-content"
                                >100%</span
                            >
                            <span class="text-xs text-base-content/50"
                                >Total</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

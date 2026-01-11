<script lang="ts">
    const defaultAvatar =
        "https://ui-avatars.com/api/?name=User&background=22c55e&color=fff";

    const users = [
        {
            name: "Awa Ndiaye",
            avatar: "https://randomuser.me/api/portraits/women/42.jpg",
            rating: "4.9",
            sales: "1 240",
        },
        {
            name: "Moussa Diop",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: "4.8",
            sales: "980",
        },
        {
            name: "Fatou Sarr",
            avatar: "https://randomuser.me/api/portraits/women/48.jpg",
            rating: "4.9",
            sales: "1 100",
        },
        {
            name: "Ibrahima Fall",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            rating: "4.7",
            sales: "870",
        },
        {
            name: "Aminata Ba",
            avatar: "https://randomuser.me/api/portraits/women/34.jpg",
            rating: "4.8",
            sales: "920",
        },
    ];

    function fallback(e: any) {
        e.target.src = defaultAvatar;
    }
</script>

<main class="w-full">
  <section class="w-full">
    <div class="w-full mx-auto px-4">

      <!-- Titre -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-bold text-base-content">
            Utilisateurs certifiés
          </h2>
          <p class="text-xs text-base-content/70">
            Des vendeurs vérifiés et fiables
          </p>
        </div>

        <!-- Desktop -->
        <a href="#" class="hidden md:inline-flex btn btn-outline btn-sm">
          Voir tout
        </a>
      </div>

      <!-- LISTE -->
      <div
        class="flex gap-3 overflow-x-auto no-scrollbar
               md:grid md:grid-cols-4 md:overflow-visible"
      >
        {#each users as user}
          <div class="min-w-[145px] md:min-w-0 card bg-base-200 shadow-md rounded-box min-h-[175px]">
            <div class="card-body p-3 flex flex-col  text-center">

              <!-- Haut -->
              <div class="flex flex-col items-center ">
                <div class="avatar">
                  <div class="w-10 rounded-full ring ring-success ring-offset-base-100 ring-offset-1">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      on:error={fallback}
                    />
                  </div>
                </div>

                <h3 class="mt-1 text-xs font-semibold text-base-content">
                  {user.name}
                </h3>

                <!-- <div class="badge badge-success badge-xs mt-1">
                  Certifié
                </div> -->
              </div>
              
            </div>

    </div>
  </section>
</main>

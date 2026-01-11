<<<<<<< HEAD
<script lang="ts">
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import Chart from 'chart.js/auto';
    (async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();
</script>

<Main>
<<<<<<< HEAD
    
    <h1>Welcome to CC</h1>
=======
    <AdBanner images={["/ads/ad1.jpg", "/ads/ad2.jpg", "/ads/ad3.jpg"]} />
>>>>>>> 33f67835735b3f0676e84a720374eb9c52754210
=======
<script>
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import ShopDash from "../../components/dashborad/ShopDash.svelte";
</script>

<Main>
    <ShopDash />
>>>>>>> teste
</Main>

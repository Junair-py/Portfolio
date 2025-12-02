// small helpers
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.card-cta').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    // placeholder behaviour: open modal or new page later
    const title = e.target.closest('.card').querySelector('h3').textContent;
    alert(`Abrir projeto: ${title}\n(Adicione páginas individuais ou modal quando quiser)`);
  });
});

// keyboard focus improvement: allow skip to content via header brand click
document.querySelector('.brand').addEventListener('click', (e)=>{
  const home = document.getElementById('home');
  if(home){ home.focus(); }
});



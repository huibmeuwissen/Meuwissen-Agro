/* Meuwissen Agro – winkellogica (geen build-stap nodig, werkt ook vanaf schijf). */
(function () {
  'use strict';

  // ---- instellingen ---------------------------------------------------------
  var ORDER_EMAIL = 'info@meuwissenagro.nl';
  var PAGE_SIZE = 24;

  var CATS = [
    { id: 'gereedschap', name: 'Tuingereedschap', blurb: 'Spades, harken, bezems en handgereedschap', tint: '#e4eedb',
      icon: 'M12 3v10M9 3h6M8 13h8l-1 5a3 3 0 0 1-6 0z' },
    { id: 'snoeien', name: 'Snoeien', blurb: 'Snoeischaren, zagen en takkenscharen', tint: '#f6e3d6',
      icon: 'M6 8.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5zM6 20.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5zM8 7.500 20 18M8 16.500 20 6' },
    { id: 'bewatering', name: 'Bewatering', blurb: 'Gieters, slangen, sproeiers en drukspuiten', tint: '#dcecf3',
      icon: 'M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z' },
    { id: 'regentonnen', name: 'Regentonnen & compost', blurb: 'Regenwater opvangen en composteren', tint: '#dfe9e6',
      icon: 'M7 4h10M7 20h10M7 4c-2 5-2 11 0 16M17 4c2 5 2 11 0 16M5.600 10h12.800M5.600 14h12.800' },
    { id: 'potten', name: 'Potten & kuipen', blurb: 'Bloempotten, plantenbakken en kuipen', tint: '#f3e6d3',
      icon: 'M5 6h14v3H5zM6.500 9 8 20h8l1.500-11' },
    { id: 'kweken', name: 'Kweken & binden', blurb: 'Zaaien, opbinden en plantsteunen', tint: '#e6f0cf',
      icon: 'M12 20v-8M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2.500-5 6-5 0 3-2.500 5-6 5z' },
    { id: 'dieren', name: 'Vogels & tuindieren', blurb: 'Vogelhuisjes, voederplekken en meer', tint: '#f5ead0',
      icon: 'M15.500 8h.010M4 20c0-7 3.500-13 10-13a4 4 0 0 1 4 4c0 5-4 9-10 9zM18 9.500l3-1-3.400-1.300' },
    { id: 'handschoenen', name: 'Handschoenen & schoeisel', blurb: 'Bescherming voor handen, knieën en voeten', tint: '#ece4ef',
      icon: 'M8 13V6a1.500 1.500 0 0 1 3 0v5M11 11V4.500a1.500 1.500 0 0 1 3 0V11M14 11V6a1.500 1.500 0 0 1 3 0v8a6 6 0 0 1-6 6h-.500A5.500 5.500 0 0 1 5 14.500V13a1.500 1.500 0 0 1 3 0' },
    { id: 'kruiwagens', name: 'Kruiwagens & kinderen', blurb: 'Kruiwagens voor groot en klein', tint: '#fbe3dc',
      icon: 'M2 6h3l3 9h9l4-8H7.500M17 15l1 4M7 20.500a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
    { id: 'ongedierte', name: 'Ongedierte & onkruid', blurb: 'Diervriendelijk en doeltreffend', tint: '#e9e6dc',
      icon: 'M12 8a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0v-3a4 4 0 0 1 4-4zM9 5l1.500 3M15 5l-1.500 3M4 10l4 2M20 10l-4 2M4 19l4-2.500M20 19l-4-2.500M3 14.500h5M16 14.500h5' },
    { id: 'doek', name: 'Doek, folie & gaas', blurb: 'Gronddoek, vijverfolie, gaas en netten', tint: '#dde6ea',
      icon: 'M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5' },
    { id: 'winter', name: 'Winter & bescherming', blurb: 'Bescherm je planten tegen vorst', tint: '#deeaf6',
      icon: 'M12 2v20M3.300 7l17.400 10M3.300 17 20.700 7M9 4l3 3 3-3M9 20l3-3 3 3' },
    { id: 'onderhoud', name: 'Verf, lijm & onderhoud', blurb: 'Verf, kit, lijm en reiniging', tint: '#f1e2e2',
      icon: 'M7 3h10v7H7zM9 10v3h6v-3M11 13h2v8h-2z' },
    { id: 'sfeer', name: 'Sfeer & weer', blurb: 'Decoratie, verlichting en weerstations', tint: '#fbf0c9',
      icon: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2.500M12 19.500V22M2 12h2.500M19.500 12H22M5 5l1.800 1.800M17.200 17.200 19 19M5 19l1.800-1.800M17.200 6.800 19 5' },
    { id: 'overig', name: 'Overig', blurb: 'Alles wat nergens anders past', tint: '#ecebe4',
      icon: 'M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8' }
  ];
  var CAT = {};
  CATS.forEach(function (c) { CAT[c.id] = c; });

  var UNITS = { stuk: 'per stuk', rol: 'per rol', set: 'per set', koker: 'per koker', paar: 'per paar', bus: 'per bus', fles: 'per fles',
    zakje: 'per zakje', emmer: 'per emmer', bndl: 'per bundel', zak: 'per zak', baal: 'per baal', doos: 'per doos', kaart: 'per kaart',
    stok: 'per stok', pak: 'per pak', pallet: 'per pallet', pot: 'per pot', vpe: 'per verpakking', bol: 'per bol' };

  var PRODUCTS = window.MA_PRODUCTS || [];
  var IMAGES = window.MA_IMAGES || {};
  var BY_ID = {};
  PRODUCTS.forEach(function (p) {
    BY_ID[p.id] = p;
    p._s = (p.n + ' ' + p.b + ' ' + p.g + ' ' + p.id + ' ' + p.e).toLowerCase();
  });

  // Kerstaankleding: alleen aan op index_Kerst.html (die zet window.MA_XMAS). index.html blijft de gewone site.
  var XMAS = !!window.MA_XMAS;
  // Cadeaupakketten: samengesteld uit bestaande artikelen. De pakketprijs is de som van de losse prijzen.
  var GIFTS = [
    { id: 'vogelvriend', name: 'Vogelvriend', text: 'Voor wie graag vogels in de tuin ziet: voederhuisjes, een silo en een vetbolhouder.',
      items: ['1530706', '1551625', '1550807', '1550502'] },
    { id: 'snoeier', name: 'De snoeier', text: 'De klassieke Felco 2 met leren holster en onderhoudsspray. Gaat een leven lang mee.',
      items: ['3310002', '3312910', '3312980'] },
    { id: 'moestuin', name: 'Moestuinstarter', text: 'Alles om te zaaien en te verspenen: zaaibak, labels, verspeenlatje, pootstokje en bindtouw.',
      items: ['3200192', '3220632', '6631457', '6631111', '3966005'] },
    { id: 'tuinliefhebber', name: 'Tuinliefhebber', text: 'Stijlvol handgereedschap van Sophie Conran: handschepje, pootstok en snoeischaar.',
      items: ['6630784', '6630788', '3380790'] },
    { id: 'kleinetuinier', name: 'Kleine tuinier', text: 'Voor kinderen die mee willen helpen: een eigen kruiwagen, gieter en handvorkje.',
      items: ['4620002', '4750376', '6630585'] },
    { id: 'weer', name: 'Weer & winter', text: 'Voor de weerliefhebber: thermometer, regenmeter en een vlieshoes om planten te beschermen.',
      items: ['5814660', '5820471', '7252742'] }
  ].map(function (g) {
    g.items = g.items.map(function (id) { return BY_ID[id]; }).filter(Boolean);
    g.total = g.items.reduce(function (t, p) { return t + p.p; }, 0);
    return g;
  }).filter(function (g) { return g.items.length >= 2; });
  var GIFT = {};
  GIFTS.forEach(function (g) { GIFT[g.id] = g; });
  if (XMAS) document.body.classList.add('xmas');

  var main = document.getElementById('main');
  var euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });

  // ---- hulpfuncties ---------------------------------------------------------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(d, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 24) + '" height="' + (size || 24) + '" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  var CART_ICON = 'M3 4h2.5l2.3 11h10.400L20.500 7H7M9.500 19.500h.010M17 19.500h.010';
  function price(p) { return p.p > 0 ? euro.format(p.p) : 'Prijs op aanvraag'; }
  function priceTag(p, extra) {
    return '<span class="price' + (p.p > 0 ? '' : ' ask') + '">' + price(p) + (extra || '') + '</span>';
  }
  function avail(p) {
    return '<p class="avail' + (p.s ? '' : ' out') + '">' + (p.s ? 'Op voorraad' : 'Op bestelling') + '</p>';
  }
  function photo(p) { return IMAGES[p.id] ? 'img/products/' + esc(IMAGES[p.id]) : ''; }
  function media(p, eager) {
    var c = CAT[p.c] || CAT.overig;
    var src = photo(p);
    return src
      ? '<div class="media"><img src="' + src + '" alt=""' + (eager ? '' : ' loading="lazy"') + '></div>'
      : '<div class="media noimg" style="--tint:' + c.tint + '">' + icon(c.icon) + '</div>';
  }
  function card(p) {
    return '<li><article class="card">' + media(p) +
      '<div class="card-body"><p class="card-brand">' + esc(p.b || p.g) + '</p>' +
      '<h3><a href="#/p/' + esc(p.id) + '">' + esc(p.n) + '</a></h3>' + avail(p) +
      '<div class="card-foot">' + priceTag(p) +
      '<button class="add" type="button" data-add="' + esc(p.id) + '" aria-label="' + esc(p.n) + ' toevoegen aan winkelwagen">' +
      icon(CART_ICON, 22) + '</button></div></div></article></li>';
  }
  function crumbs(items) {
    return '<nav class="crumbs wrap" aria-label="Kruimelpad"><ol><li><a href="#/">Home</a></li>' +
      items.map(function (i) { return '<li>' + (i[1] ? '<a href="' + i[1] + '">' + esc(i[0]) + '</a>' : '<span aria-current="page">' + esc(i[0]) + '</span>') + '</li>'; }).join('') +
      '</ol></nav>';
  }
  function byRank(a, b) { return a.r - b.r; }
  function pickVaried(list, n) {
    var seen = {}, out = [];
    list.slice().sort(byRank).some(function (p) {
      if (!seen[p.g]) { seen[p.g] = 1; out.push(p); }
      return out.length >= n;
    });
    return out;
  }

  // ---- winkelwagen ----------------------------------------------------------
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('ma-cart') || '{}') || {}; } catch (e) { cart = {}; }
  Object.keys(cart).forEach(function (id) { if (!BY_ID[id]) delete cart[id]; });

  function saveCart() {
    try { localStorage.setItem('ma-cart', JSON.stringify(cart)); } catch (e) { /* privévenster: alleen in geheugen */ }
    var n = Object.keys(cart).reduce(function (t, id) { return t + cart[id]; }, 0);
    var badge = document.getElementById('cartCount');
    badge.textContent = n;
    badge.hidden = n === 0;
    document.querySelector('.cartlink').setAttribute('aria-label', 'Winkelwagen, ' + n + (n === 1 ? ' artikel' : ' artikelen'));
  }
  function setQty(id, q) {
    q = Math.max(0, Math.min(999, Math.round(q) || 0));
    if (q === 0) delete cart[id]; else cart[id] = q;
    saveCart();
  }
  var toastTimer;
  function toast(html) {
    var t = document.getElementById('toast');
    t.innerHTML = html;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3500);
  }
  function cartTotal() {
    return Object.keys(cart).reduce(function (t, id) { return t + BY_ID[id].p * cart[id]; }, 0);
  }

  // ---- pagina's -------------------------------------------------------------
  function giftCard(g) {
    return '<li><article class="gift"><div class="gift-pics n' + Math.min(g.items.length, 4) + '">' +
      g.items.slice(0, 4).map(function (p) {
        return photo(p) ? '<img src="' + photo(p) + '" alt="" loading="lazy">' : '<span>' + icon((CAT[p.c] || CAT.overig).icon, 40) + '</span>';
      }).join('') + '</div>' +
      '<div class="gift-body"><h3>' + esc(g.name) + '</h3><p>' + esc(g.text) + '</p>' +
      '<ul class="gift-items">' + g.items.map(function (p) {
        return '<li><a href="#/p/' + esc(p.id) + '">' + esc(p.n) + '</a><span>' + price(p) + '</span></li>';
      }).join('') + '</ul>' +
      '<div class="gift-foot"><span class="gift-price">' + euro.format(g.total) + '<small>' + g.items.length + ' artikelen, incl. btw</small></span>' +
      '<button type="button" class="btn" data-gift="' + g.id + '">' + icon(CART_ICON, 22) + 'Pakket in winkelwagen</button></div>' +
      '</div></article></li>';
  }
  function viewGifts() {
    return crumbs([['Cadeaupakketten']]) +
      '<div class="wrap"><div class="page-head"><h1>Cadeaupakketten</h1>' +
      '<p>Een cadeau voor iemand met groene vingers? Wij stelden zes pakketten samen uit ons assortiment. Je kunt een pakket in één keer in je winkelwagen leggen en daarna nog aanpassen.</p></div>' +
      '<ul class="gifts">' + GIFTS.map(giftCard).join('') + '</ul>' +
      '<div class="about gift-note"><h2>Liever zelf samenstellen?</h2>' +
      '<p>Leg losse artikelen in je winkelwagen en zet bij de opmerking dat het om een cadeau gaat. Wil je weten of je bestelling op tijd voor de feestdagen binnen kan zijn? Bel ons op <a href="tel:+31297272611">(0297) 27 26 11</a>.</p>' +
      '<a class="more-link" href="#/assortiment">Naar het assortiment</a></div></div>';
  }

  function viewHome() {
    var withPhoto = PRODUCTS.filter(function (p) { return p.s && p.p >= 5 && IMAGES[p.id]; });
    var popular = pickVaried(withPhoto, 10);
    var heroPicks = ['Haws', 'Felco', 'Sneeboer'].map(function (b) {
      return withPhoto.filter(function (p) { return p.b === b && p.p >= 20; }).sort(byRank)[0];
    }).filter(Boolean);
    var season = pickVaried(withPhoto.filter(function (p) { return (p.c === 'winter' || p.c === 'dieren') && popular.indexOf(p) === -1; }), 5);
    var winterPick = pickVaried(withPhoto.filter(function (p) { return p.c === 'winter'; }), 1)[0];
    var birdPick = pickVaried(withPhoto.filter(function (p) { return p.c === 'dieren' && /huis|nestkast/i.test(p.n); }), 1)[0];
    var brandCount = {};
    PRODUCTS.forEach(function (p) { if (p.b) brandCount[p.b] = (brandCount[p.b] || 0) + 1; });
    var topBrands = Object.keys(brandCount).sort(function (a, b) { return brandCount[b] - brandCount[a]; }).slice(0, 12);
    var total = (Math.floor(PRODUCTS.length / 100) * 100).toLocaleString('nl-NL');

    function banner(n, href, alt) {
      return '<a class="banner" href="' + href + '"><img src="img/banners/banner-' + n + '.jpg" alt="' + esc(alt) + '" width="672" height="275"></a>';
    }
    function promo(href, tint, title, text, p) {
      return '<a class="promo" href="' + href + '" style="--promo:' + tint + '"><div><strong>' + title + '</strong><span>' + text + '</span><em>Bekijk</em></div>' +
        (p ? '<img src="' + photo(p) + '" alt="" loading="lazy">' : '') + '</a>';
    }

    var tips = pickVaried(withPhoto.filter(function (p) {
      return p.p >= 10 && p.p <= 50 && /^(gereedschap|snoeien|dieren|sfeer|bewatering)$/.test(p.c) && popular.indexOf(p) === -1;
    }), 5);
    if (XMAS) {
      heroPicks = GIFTS.slice(0, 3).map(function (g) { return g.items.filter(photo)[0]; }).filter(Boolean);
    }
    var heroText = XMAS
      ? '<span class="kicker">Fijne feestdagen</span><h1>Geef een stukje tuin cadeau</h1>' +
        '<p>Kant-en-klare cadeaupakketten voor vogelvrienden, snoeiers en kleine tuiniers, of stel zelf iets samen uit ruim ' + total + ' tuinartikelen.</p>' +
        '<div class="hero-cta"><a class="btn" href="#/cadeaupakketten">Bekijk de cadeaupakketten</a><a class="btn btn-ghost" href="#/c/dieren">Vogels in de winter</a></div>'
      : '<span class="kicker">Tuinspecialist sinds 1987</span><h1>Alles voor je tuin, snel gevonden</h1>' +
        '<p>Ruim ' + total + ' tuinartikelen uit eigen magazijn: van snoeischaar tot regenton, onder eigen label en van bekende A-merken.</p>' +
        '<div class="hero-cta"><a class="btn" href="#/assortiment">Bekijk het assortiment</a><a class="btn btn-ghost" href="#/c/snoeien">Snoeigereedschap</a></div>';
    var xmasSections = XMAS
      ? '<section class="section" aria-labelledby="h-gifts"><div class="section-head"><h2 id="h-gifts">Cadeaupakketten</h2><a class="more-link" href="#/cadeaupakketten">Alle ' + GIFTS.length + ' pakketten</a></div>' +
        '<ul class="gifts">' + GIFTS.slice(0, 3).map(giftCard).join('') + '</ul></section>' +
        (tips.length ? '<section class="section" aria-labelledby="h-tips"><div class="section-head"><h2 id="h-tips">Cadeautips tot € 50</h2><a class="more-link" href="#/assortiment">Meer ideeën</a></div>' +
          '<ul class="grid five">' + tips.map(card).join('') + '</ul></section>' : '')
      : '';

    return '<div class="wrap">' +
      '<section class="hero" aria-label="Uitgelicht">' +
      '<div class="hero-main"><div>' + heroText + '</div>' +
      '<div class="collage">' + heroPicks.map(function (p) {
        return '<a href="#/p/' + esc(p.id) + '" aria-label="' + esc(p.n) + '"><img src="' + photo(p) + '" alt=""></a>';
      }).join('') + '</div></div>' +
      '<div class="hero-side">' +
      banner(4, '#/zoeken?q=voeder', 'Vogelvoederhouders, bekijk hier') +
      banner(5, '#/zoeken?q=nestkast', 'Nestkasten, bekijk hier') +
      '</div></section>' + xmasSections +

      '<section class="section" aria-labelledby="h-feat"><div class="section-head"><h2 id="h-feat">Uitgelicht</h2></div><div class="banners">' +
      banner(1, '#/assortiment?merk=Felco', 'Snoeigereedschap van Felco, bekijk hier') +
      banner(3, '#/c/regentonnen', 'Opruimen en composteren, bekijk hier') +
      banner(2, '#/zoeken?q=vogelbad', 'Vogelbadjes en drinkschalen, bekijk hier') +
      '</div></section>' +

      '<section class="section" aria-label="Seizoen"><div class="banners two">' +
      promo('#/c/winter', '#e1edf7', 'Klaar voor de winter', 'Bescherm planten en paden tegen vorst', winterPick) +
      promo('#/c/dieren', '#fbf0d2', 'Vogels in je tuin', 'Voederplekken, nestkasten en vogelbadjes', birdPick) +
      '</div></section>' +

      '<section class="section" aria-labelledby="h-cats"><div class="section-head"><h2 id="h-cats">Shop per categorie</h2><a class="more-link" href="#/assortiment">Hele assortiment</a></div>' + catTiles() + '</section>' +

      '<section class="section" aria-labelledby="h-pop"><div class="section-head"><h2 id="h-pop">Nu populair</h2><a class="more-link" href="#/assortiment">Alles bekijken</a></div>' +
      '<ul class="grid five">' + popular.map(card).join('') + '</ul></section>' +

      '<section class="section" aria-labelledby="h-brands"><div class="section-head"><h2 id="h-brands">Topmerken</h2></div><ul class="brands">' +
      topBrands.map(function (b) { return '<li><a href="#/assortiment?merk=' + encodeURIComponent(b) + '">' + esc(b) + '</a></li>'; }).join('') + '</ul></section>' +

      (season.length ? '<section class="section" aria-labelledby="h-season"><div class="section-head"><h2 id="h-season">Voor het seizoen</h2><a class="more-link" href="#/c/winter">Winterartikelen</a></div>' +
        '<ul class="grid five">' + season.map(card).join('') + '</ul></section>' : '') +

      '<section class="section" aria-labelledby="h-why"><div class="section-head"><h2 id="h-why">Waarom Meuwissen Agro</h2></div><div class="why">' +
      '<div>' + icon('M12 20v-8M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2.500-5 6-5 0 3-2.500 5-6 5z', 34) + '<h3>Al sinds 1987</h3><p>Bijna 40 jaar ervaring met tuinartikelen, vanuit ons eigen magazijn in Wilnis.</p></div>' +
      '<div>' + icon('M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8', 34) + '<h3>Breed assortiment</h3><p>Ruim ' + total + ' artikelen: eigen label naast A-merken als Felco, Sneeboer en Burgon &amp; Ball.</p></div>' +
      '<div>' + icon('M4 5h16v11H9l-5 4z', 34) + '<h3>Persoonlijk advies</h3><p>Twijfel je over een product? Bel of mail ons, we denken graag met je mee.</p></div>' +
      '</div></section>' +

      '<section class="section"><div class="about"><h2>Welkom bij Meuwissen Agro</h2>' +
      '<p>Bij Meuwissen Agro vind je alles voor in en om de tuin. Van gieters, regentonnen en bloempotten tot professioneel snoeigereedschap, handschoenen, gronddoek en vogelhuisjes. We houden ons assortiment continu actueel, zodat je altijd iets vindt dat past bij jouw tuin.</p>' +
      '<a class="more-link" href="#/over">Meer over ons</a></div></section>' +
      '</div>';
  }
  function catTiles() {
    var counts = {}, pic = {};
    PRODUCTS.slice().sort(byRank).forEach(function (p) {
      counts[p.c] = (counts[p.c] || 0) + 1;
      if (!pic[p.c] && IMAGES[p.id] && p.p >= 8) pic[p.c] = p;
    });
    return '<ul class="cats">' + CATS.filter(function (c) { return counts[c.id]; }).map(function (c) {
      return '<li><a class="cat" href="#/c/' + c.id + '"><span class="cat-img">' +
        (pic[c.id] ? '<img src="' + photo(pic[c.id]) + '" alt="" loading="lazy">' : icon(c.icon, 48)) + '</span>' +
        '<span class="cat-name">' + esc(c.name) + '<small>' + counts[c.id] + ' artikelen</small></span></a></li>';
    }).join('') + '</ul>';
  }
  // Lijstpagina: categorie, zoeken of het hele assortiment.
  var listing = null;
  function viewList(opts, params) {
    var base = opts.items;
    var facetKey = opts.facet; // 'g' (subgroep) of 'c' (categorie)
    var facetVals = {};
    base.forEach(function (p) { facetVals[p[facetKey]] = (facetVals[p[facetKey]] || 0) + 1; });
    var facetList = Object.keys(facetVals).sort(function (a, b) {
      return facetKey === 'c' ? facetVals[b] - facetVals[a] : a.localeCompare(b, 'nl');
    });
    var brandVals = {};
    base.forEach(function (p) { if (p.b) brandVals[p.b] = 1; });
    var brandList = Object.keys(brandVals).sort(function (a, b) { return a.localeCompare(b, 'nl'); });

    listing = {
      base: base, facetKey: facetKey, path: opts.path, q: opts.q || '',
      facet: facetVals[params.get('groep')] ? params.get('groep') : '',
      brand: brandVals[params.get('merk')] ? params.get('merk') : '',
      stock: params.get('voorraad') === '1',
      sort: params.get('sort') || 'pop',
      shown: PAGE_SIZE
    };
    var L = listing;
    var label = function (v) { return facetKey === 'c' ? CAT[v].name : v; };

    return crumbs(opts.crumbs) +
      '<div class="wrap"><div class="page-head"><h1>' + esc(opts.title) + '</h1>' + (opts.intro ? '<p>' + esc(opts.intro) + '</p>' : '') + '</div>' +
      '<div class="layout"><aside class="filters" aria-label="Filters"><details' + (window.innerWidth > 1000 ? ' open' : '') + '><summary>Filters</summary>' +
      (facetList.length > 1 ? '<div class="fgroup"><h2>' + (facetKey === 'c' ? 'Categorie' : 'Soort') + '</h2><ul class="facets">' +
        '<li><button type="button" class="facet" data-facet="" aria-pressed="' + (!L.facet) + '"><span>Alles</span><small>' + base.length + '</small></button></li>' +
        facetList.map(function (v) {
          return '<li><button type="button" class="facet" data-facet="' + esc(v) + '" aria-pressed="' + (L.facet === v) + '"><span>' + esc(label(v)) + '</span><small>' + facetVals[v] + '</small></button></li>';
        }).join('') + '</ul></div>' : '') +
      (brandList.length > 1 ? '<div class="fgroup"><h2><label for="fBrand">Merk</label></h2><select id="fBrand"><option value="">Alle merken</option>' +
        brandList.map(function (b) { return '<option' + (L.brand === b ? ' selected' : '') + '>' + esc(b) + '</option>'; }).join('') + '</select></div>' : '') +
      '<div class="fgroup"><h2>Beschikbaarheid</h2><label class="check"><input type="checkbox" id="fStock"' + (L.stock ? ' checked' : '') + '> Alleen op voorraad</label></div>' +
      '</details></aside>' +
      '<div><div class="toolbar"><span class="count" id="listCount" role="status"></span>' +
      '<label>Sorteer op <select id="fSort">' +
      [['pop', 'Populariteit'], ['asc', 'Prijs laag – hoog'], ['desc', 'Prijs hoog – laag'], ['az', 'Naam A – Z']].map(function (o) {
        return '<option value="' + o[0] + '"' + (L.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
      }).join('') + '</select></label></div>' +
      '<div id="listOut"></div></div></div></div>';
  }
  function renderList() {
    var L = listing;
    if (!L) return;
    var items = L.base.filter(function (p) {
      return (!L.facet || p[L.facetKey] === L.facet) && (!L.brand || p.b === L.brand) && (!L.stock || p.s);
    });
    var sorters = {
      pop: byRank,
      asc: function (a, b) { return (a.p || 1e9) - (b.p || 1e9); },
      desc: function (a, b) { return b.p - a.p; },
      az: function (a, b) { return a.n.localeCompare(b.n, 'nl'); }
    };
    items.sort(sorters[L.sort] || byRank);
    document.getElementById('listCount').textContent = items.length + (items.length === 1 ? ' artikel' : ' artikelen');
    var out = document.getElementById('listOut');
    if (!items.length) {
      out.innerHTML = '<div class="empty"><h2>Niets gevonden</h2><p>Probeer een ander zoekwoord of haal een filter weg.</p><a class="btn" href="#/assortiment">Bekijk het hele assortiment</a></div>';
    } else {
      var shown = items.slice(0, L.shown);
      out.innerHTML = '<ul class="grid">' + shown.map(card).join('') + '</ul>' +
        (items.length > shown.length
          ? '<div class="more"><span>' + shown.length + ' van ' + items.length + ' getoond</span><button type="button" class="btn btn-ghost" id="moreBtn">Toon meer</button></div>'
          : '');
    }
    // Adres bijwerken zodat filters deelbaar zijn en "terug" werkt.
    var qs = new URLSearchParams();
    if (L.q) qs.set('q', L.q);
    if (L.facet) qs.set('groep', L.facet);
    if (L.brand) qs.set('merk', L.brand);
    if (L.stock) qs.set('voorraad', '1');
    if (L.sort !== 'pop') qs.set('sort', L.sort);
    var s = qs.toString();
    try { history.replaceState(null, '', '#/' + L.path + (s ? '?' + s : '')); } catch (e) { /* niet kritisch */ }
  }

  function search(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PRODUCTS.filter(function (p) {
      return words.every(function (w) { return p._s.indexOf(w) !== -1; });
    });
  }

  function viewProduct(p) {
    var c = CAT[p.c] || CAT.overig;
    var related = PRODUCTS.filter(function (x) { return x.g === p.g && x.id !== p.id; }).sort(byRank).slice(0, 4);
    return crumbs([[c.name, '#/c/' + c.id], [p.n]]) +
      '<div class="wrap"><div class="product">' + media(p, true) +
      '<div class="buybox"><p class="card-brand">' + esc(p.b || p.g) + '</p><h1>' + esc(p.n) + '</h1>' +
      priceTag(p, p.p > 0 ? '<small>' + esc(UNITS[p.u] || '') + ', incl. btw</small>' : '') +
      '<p class="avail' + (p.s ? '' : ' out') + '">' + (p.s ? 'Op voorraad' : 'Op bestelling – levertijd op aanvraag') + '</p>' +
      '<div class="buy">' + qtyBox('pqty', 1, p.n) +
      '<button type="button" class="btn" id="pAdd" data-id="' + esc(p.id) + '">' + icon(CART_ICON, 22) + 'In winkelwagen</button></div>' +
      '<ul class="ticks"><li>Je bestelling gaat als aanvraag naar ons team</li><li>We nemen contact op over levering en betaling</li><li>Vragen? Bel (0297) 27 26 11</li></ul>' +
      '<h2>Productgegevens</h2><table class="specs"><caption class="sr">Productgegevens</caption><tbody>' +
      '<tr><th scope="row">Artikelnummer</th><td>' + esc(p.id) + '</td></tr>' +
      (p.b ? '<tr><th scope="row">Merk</th><td>' + esc(p.b) + '</td></tr>' : '') +
      '<tr><th scope="row">Soort</th><td><a href="#/c/' + c.id + '?groep=' + encodeURIComponent(p.g) + '">' + esc(p.g) + '</a></td></tr>' +
      '<tr><th scope="row">Verkoopeenheid</th><td>' + esc(p.u) + '</td></tr>' +
      (p.e ? '<tr><th scope="row">EAN</th><td>' + esc(p.e) + '</td></tr>' : '') +
      '</tbody></table></div></div>' +
      (related.length ? '<section class="section" aria-labelledby="h-rel"><div class="section-head"><h2 id="h-rel">Past hier goed bij</h2></div><ul class="grid">' + related.map(card).join('') + '</ul></section>' : '') +
      '</div>';
  }
  function qtyBox(id, val, name) {
    return '<span class="qty"><button type="button" data-step="-1" aria-label="Eén minder">−</button>' +
      '<input id="' + id + '" type="number" inputmode="numeric" min="1" max="999" value="' + val + '" aria-label="Aantal ' + esc(name) + '">' +
      '<button type="button" data-step="1" aria-label="Eén meer">+</button></span>';
  }

  function viewCart() {
    var ids = Object.keys(cart);
    var head = crumbs([['Winkelwagen']]) + '<div class="wrap"><div class="page-head"><h1>Winkelwagen</h1></div>';
    if (!ids.length) {
      return head + '<div class="empty"><h2>Je winkelwagen is nog leeg</h2><p>Kijk rond in het assortiment en voeg toe wat je nodig hebt.</p><a class="btn" href="#/assortiment">Verder winkelen</a></div></div>';
    }
    return head + '<div class="cart"><ul class="lines">' + ids.map(function (id) {
      var p = BY_ID[id];
      return '<li class="line" data-line="' + esc(id) + '">' + media(p) +
        '<div><a class="line-name" href="#/p/' + esc(id) + '">' + esc(p.n) + '</a>' +
        '<span class="line-meta">Art. ' + esc(id) + ' · ' + price(p) + ' ' + esc(UNITS[p.u] || '') + '</span>' +
        '<div class="line-ctrl">' + qtyBox('q-' + id, cart[id], p.n) +
        '<button type="button" class="linkbtn" data-remove="' + esc(id) + '">Verwijder<span class="sr"> ' + esc(p.n) + '</span></button></div></div>' +
        '<span class="line-total">' + (p.p > 0 ? euro.format(p.p * cart[id]) : 'op aanvraag') + '</span></li>';
    }).join('') + '</ul>' +
      '<form class="panel" id="orderForm"><div class="total"><span>Totaal incl. btw</span><span class="price">' + euro.format(cartTotal()) + '</span></div>' +
      '<h2>Bestelaanvraag</h2><p class="fine">Vul je gegevens in. Er opent een e-mail met je bestelling die je alleen nog hoeft te versturen. Verzendkosten en betaling stemmen we daarna met je af.</p>' +
      '<label class="field"><span>Naam</span><input name="naam" autocomplete="name" required></label>' +
      '<div class="row2"><label class="field"><span>E-mailadres</span><input name="email" type="email" autocomplete="email" required></label>' +
      '<label class="field"><span>Telefoon</span><input name="tel" type="tel" autocomplete="tel"></label></div>' +
      '<label class="field"><span>Straat en huisnummer</span><input name="adres" autocomplete="street-address" required></label>' +
      '<div class="row2"><label class="field"><span>Postcode</span><input name="postcode" autocomplete="postal-code" required></label>' +
      '<label class="field"><span>Plaats</span><input name="plaats" autocomplete="address-level2" required></label></div>' +
      '<label class="field"><span>Opmerking (optioneel)</span><textarea name="opmerking"></textarea></label>' +
      '<button class="btn btn-block" type="submit">Bestelaanvraag versturen</button>' +
      '<p class="fine" style="margin:12px 0 0;text-align:center"><button type="button" class="linkbtn" id="copyOrder">Of kopieer de bestelling</button></p>' +
      '</form></div></div>';
  }
  function orderText(f) {
    var lines = Object.keys(cart).map(function (id) {
      var p = BY_ID[id];
      return cart[id] + ' x ' + p.n + ' (art. ' + id + ') – ' + (p.p > 0 ? euro.format(p.p * cart[id]) : 'prijs op aanvraag');
    });
    var who = f ? ['', 'Naam: ' + f.naam.value, 'E-mail: ' + f.email.value, 'Telefoon: ' + f.tel.value,
      'Adres: ' + f.adres.value + ', ' + f.postcode.value + ' ' + f.plaats.value,
      f.opmerking.value ? 'Opmerking: ' + f.opmerking.value : ''].filter(function (x, i) { return i === 0 || x; }) : [];
    return ['Bestelaanvraag via de website', ''].concat(lines, ['', 'Totaal incl. btw: ' + euro.format(cartTotal())], who).join('\n');
  }

  function viewAbout() {
    return crumbs([['Over ons']]) + '<div class="wrap prose"><div class="page-head"><h1>Over Meuwissen Agro</h1></div>' +
      '<p>Meuwissen Agro is al sinds 1987 thuis in tuinartikelen. Begonnen in Mijdrecht, en sinds 2000 gevestigd aan de Burgemeester Padmosweg in Wilnis. Vanuit ons eigen magazijn leveren we een breed assortiment: van folie en snoeigereedschap tot handschoenen, vijverartikelen en regentonnen.</p>' +
      '<p>Je vindt bij ons artikelen onder ons eigen Meuwissen Agro-label én een ruime keuze aan bekende A-merken. We houden het assortiment continu actueel, zodat je altijd iets vindt dat past bij jouw tuin.</p>' +
      '<p><a class="btn" href="#/assortiment">Bekijk het assortiment</a></p></div>';
  }
  function viewContact() {
    return crumbs([['Contact']]) + '<div class="wrap"><div class="page-head"><h1>Contact</h1><p>Vraag over een product of je bestelling? We helpen je graag.</p></div>' +
      '<div class="contact-grid">' +
      '<div class="panel"><h2>Bellen</h2><p><a href="tel:+31297272611">(0297) 27 26 11</a></p><p class="fine">ma t/m do 8:30 – 17:00 uur<br>vr 8:30 – 15:00 uur</p></div>' +
      '<div class="panel"><h2>Mailen</h2><p><a href="mailto:' + ORDER_EMAIL + '">' + ORDER_EMAIL + '</a></p><p class="fine">We reageren zo snel mogelijk.</p></div>' +
      '<div class="panel"><h2>Adres</h2><p>Meuwissen Agro BV<br>Burgemeester Padmosweg 161<br>3648 BD Wilnis</p></div>' +
      '</div></div>';
  }
  function viewNotFound() {
    return '<div class="wrap section"><div class="empty"><h1>Pagina niet gevonden</h1><p>Deze pagina bestaat niet (meer).</p><a class="btn" href="#/">Naar de homepage</a></div></div>';
  }

  // ---- router ---------------------------------------------------------------
  function route() {
    var hash = location.hash.replace(/^#\/?/, '');
    var parts = hash.split('?');
    var path = decodeURIComponent(parts[0]).replace(/\/$/, '');
    var params = new URLSearchParams(parts[1] || '');
    var seg = path.split('/');
    var html, title = 'Meuwissen Agro – alles voor je tuin', current = '';
    listing = null;

    if (!path) {
      html = viewHome();
    } else if (seg[0] === 'c' && CAT[seg[1]]) {
      var c = CAT[seg[1]];
      current = c.id;
      title = c.name;
      html = viewList({ items: PRODUCTS.filter(function (p) { return p.c === c.id; }), facet: 'g', path: 'c/' + c.id,
        title: c.name, intro: c.blurb, crumbs: [[c.name]] }, params);
    } else if (path === 'assortiment') {
      title = 'Assortiment';
      html = viewList({ items: PRODUCTS.slice(), facet: 'c', path: 'assortiment', title: 'Het hele assortiment',
        intro: 'Alles op een rij. Verfijn op categorie, merk of voorraad.', crumbs: [['Assortiment']] }, params);
    } else if (path === 'zoeken') {
      var q = (params.get('q') || '').trim();
      title = 'Zoeken: ' + q;
      document.getElementById('q').value = q;
      html = viewList({ items: search(q), facet: 'c', path: 'zoeken', q: q,
        title: q ? 'Resultaten voor “' + q + '”' : 'Zoeken', crumbs: [['Zoeken']] }, params);
    } else if (seg[0] === 'p' && BY_ID[seg[1]]) {
      title = BY_ID[seg[1]].n;
      current = BY_ID[seg[1]].c;
      html = viewProduct(BY_ID[seg[1]]);
    } else if (path === 'winkelwagen') {
      title = 'Winkelwagen';
      html = viewCart();
    } else if (path === 'cadeaupakketten' && XMAS) {
      title = 'Cadeaupakketten';
      current = 'cadeau';
      html = viewGifts();
    } else if (path === 'over') {
      title = 'Over ons';
      html = viewAbout();
    } else if (path === 'contact') {
      title = 'Contact';
      html = viewContact();
    } else {
      title = 'Niet gevonden';
      html = viewNotFound();
    }

    main.innerHTML = html;
    if (listing) renderList();
    document.title = title === 'Meuwissen Agro – alles voor je tuin' ? title : title + ' – Meuwissen Agro';
    Array.prototype.forEach.call(document.querySelectorAll('#catnav a'), function (a) {
      if (a.getAttribute('data-cat') === current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('hashchange', function () {
    route();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  });

  // ---- gebeurtenissen -------------------------------------------------------
  document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var q = document.getElementById('q').value.trim();
    if (q) location.hash = '#/zoeken?q=' + encodeURIComponent(q);
  });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;
    var id;
    if ((id = t.getAttribute('data-add'))) {
      setQty(id, (cart[id] || 0) + 1);
      toast('<span>' + esc(BY_ID[id].n) + ' toegevoegd</span><a href="#/winkelwagen">Bekijk winkelwagen</a>');
    } else if ((id = t.getAttribute('data-gift')) && GIFT[id]) {
      GIFT[id].items.forEach(function (p) { setQty(p.id, (cart[p.id] || 0) + 1); });
      toast('<span>Pakket ' + esc(GIFT[id].name) + ' toegevoegd</span><a href="#/winkelwagen">Bekijk winkelwagen</a>');
    } else if (t.id === 'pAdd') {
      id = t.getAttribute('data-id');
      var n = Math.max(1, parseInt(document.getElementById('pqty').value, 10) || 1);
      setQty(id, (cart[id] || 0) + n);
      toast('<span>' + n + ' × ' + esc(BY_ID[id].n) + ' toegevoegd</span><a href="#/winkelwagen">Bekijk winkelwagen</a>');
    } else if (t.hasAttribute('data-step')) {
      var input = t.parentNode.querySelector('input');
      input.value = Math.max(1, Math.min(999, (parseInt(input.value, 10) || 1) + Number(t.getAttribute('data-step'))));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } else if ((id = t.getAttribute('data-remove'))) {
      setQty(id, 0);
      route();
      toast('<span>' + esc(BY_ID[id].n) + ' verwijderd</span>');
    } else if (t.hasAttribute('data-facet') && listing) {
      listing.facet = t.getAttribute('data-facet');
      listing.shown = PAGE_SIZE;
      Array.prototype.forEach.call(document.querySelectorAll('[data-facet]'), function (c) { c.setAttribute('aria-pressed', String(c === t)); });
      renderList();
    } else if (t.id === 'moreBtn' && listing) {
      var before = listing.shown;
      listing.shown += PAGE_SIZE;
      renderList();
      var cards = document.querySelectorAll('#listOut .card h3 a');
      if (cards[before]) cards[before].focus();
    } else if (t.id === 'copyOrder') {
      var text = orderText(null);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { toast('<span>Bestelling gekopieerd</span>'); }, function () { window.prompt('Kopieer je bestelling:', text); });
      } else { window.prompt('Kopieer je bestelling:', text); }
    }
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (listing && (t.id === 'fBrand' || t.id === 'fStock' || t.id === 'fSort')) {
      listing.brand = (document.getElementById('fBrand') || {}).value || '';
      listing.stock = document.getElementById('fStock').checked;
      listing.sort = document.getElementById('fSort').value;
      listing.shown = PAGE_SIZE;
      renderList();
    } else if (t.id && t.id.indexOf('q-') === 0) {
      var id = t.id.slice(2);
      setQty(id, Math.max(1, parseInt(t.value, 10) || 1));
      route();
      var again = document.getElementById(t.id);
      if (again) again.focus();
    }
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'orderForm') return;
    e.preventDefault();
    var body = orderText(e.target);
    location.href = 'mailto:' + ORDER_EMAIL + '?subject=' + encodeURIComponent('Bestelaanvraag website') + '&body=' + encodeURIComponent(body);
    toast('<span>Je e-mailprogramma opent met je bestelling</span>');
  });

  // ---- start ----------------------------------------------------------------
  var catCount = {};
  PRODUCTS.forEach(function (p) { catCount[p.c] = (catCount[p.c] || 0) + 1; });
  // Korte namen in de menubalk, zodat alle tabbladen naast elkaar passen.
  var NAV_NAMES = { gereedschap: 'Gereedschap', regentonnen: 'Regentonnen', potten: 'Potten', kweken: 'Kweken', dieren: 'Vogels', handschoenen: 'Handschoenen', kruiwagens: 'Kruiwagens' };
  document.getElementById('catnav').innerHTML =
    (XMAS ? '<li><a class="nav-gift" href="#/cadeaupakketten" data-cat="cadeau">Cadeaupakketten</a></li>' : '') +
    CATS.slice(0, XMAS ? 8 : 9).map(function (c) {
      return '<li><a href="#/c/' + c.id + '" data-cat="' + c.id + '" title="' + esc(c.name) + '">' + esc(NAV_NAMES[c.id] || c.name) + '</a></li>';
    }).join('');
  if (XMAS) {
    var usp = document.querySelector('.usps li');
    if (usp) usp.innerHTML = '<a class="usp-gift" href="#/cadeaupakketten">Kersttip: bekijk onze cadeaupakketten</a>';
  }
  document.getElementById('megalist').innerHTML = CATS.filter(function (c) { return catCount[c.id]; }).map(function (c) {
    return '<li><a href="#/c/' + c.id + '">' + icon(c.icon, 26) + esc(c.name) + '<small>' + catCount[c.id] + '</small></a></li>';
  }).join('');

  var menuBtn = document.getElementById('menuBtn');
  var mega = document.getElementById('megamenu');
  function setMenu(open) {
    mega.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(mega.hidden); });
  document.addEventListener('click', function (e) {
    if (!mega.hidden && !e.target.closest('#menuBtn') && (!e.target.closest('#megamenu') || e.target.closest('a'))) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mega.hidden) { setMenu(false); menuBtn.focus(); }
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  saveCart();
  route();
})();

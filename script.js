/* ============================================================
   Jom Cuti — script.js
   All behaviour: routing/navigation, search & filters, card
   rendering, favourites, itinerary planner, contact form.
   Content lives in content.js (window.CONTENT).
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const byId = (arr, id) => arr.find((x) => x.id === id);
  const regionName = (id) => {
    const r = byId(CONTENT.regions, id);
    return r ? r.name : id;
  };
  const catName = (id) => {
    const c = byId(CONTENT.categories, id);
    return c ? c.name : id;
  };

  /* ---------------- SCENE ILLUSTRATIONS ---------------- */
  // Small hand-built SVG "scenes" standing in for photography, keeping the
  // whole site self-contained. Each takes a viewBox sized for its slot.
  function scene(type, vb) {
    vb = vb || "0 0 400 250";
    const skies = {
      beach: ["#ffe7b0", "#ffd27a"],
      city: ["#ffe1c2", "#ffcf9c"],
      hills: ["#dff2e6", "#bfe6cf"],
      rainforest: ["#e7f2df", "#cfe8bd"],
    };
    const [sky1, sky2] = skies[type] || skies.beach;
    const grad = `g${type}${Math.random().toString(36).slice(2, 7)}`;
    let body = "";

    if (type === "beach") {
      body = `
        <circle cx="330" cy="60" r="34" style="fill:var(--sunshine)"/>
        <path d="M0 170 Q100 140 200 165 T400 155 V250 H0 Z" style="fill:var(--ocean)"/>
        <path d="M0 195 Q110 175 200 195 T400 188 V250 H0 Z" style="fill:var(--ocean-deep)"/>
        <path d="M60 250 Q90 190 140 190 Q190 190 210 250 Z" style="fill:var(--jungle)"/>
        <path d="M250 250 Q270 210 300 210 Q330 210 340 250 Z" style="fill:var(--jungle-deep)"/>
      `;
    } else if (type === "city") {
      body = `
        <circle cx="70" cy="55" r="30" style="fill:var(--sunshine)"/>
        <rect x="40" y="130" width="34" height="120" style="fill:var(--ocean-deep)"/>
        <rect x="84" y="100" width="30" height="150" style="fill:var(--ocean)"/>
        <rect x="124" y="150" width="26" height="100" style="fill:var(--ink-soft)"/>
        <polygon points="185,60 205,150 165,150" style="fill:var(--sunset)"/>
        <rect x="176" y="150" width="58" height="100" style="fill:var(--sunset-deep)"/>
        <rect x="250" y="120" width="28" height="130" style="fill:var(--ocean)"/>
        <rect x="288" y="90" width="24" height="160" style="fill:var(--ocean-deep)"/>
        <rect x="322" y="140" width="30" height="110" style="fill:var(--ink-soft)"/>
        <rect x="0" y="240" width="400" height="10" style="fill:var(--jungle-deep)"/>
      `;
    } else if (type === "hills") {
      body = `
        <circle cx="335" cy="50" r="26" style="fill:var(--sunshine)"/>
        <path d="M0 130 Q80 90 160 125 T400 110 V250 H0 Z" style="fill:var(--jungle)"/>
        <path d="M0 165 Q90 135 200 160 T400 150 V250 H0 Z" style="fill:var(--jungle-deep)"/>
        <path d="M0 205 Q100 185 220 200 T400 195 V250 H0 Z" style="fill:var(--ocean-deep)"/>
      `;
    } else {
      body = `
        <rect x="0" y="0" width="400" height="250" style="fill:var(--sand-dim)" opacity="0.001"/>
        <ellipse cx="200" cy="60" rx="180" ry="30" style="fill:var(--sunshine)" opacity="0.55"/>
        <path d="M-10 140 Q60 90 130 135 T280 125 T410 140 V250 H-10 Z" style="fill:var(--jungle-deep)"/>
        <path d="M-10 175 Q80 130 200 170 T410 165 V250 H-10 Z" style="fill:var(--jungle)"/>
        <path d="M-10 210 Q100 180 220 205 T410 200 V250 H-10 Z" style="fill:var(--ocean-deep)"/>
      `;
    }

    return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMax slice" role="img" aria-label="${type} illustration"><defs></defs>${body}</svg>`;
  }

  /* ---------------- FAVOURITES (localStorage) ---------------- */
  const FAV_KEY = "jomcuti.favourites";
  function getFavs() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function setFavs(list) {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(list));
    } catch (e) {
      /* storage unavailable — favourites just won't persist */
    }
    renderFavCount();
  }
  function isFav(id) {
    return getFavs().includes(id);
  }
  function toggleFav(id) {
    const favs = getFavs();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1);
    else favs.push(id);
    setFavs(favs);
    document.dispatchEvent(new CustomEvent("favs-changed"));
  }
  function renderFavCount() {
    const el = $("#favCount");
    if (el) el.textContent = String(getFavs().length);
  }

  /* ---------------- DESTINATION CARD ---------------- */
  function destCard(dest) {
    const fav = isFav(dest.id);
    return `
      <article class="dest-card">
        <a class="dest-card-link" href="#/destination/${dest.id}" aria-label="View ${dest.name}"></a>
        <div class="scene">${scene(dest.scene)}</div>
        <button type="button" class="fav-btn" data-fav-id="${dest.id}" aria-pressed="${fav}" aria-label="${fav ? "Remove from" : "Add to"} favourites">${fav ? "♥" : "♡"}</button>
        <div class="dest-card-body">
          <p class="dest-region">${regionName(dest.region)}</p>
          <h3>${dest.name}</h3>
          <p class="dest-tagline">${dest.tagline}</p>
          <div class="dest-tagset">
            ${dest.tags.map((t) => `<span class="tag-pill">${catName(t)}</span>`).join("")}
          </div>
        </div>
      </article>`;
  }

  function wireFavButtons(root) {
    $$(".fav-btn", root).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFav(btn.dataset.favId);
        const fav = isFav(btn.dataset.favId);
        btn.setAttribute("aria-pressed", String(fav));
        btn.textContent = fav ? "♥" : "♡";
      });
    });
  }

  /* ---------------- HOME PAGE ---------------- */
  function renderHome() {
    $("#heroTitle").textContent = CONTENT.site.heroTitle;
    $("#heroSub").textContent = CONTENT.site.heroSubtitle;
    $("#heroArt").innerHTML = scene("beach", "0 0 400 300");
    $("#statDest").textContent = CONTENT.destinations.length;
    $("#statStates").textContent = CONTENT.regions.length;
    $("#statItins").textContent = CONTENT.itineraries.length;

    const popular = CONTENT.destinations.slice(0, 6);
    $("#popularGrid").innerHTML = popular.map(destCard).join("");
    wireFavButtons($("#popularGrid"));

    $("#homeCategoryChips").innerHTML = CONTENT.categories
      .map((c) => `<a class="chip" href="#/things-to-do/${c.id}">${c.name}</a>`)
      .join("");

    $("#homeItinGrid").innerHTML = CONTENT.itineraries
      .slice(0, 3)
      .map(
        (it) => `
        <div class="itin-card">
          <span class="days-badge">${it.days} days</span>
          <h3>${it.title}</h3>
          <p>${it.summary}</p>
        </div>`
      )
      .join("");

    $("#homeTipsGrid").innerHTML = CONTENT.tips
      .slice(0, 4)
      .map((t) => `<div class="tip-card"><h3>${t.title}</h3><p>${t.text}</p></div>`)
      .join("");
  }

  /* ---------------- DESTINATIONS PAGE ---------------- */
  let destFilters = { q: "", region: "", category: "" };

  function populateDestFilterOptions() {
    const regionSel = $("#destRegionFilter");
    const catSel = $("#destCategoryFilter");
    if (regionSel.options.length <= 1) {
      CONTENT.regions.forEach((r) => {
        const o = document.createElement("option");
        o.value = r.id;
        o.textContent = r.name;
        regionSel.appendChild(o);
      });
    }
    if (catSel.options.length <= 1) {
      CONTENT.categories.forEach((c) => {
        const o = document.createElement("option");
        o.value = c.id;
        o.textContent = c.name;
        catSel.appendChild(o);
      });
    }
  }

  function filteredDestinations() {
    const q = destFilters.q.trim().toLowerCase();
    return CONTENT.destinations.filter((d) => {
      const matchesQ =
        !q ||
        d.name.toLowerCase().includes(q) ||
        regionName(d.region).toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q);
      const matchesRegion = !destFilters.region || d.region === destFilters.region;
      const matchesCat = !destFilters.category || d.tags.includes(destFilters.category);
      return matchesQ && matchesRegion && matchesCat;
    });
  }

  function renderDestGrid() {
    const list = filteredDestinations();
    $("#destGrid").innerHTML = list.length
      ? list.map(destCard).join("")
      : `<p class="result-count">No destinations match those filters yet — try clearing one.</p>`;
    wireFavButtons($("#destGrid"));
    $("#destResultCount").textContent = `${list.length} destination${list.length === 1 ? "" : "s"}`;
  }

  function renderDestinations() {
    populateDestFilterOptions();
    $("#destSearch").value = destFilters.q;
    $("#destRegionFilter").value = destFilters.region;
    $("#destCategoryFilter").value = destFilters.category;
    renderDestGrid();
  }

  function wireDestinationsPage() {
    $("#destSearch").addEventListener("input", (e) => {
      destFilters.q = e.target.value;
      renderDestGrid();
    });
    $("#destRegionFilter").addEventListener("change", (e) => {
      destFilters.region = e.target.value;
      renderDestGrid();
    });
    $("#destCategoryFilter").addEventListener("change", (e) => {
      destFilters.category = e.target.value;
      renderDestGrid();
    });
    $("#destClear").addEventListener("click", () => {
      destFilters = { q: "", region: "", category: "" };
      renderDestinations();
    });
  }

  /* ---------------- DESTINATION DETAIL ---------------- */
  function renderDestinationDetail(id) {
    const dest = byId(CONTENT.destinations, id);
    const el = $("#detailContent");
    if (!dest) {
      el.innerHTML = `<p>We couldn't find that destination. <a href="#/destinations">Back to all destinations</a>.</p>`;
      return;
    }
    const fav = isFav(dest.id);
    el.innerHTML = `
      <div class="detail-hero">${scene(dest.scene, "0 0 900 300")}</div>
      <div class="detail-head">
        <div>
          <p class="eyebrow">${regionName(dest.region)}</p>
          <h1>${dest.name}</h1>
          <p class="page-lede">${dest.tagline}</p>
        </div>
        <button type="button" class="ghost-btn fav-btn-inline" data-fav-id="${dest.id}" aria-pressed="${fav}">
          ${fav ? "♥ Saved" : "♡ Save destination"}
        </button>
      </div>
      <div class="detail-grid">
        <div>
          <p>${dest.description}</p>
          <h2>Highlights</h2>
          <ul class="highlight-list">
            ${dest.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>
        <dl class="detail-side">
          <div><dt>Best for</dt><dd>${dest.bestFor}</dd></div>
          <div><dt>Ideal length of stay</dt><dd>${dest.idealDays} day${dest.idealDays === 1 ? "" : "s"}</dd></div>
          <div><dt>Things to do here</dt><dd>${dest.tags.map(catName).join(", ")}</dd></div>
          <div>
            <dt>Plan a trip</dt>
            <dd><a class="text-link" href="#/planner">Open the itinerary planner →</a></dd>
          </div>
        </dl>
      </div>
    `;
    $(".fav-btn-inline", el).addEventListener("click", () => {
      toggleFav(dest.id);
      renderDestinationDetail(id);
    });
  }

  /* ---------------- THINGS TO DO ---------------- */
  let thingsFilter = "";

  function renderThingsToDo() {
    $("#thingsCategoryChips").innerHTML = CONTENT.categories
      .map(
        (c) =>
          `<button type="button" class="chip${c.id === thingsFilter ? " active" : ""}" data-cat="${c.id}">${c.name}</button>`
      )
      .join("");
    $$(".chip", $("#thingsCategoryChips")).forEach((chip) => {
      chip.addEventListener("click", () => {
        thingsFilter = thingsFilter === chip.dataset.cat ? "" : chip.dataset.cat;
        location.hash = thingsFilter ? `#/things-to-do/${thingsFilter}` : "#/things-to-do";
      });
    });

    const cats = thingsFilter ? CONTENT.categories.filter((c) => c.id === thingsFilter) : CONTENT.categories;
    $("#thingsToDoLists").innerHTML = cats
      .map(
        (c) => `
        <div class="category-block">
          <h2>${c.name}</h2>
          <div class="activity-grid">
            ${(CONTENT.thingsToDo[c.id] || [])
              .map(
                (a) => `
              <div class="activity-card">
                <p class="activity-loc">${a.location}</p>
                <h3>${a.title}</h3>
                <p>${a.blurb}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");
  }

  /* ---------------- RECOMMENDATIONS ---------------- */
  function pickChips(ids) {
    return ids
      .map((id) => byId(CONTENT.destinations, id))
      .filter(Boolean)
      .map((d) => `<a class="tag-pill" href="#/destination/${d.id}" style="text-decoration:none">${d.name}</a>`)
      .join("");
  }

  function renderRecommendations() {
    $("#recDurationGrid").innerHTML = CONTENT.recommendations.duration
      .map(
        (r) => `
      <div class="rec-card">
        <h3>${r.label}</h3>
        <p>${r.text}</p>
        <div class="rec-picks">${pickChips(r.picks)}</div>
      </div>`
      )
      .join("");

    $("#recStyleGrid").innerHTML = CONTENT.recommendations.style
      .map(
        (r) => `
      <div class="rec-card">
        <h3>${r.label}</h3>
        <p>${r.text}</p>
        <div class="rec-picks">${pickChips(r.picks)}</div>
      </div>`
      )
      .join("");
  }

  /* ---------------- ITINERARY PLANNER ---------------- */
  const PLANNER_KEY = "jomcuti.planner";
  let plannerState = null; // { destId, title, days: [{ label, activities: [string,...] }] }

  function buildDefaultPlan(destId, numDays) {
    const dest = byId(CONTENT.destinations, destId);
    const curated = CONTENT.itineraries.find((it) => {
      const focusMatch = it.plan.some((p) => p.focus.toLowerCase().includes(dest.name.split(" ")[0].toLowerCase()));
      return focusMatch && it.days === Number(numDays);
    });

    if (curated) {
      return {
        destId,
        title: `${curated.title}`,
        days: curated.plan.map((p) => ({ label: `Day ${p.day} — ${p.focus}`, activities: [...p.activities] })),
      };
    }

    // Fall back to cycling through the destination's own highlights.
    const pool = dest.highlights.length ? dest.highlights : ["Free time to explore"];
    const days = [];
    for (let i = 0; i < Number(numDays); i++) {
      const a = pool[i % pool.length];
      const b = pool[(i + 1) % pool.length];
      days.push({
        label: `Day ${i + 1}`,
        activities: a === b ? [a] : [a, b],
      });
    }
    return { destId, title: `${dest.name}, ${numDays} day${numDays == 1 ? "" : "s"}`, days };
  }

  function renderPlannerBoard() {
    const board = $("#plannerBoard");
    if (!plannerState) {
      board.hidden = true;
      return;
    }
    board.hidden = false;
    $("#plannerBoardTitle").textContent = plannerState.title;
    $("#plannerDays_container").innerHTML = plannerState.days
      .map(
        (day, dIdx) => `
        <div class="planner-day" data-day-idx="${dIdx}">
          <div class="planner-day-head">
            <h3>${day.label}</h3>
            <button type="button" class="planner-day-remove" data-remove-day="${dIdx}">Remove day</button>
          </div>
          <div class="day-activities">
            ${day.activities
              .map(
                (act, aIdx) => `
              <div class="activity-item" draggable="true" data-day="${dIdx}" data-act="${aIdx}">
                <span class="handle" title="Drag to reorder">⠿</span>
                <input type="text" value="${act.replace(/"/g, "&quot;")}" data-day="${dIdx}" data-act="${aIdx}" aria-label="Activity">
                <span class="reorder-btns">
                  <button type="button" title="Move up" data-move="up" data-day="${dIdx}" data-act="${aIdx}">▲</button>
                  <button type="button" title="Move down" data-move="down" data-day="${dIdx}" data-act="${aIdx}">▼</button>
                </span>
                <button type="button" class="remove-btn" title="Remove activity" data-remove-act data-day="${dIdx}" data-act="${aIdx}">✕</button>
              </div>`
              )
              .join("")}
          </div>
          <button type="button" class="add-activity-btn" data-add-act="${dIdx}">+ Add activity</button>
        </div>`
      )
      .join("");

    wirePlannerBoardEvents();
  }

  function wirePlannerBoardEvents() {
    const container = $("#plannerDays_container");

    $$(".planner-day-remove", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        plannerState.days.splice(Number(btn.dataset.removeDay), 1);
        renderPlannerBoard();
        setPlannerStatus("Day removed.");
      })
    );

    $$("input[type=text]", container).forEach((inp) =>
      inp.addEventListener("input", () => {
        plannerState.days[inp.dataset.day].activities[inp.dataset.act] = inp.value;
      })
    );

    $$("[data-remove-act]", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        plannerState.days[btn.dataset.day].activities.splice(Number(btn.dataset.act), 1);
        renderPlannerBoard();
      })
    );

    $$("[data-move]", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        const d = Number(btn.dataset.day);
        const a = Number(btn.dataset.act);
        const arr = plannerState.days[d].activities;
        const target = btn.dataset.move === "up" ? a - 1 : a + 1;
        if (target < 0 || target >= arr.length) return;
        [arr[a], arr[target]] = [arr[target], arr[a]];
        renderPlannerBoard();
      })
    );

    $$(".add-activity-btn", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        plannerState.days[btn.dataset.addAct].activities.push("New activity");
        renderPlannerBoard();
      })
    );

    // Drag-to-reorder within/between days.
    let dragSrc = null;
    $$(".activity-item", container).forEach((item) => {
      item.addEventListener("dragstart", () => {
        dragSrc = { day: Number(item.dataset.day), act: Number(item.dataset.act) };
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => item.classList.remove("dragging"));
      item.addEventListener("dragover", (e) => e.preventDefault());
      item.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!dragSrc) return;
        const destDay = Number(item.dataset.day);
        const destAct = Number(item.dataset.act);
        const moved = plannerState.days[dragSrc.day].activities.splice(dragSrc.act, 1)[0];
        plannerState.days[destDay].activities.splice(destAct, 0, moved);
        dragSrc = null;
        renderPlannerBoard();
      });
    });
  }

  function setPlannerStatus(msg) {
    const el = $("#plannerStatus");
    el.textContent = msg;
    if (msg) setTimeout(() => { if (el.textContent === msg) el.textContent = ""; }, 3200);
  }

  function populatePlannerDestinations() {
    const sel = $("#plannerDestination");
    if (sel.options.length) return;
    CONTENT.destinations.forEach((d) => {
      const o = document.createElement("option");
      o.value = d.id;
      o.textContent = `${d.name} (${regionName(d.region)})`;
      sel.appendChild(o);
    });
  }

  function renderPlanner() {
    populatePlannerDestinations();
    if (!plannerState) {
      try {
        const saved = JSON.parse(localStorage.getItem(PLANNER_KEY));
        if (saved) plannerState = saved;
      } catch (e) {
        /* ignore */
      }
    }
    renderPlannerBoard();
  }

  function wirePlannerPage() {
    $("#plannerSetup").addEventListener("submit", (e) => {
      e.preventDefault();
      const destId = $("#plannerDestination").value;
      const days = Number($("#plannerDays").value) || 1;
      plannerState = buildDefaultPlan(destId, days);
      renderPlannerBoard();
      setPlannerStatus("Itinerary generated — feel free to edit it.");
    });

    $("#plannerAddDay").addEventListener("click", () => {
      if (!plannerState) return;
      plannerState.days.push({ label: `Day ${plannerState.days.length + 1}`, activities: ["New activity"] });
      renderPlannerBoard();
    });

    $("#plannerSave").addEventListener("click", () => {
      if (!plannerState) return;
      try {
        localStorage.setItem(PLANNER_KEY, JSON.stringify(plannerState));
        setPlannerStatus("Itinerary saved on this device.");
      } catch (e) {
        setPlannerStatus("Couldn't save — your browser may be blocking local storage.");
      }
    });

    $("#plannerReset").addEventListener("click", () => {
      plannerState = null;
      try {
        localStorage.removeItem(PLANNER_KEY);
      } catch (e) {
        /* ignore */
      }
      renderPlannerBoard();
      setPlannerStatus("Itinerary cleared.");
    });
  }

  /* ---------------- ABOUT ---------------- */
  function renderAbout() {
    $("#aboutHeading").textContent = CONTENT.about.heading;
    $("#aboutBody").innerHTML = CONTENT.about.paragraphs.map((p) => `<p>${p}</p>`).join("");
  }

  /* ---------------- CONTACT ---------------- */
  function renderContact() {
    $("#contactHeading").textContent = CONTENT.contact.heading;
    $("#contactText").textContent = CONTENT.contact.text;
    $("#contactInfo").innerHTML = `
      <dl>
        <div><dt>Email</dt><dd><a href="mailto:${CONTENT.contact.email}">${CONTENT.contact.email}</a></dd></div>
        <div><dt>Phone</dt><dd>${CONTENT.contact.phone}</dd></div>
        <div><dt>Address</dt><dd>${CONTENT.contact.address}</dd></div>
        <div><dt>Hours</dt><dd>${CONTENT.contact.hours}</dd></div>
      </dl>`;
  }

  function validateContactForm() {
    let ok = true;
    const name = $("#cfName");
    const email = $("#cfEmail");
    const message = $("#cfMessage");

    if (!name.value.trim()) {
      $("#cfNameError").textContent = "Please enter your name.";
      ok = false;
    } else {
      $("#cfNameError").textContent = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      $("#cfEmailError").textContent = "Please enter a valid email address.";
      ok = false;
    } else {
      $("#cfEmailError").textContent = "";
    }

    if (message.value.trim().length < 10) {
      $("#cfMessageError").textContent = "Message should be at least 10 characters.";
      ok = false;
    } else {
      $("#cfMessageError").textContent = "";
    }

    return ok;
  }

  function wireContactForm() {
    $("#contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateContactForm()) {
        $("#cfStatus").textContent = "";
        return;
      }
      const btn = $("#contactForm button[type=submit]");
      btn.disabled = true;
      $("#cfStatus").textContent = "Sending…";
      setTimeout(() => {
        $("#cfStatus").textContent = `Thanks — we'll reply to ${$("#cfEmail").value.trim()} soon.`;
        $("#contactForm").reset();
        btn.disabled = false;
      }, 600);
    });
  }

  /* ---------------- FAVOURITES DRAWER ---------------- */
  function renderFavDrawer() {
    const favs = getFavs();
    const list = $("#favList");
    if (!favs.length) {
      list.innerHTML = `<p class="fav-empty">No favourites yet — tap the heart on any destination card to save it here.</p>`;
      return;
    }
    list.innerHTML = favs
      .map((id) => byId(CONTENT.destinations, id))
      .filter(Boolean)
      .map(
        (d) => `
        <div class="fav-item">
          <a href="#/destination/${d.id}">${d.name}</a>
          <button type="button" data-remove-fav="${d.id}">Remove</button>
        </div>`
      )
      .join("");
    $$("[data-remove-fav]", list).forEach((btn) =>
      btn.addEventListener("click", () => {
        toggleFav(btn.dataset.removeFav);
        renderFavDrawer();
      })
    );
  }

  function openFavDrawer() {
    renderFavDrawer();
    $("#favDrawer").hidden = false;
    $("#favBackdrop").hidden = false;
  }
  function closeFavDrawer() {
    $("#favDrawer").hidden = true;
    $("#favBackdrop").hidden = true;
  }

  /* ---------------- ROUTER ---------------- */
  const routes = {
    home: renderHome,
    destinations: renderDestinations,
    "destination-detail": null, // handled with param
    "things-to-do": renderThingsToDo,
    recommendations: renderRecommendations,
    planner: renderPlanner,
    about: renderAbout,
    contact: renderContact,
  };

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    return { page: parts[0] || "home", param: parts[1] || "" };
  }

  function showPage(pageKey) {
    $$(".page").forEach((sec) => {
      sec.hidden = sec.dataset.page !== pageKey;
    });
    $$(".mainnav a").forEach((a) => {
      a.classList.toggle("active", a.dataset.nav === pageKey);
    });
    $("#main").scrollIntoView ? window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }) : null;
  }

  function router() {
    const { page, param } = parseHash();

    if (page === "destination") {
      showPage("destination-detail");
      renderDestinationDetail(param);
      return;
    }

    if (page === "things-to-do" && param) {
      thingsFilter = param;
    } else if (page === "things-to-do") {
      thingsFilter = thingsFilter || "";
    }

    const known = Object.prototype.hasOwnProperty.call(routes, page) ? page : "home";
    showPage(known);
    if (routes[known]) routes[known]();
  }

  /* ---------------- GLOBAL WIRING ---------------- */
  function wireNav() {
    const toggle = $("#navToggle");
    const nav = $("#mainnav") || $(".mainnav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".mainnav a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  function wireHeroSearch() {
    $("#heroSearchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const q = $("#heroSearchInput").value;
      destFilters = { q, region: "", category: "" };
      location.hash = "#/destinations";
      // If already on destinations, router() won't refire (hashchange needs a
      // change); render directly as a fallback too.
      renderDestinations();
    });
  }

  function wireFavDrawerControls() {
    $("#favToggleFoot").addEventListener("click", openFavDrawer);
    $("#favClose").addEventListener("click", closeFavDrawer);
    $("#favBackdrop").addEventListener("click", closeFavDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeFavDrawer();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    wireNav();
    wireHeroSearch();
    wireDestinationsPage();
    wirePlannerPage();
    wireContactForm();
    wireFavDrawerControls();
    renderFavCount();

    window.addEventListener("hashchange", router);
    router();
  });
})();

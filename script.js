/**
 * PocketPanel Landing Page Script
 *
 * ストア公開後、下記の STORE_LINKS の url と status を更新するだけで
 * 日本語版・英語版両方のダウンロードボタンが自動で有効化されます。
 * status: "live" | "review" | "soon"
 */
const STORE_LINKS = {
  msStore: {
    url: "https://apps.microsoft.com/detail/9N20M93K38MC",
    status: "review",
    labelJa: "ストア認定中（ID: 9N20M93K38MC）",
    labelEn: "In Certification (ID: 9N20M93K38MC)",
    liveJa: "Microsoft Store で入手",
    liveEn: "Available on Microsoft Store"
  },
  googlePlay: {
    url: "", // 公開後に Google Play URL を設定
    status: "soon",
    labelJa: "公開準備中 (Coming Soon)",
    labelEn: "Coming Soon",
    liveJa: "Google Play で入手",
    liveEn: "Get it on Google Play"
  },
  appStore: {
    url: "", // 公開後に App Store URL を設定
    status: "soon",
    labelJa: "公開準備中 (Coming Soon)",
    labelEn: "Coming Soon",
    liveJa: "App Store で入手",
    liveEn: "Download on the App Store"
  },
  macOs: {
    url: "", // 公開後に macOS 向け URL を設定
    status: "soon",
    labelJa: "今後公開予定 (Coming Soon)",
    labelEn: "Coming Soon",
    liveJa: "macOS 版を入手",
    liveEn: "Download for macOS"
  }
};

const SLIDES = {
  ja: [
    {
      src: "assets/screenshots/02_mobile_home.png",
      title: "ホームダッシュボード",
      desc: "時計、天気、Spotify再生コントロール、CPU/GPU/RAM/ネットワークのグラフを1画面に集約。"
    },
    {
      src: "assets/screenshots/03_mobile_system.png",
      title: "リアルタイム システム監視",
      desc: "プロセッサーやGPUの温度・消費電力、VRAM、ドライブ容量、ネットワークPingを詳細に表示。"
    },
    {
      src: "assets/screenshots/04_mobile_deck.png",
      title: "Control Deck（タッチショートカット）",
      desc: "アプリ起動、音量ミュート、画面オフ、ロックなどのPC操作をワンタップで即実行。"
    },
    {
      src: "assets/screenshots/05_mobile_ai.png",
      title: "AI 利用枠モニター",
      desc: "Claude や Codex のセッション利用枠・リセット時刻・消費ペースをひと目で把握。"
    },
    {
      src: "assets/screenshots/06_mobile_cute_daily.png",
      title: "パステル・デイリーテーマ",
      desc: "ToDoチェックリスト、時間経過バー、ポモドーロタイマー、カウンターをやさしい配色で。"
    },
    {
      src: "assets/screenshots/07_mobile_cute_music.png",
      title: "パステル・ミュージック＆天気",
      desc: "再生中の楽曲アートワークと週間天気予報を組み合わせた、デスクに置きたくなるデザイン。"
    },
    {
      src: "assets/screenshots/01_pc_editor.png",
      title: "PCブラウザ・レイアウトエディター",
      desc: "12×6グリッド上でウィジェットをドラッグ＆リサイズ。テンプレート適用もワンクリック。"
    }
  ],
  en: [
    {
      src: "../assets/screenshots/02_mobile_home.png",
      title: "Home Dashboard",
      desc: "Clock, weather, Spotify playback controls, and live CPU/GPU/RAM/Network graphs in a single view."
    },
    {
      src: "../assets/screenshots/03_mobile_system.png",
      title: "Real-time System Telemetry",
      desc: "Track CPU/GPU load, temperatures, wattage, VRAM, disk usage, and network ping in real time."
    },
    {
      src: "../assets/screenshots/04_mobile_deck.png",
      title: "Touch Control Deck",
      desc: "Launch apps, mute audio, turn off the screen, or lock your PC with a single tap."
    },
    {
      src: "../assets/screenshots/05_mobile_ai.png",
      title: "AI Coding Quotas",
      desc: "Monitor Claude and Codex session quotas, reset timers, and burn-rate forecasts at a glance."
    },
    {
      src: "../assets/screenshots/06_mobile_cute_daily.png",
      title: "Pastel Daily Theme",
      desc: "Checklists, progress bars, timer, counter, and stopwatch in a soft pastel layout."
    },
    {
      src: "../assets/screenshots/07_mobile_cute_music.png",
      title: "Pastel Music & Forecast",
      desc: "Now Playing controls paired with a 7-day weather forecast in a clean pastel aesthetic."
    },
    {
      src: "../assets/screenshots/01_pc_editor.png",
      title: "PC Visual Layout Editor",
      desc: "Drag, resize, and configure widgets across a 12×6 grid directly from your PC browser."
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const isEn = document.documentElement.lang === "en";
  const langKey = isEn ? "en" : "ja";

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  // Gallery Tabs
  const tabs = document.querySelectorAll(".tab-btn");
  const mainImg = document.getElementById("galleryMainImage");
  const titleEl = document.getElementById("galleryTitle");
  const descEl = document.getElementById("galleryDesc");
  const slides = SLIDES[langKey];

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.slide);
      const slide = slides[idx];
      if (!slide || !mainImg) return;

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      mainImg.src = slide.src;
      mainImg.alt = slide.title;
      if (titleEl) titleEl.textContent = slide.title;
      if (descEl) descEl.textContent = slide.desc;
    });
  });

  // Hydrate Store Cards from STORE_LINKS
  document.querySelectorAll("[data-store]").forEach((el) => {
    const key = el.dataset.store;
    const cfg = STORE_LINKS[key];
    if (!cfg) return;

    const statusEl = el.querySelector(".store-status");
    if (cfg.url && cfg.status === "live") {
      if (el.tagName !== "A") {
        const anchor = document.createElement("a");
        anchor.className = "store-card";
        anchor.href = cfg.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.dataset.store = key;
        anchor.innerHTML = el.innerHTML;
        const badge = anchor.querySelector(".store-badge");
        if (badge) {
          badge.outerHTML = '<span class="store-arrow" aria-hidden="true">→</span>';
        }
        el.replaceWith(anchor);
        el = anchor;
      } else {
        el.href = cfg.url;
        el.classList.remove("store-soon");
        el.removeAttribute("aria-disabled");
      }
      const updatedStatus = el.querySelector(".store-status");
      if (updatedStatus) {
        updatedStatus.className = "store-status status-live";
        updatedStatus.textContent = isEn ? cfg.liveEn : cfg.liveJa;
      }
    } else if (statusEl) {
      statusEl.textContent = isEn ? cfg.labelEn : cfg.labelJa;
    }
  });
});

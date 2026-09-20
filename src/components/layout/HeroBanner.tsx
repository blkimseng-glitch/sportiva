export default function HeroBanner() {
  const image = "/hero.png";

  return (
    <>
   <header className="absolute inset-x-0 top-0 z-30 bg-white text-gray-800 shadow-sm">
    <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
      {/* Logo */}
      <a href="#" className="text-xl font-black tracking-tight">
        SPORT<span className="text-red-600">IVA</span>
      </a>
      {/* Desktop navigation */}
      <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-wide md:flex">
        <a href="#" className="hero-nav-link text-red-600">
          Home
        </a>
        <a href="#" className="transition hover:text-red-600">
          Sports
        </a>
        <a href="#" className="transition hover:text-red-600">
          Business
        </a>
        <a href="#" className="transition hover:text-red-600">
          Videos
        </a>
        <a href="#" className="transition hover:text-red-600">
          About
        </a>
      </nav>
      {/* Search */}
      <button
        type="button"
        aria-label="Search"
        className="text-gray-600 transition hover:text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
          />
        </svg>
      </button>
    </div>
    {/* Secondary navigation */}
    <div className="hero-subnav hidden border-t border-gray-100 md:block">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 py-2 text-[9px] font-bold uppercase tracking-wider text-gray-500 lg:px-10">
        <a href="#" className="hero-nav-link text-red-600">
          Football
        </a>
        <a href="#" className="hero-nav-link hover:text-red-600">
          Basketball
        </a>
        <a href="#" className="hero-nav-link hover:text-red-600">
          Tennis
        </a>
        <a href="#" className="hero-nav-link hover:text-red-600">
          Cricket
        </a>
        <a href="#" className="hero-nav-link hover:text-red-600">
          Formula 1
        </a>
        <a href="#" className="hero-nav-link hover:text-red-600">
          Golf
        </a>
        <a href="#" className="hero-nav-link hover:text-red-600">
          More sports
        </a>
      </div>
    </div>
  </header>
  {/* Hero */}
  <main>
    <section
      className="relative flex min-h-[680px] items-end overflow-hidden bg-cover bg-center pt-32"
    >
      <div
        aria-hidden="true"
        className="hero-background absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${image}")` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      {/* Optional red top strip */}
      <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 lg:px-10">
        <div className="hero-content max-w-2xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-200">
            Sports &amp; Headlines
          </p>
          <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The world
            <br />
            of sport
            <br />
            never stops.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-gray-200 sm:text-base">
            Discover the biggest stories, moments, athletes, and competitions
            from around the world.
          </p>
          <a
            href="#latest"
            className="mt-8 inline-flex items-center gap-3 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-900 transition hover:bg-red-600 hover:text-white"
          >
            Read latest stories
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      {/* Breaking news ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-10 items-center overflow-hidden bg-black/75 text-[10px] uppercase tracking-wide">
        <div className="relative z-10 shrink-0 bg-red-600 px-5 py-3 font-bold">
          Breaking news
        </div>
        <div className="hero-ticker-viewport flex-1 overflow-hidden">
          <div className="hero-ticker-track text-gray-200">
            <div className="hero-ticker-group">
              <span>Championship finals set to begin tonight</span>
              <span>&bull;</span>
              <span>Global sporting events continue across the world</span>
              <span>&bull;</span>
              <span>Transfer window opens after record-breaking season</span>
              <span>&bull;</span>
              <span>New talent arrives ahead of the summer fixtures</span>
            </div>
            <div aria-hidden="true" className="hero-ticker-group">
              <span>Championship finals set to begin tonight</span>
              <span>&bull;</span>
              <span>Global sporting events continue across the world</span>
              <span>&bull;</span>
              <span>Transfer window opens after record-breaking season</span>
              <span>&bull;</span>
              <span>New talent arrives ahead of the summer fixtures</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
    </>
  );
}

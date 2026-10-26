/* Small, reusable UI improvements. The current production app is in src/app.js. */
function MobileNavigation() {
  const { page, go } = useStore();
  const [open, setOpen] = useState(false);
  const primary = ["dashboard", "calendar", "academics"];
  const labels = {
    dashboard: "Home",
    calendar: "Tasks",
    academics: "Academics",
  };
  const trigger = useRef(null);
  const dialog = useRef(null);
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector("button")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const trap = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
    if (event.key !== "Tab") return;
    const buttons = [...dialog.current.querySelectorAll("button")];
    const first = buttons[0],
      last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return (
    <>
      <nav className="mobile-nav compact-nav" aria-label="Main">
        {primary.map((id) => {
          const item = PAGES.find((p) => p.id === id);
          return (
            <button
              key={id}
              className={page === id ? "on" : ""}
              aria-current={page === id ? "page" : undefined}
              onClick={() => go(id)}
            >
              <Icon n={item.icon} s={20} />
              <span>{labels[id]}</span>
            </button>
          );
        })}
        <button
          ref={trigger}
          className={!primary.includes(page) ? "on" : ""}
          aria-expanded={open}
          aria-controls="more-navigation"
          onClick={() => setOpen(true)}
        >
          <span aria-hidden="true">•••</span>
          <span>More</span>
        </button>
      </nav>
      {open && (
        <div
          className="overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialog}
            id="more-navigation"
            className="modal more-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="more-title"
            onKeyDown={trap}
          >
            <div className="modal-h">
              <h2 id="more-title">Your planner</h2>
              <button
                className="icon-btn"
                aria-label="Close navigation"
                onClick={close}
              >
                <Icon n="x" />
              </button>
            </div>
            <div className="more-grid">
              {PAGES.filter((p) => !primary.includes(p.id)).map((p) => (
                <button
                  className={page === p.id ? "on" : ""}
                  key={p.id}
                  aria-current={page === p.id ? "page" : undefined}
                  onClick={() => {
                    close();
                    go(p.id);
                  }}
                >
                  <Icon n={p.icon} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SetupPrompt({ title, description, action = "Set up semester" }) {
  const { go } = useStore();
  return (
    <div className="setup-prompt">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn soft" onClick={() => go("setup")}>
        <Icon n="plus" s={16} />
        {action}
      </button>
    </div>
  );
}

function BudgetEditor() {
  const { profile, setProfile, notify } = useStore();
  const [amount, setAmount] = useState(String(profile.budget || ""));
  return (
    <section className="card budget-editor">
      <div>
        <h2>
          {profile.budget > 0
            ? "Monthly budget"
            : "Start with your monthly budget"}
        </h2>
        <p className="muted">
          Set a spending limit to see what is left and your daily allowance.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const budget = Number(amount);
          if (Number.isFinite(budget) && budget > 0) {
            setProfile({ ...profile, budget });
            notify("Monthly budget saved");
          }
        }}
      >
        <label htmlFor="finance-budget">Monthly budget (₹)</label>
        <div className="budget-controls">
          <input
            id="finance-budget"
            className="input"
            type="number"
            min="1"
            step="1"
            required
            inputMode="numeric"
            value={amount}
            placeholder="e.g. 5000"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="btn primary" type="submit">
            Save budget
          </button>
        </div>
      </form>
    </section>
  );
}

function NewsFreshness() {
  const { news } = useStore();
  const raw = news.doc?.updatedAt || news.doc?.date;
  const date = raw ? new Date(raw) : null;
  const valid = date && Number.isFinite(date.getTime());
  const stale = !valid || Date.now() - date.getTime() > 48 * 60 * 60 * 1000;
  return (
    <p className="news-freshness">
      {valid
        ? `Updated ${date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}. `
        : ""}
      {stale
        ? "Older edition — these are not today’s headlines."
        : "Latest available edition."}
    </p>
  );
}

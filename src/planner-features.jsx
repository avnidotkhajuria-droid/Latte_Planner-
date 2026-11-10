function ScheduleManager({ compact = false }) {
  const {
    profile,
    setProfile,
    routinePlan,
    setRoutinePlan,
    steps,
    setSteps,
    go,
    notify,
  } = useStore();
  const plans = plannerPlans(profile, PLANS),
    today = todayISO();
  const active =
    plans.find((p) => p.id === planForDate(profile, routinePlan, today)) ||
    plans[0];
  const [name, setName] = useState(""),
    [copy, setCopy] = useState("holiday"),
    [pause, setPause] = useState(true);
  const [start, setStart] = useState(today),
    [end, setEnd] = useState(today),
    [chosen, setChosen] = useState("holiday"),
    [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const saveProfile = (patch) => setProfile({ ...profile, ...patch });
  function saveSchedule(e) {
    e.preventDefault();
    if (!name.trim()) return;
    if (
      plans.some(
        (p) =>
          p.id !== editing &&
          p.label.toLowerCase() === name.trim().toLowerCase(),
      )
    ) {
      setError("Choose a different schedule name.");
      return;
    }
    const id = editing || "plan-" + uid();
    const record = {
      id,
      label: name.trim(),
      icon: "sparkle",
      blocks: {},
      pauseClasses: pause,
    };
    saveProfile({
      customPlans: editing
        ? (profile.customPlans || []).map((p) => (p.id === id ? record : p))
        : [...(profile.customPlans || []), record],
    });
    if (!editing) {
      const additions =
        copy === "blank"
          ? []
          : steps
              .filter((s) => planOf(s) === copy)
              .map((s) => ({ ...s, id: uid(), plan: id }));
      setSteps([...steps, ...additions]);
      setRoutinePlan({ ...routinePlan, [today]: id });
    }
    setName("");
    setEditing(null);
    setError("");
    notify("Schedule saved. Use Edit routine to change its activities.");
  }
  function applyPeriod(e) {
    e.preventDefault();
    if (!start || !end || end < start) {
      setError("Choose an end date on or after the start date.");
      return;
    }
    if (
      (profile.schedulePeriods || []).some(
        (p) => start <= p.end && end >= p.start,
      )
    ) {
      setError(
        "This overlaps another period. Remove that period first or choose different dates.",
      );
      return;
    }
    saveProfile({
      schedulePeriods: [
        ...(profile.schedulePeriods || []),
        { id: uid(), start, end, plan: chosen },
      ],
    });
    // Applying a period explicitly replaces daily selections inside that period.
    setRoutinePlan(
      Object.fromEntries(
        Object.entries(routinePlan).filter(
          ([date]) => date < start || date > end,
        ),
      ),
    );
    setError("");
    notify("Schedule period saved");
  }
  if (compact)
    return (
      <section
        className={"season-banner " + (active.pauseClasses ? "is-holiday" : "")}
      >
        <span className="season-stamp" aria-hidden="true">
          {active.pauseClasses ? "☀" : "✦"}
        </span>
        <div>
          <small>TODAY'S RHYTHM</small>
          <h2>{active.label}</h2>
          <p>
            {active.pauseClasses
              ? "Classes are paused. Make room for rest, hobbies and little adventures."
              : "A little structure, a little breathing room."}
          </p>
        </div>
        <button className="btn soft" onClick={() => go("routines")}>
          Manage schedules
        </button>
      </section>
    );
  return (
    <section className="card schedule-studio">
      <div className="card-h">
        <Icon n="sun" />
        <h2>Schedule studio</h2>
        <span className="studio-tag">Make room for life</span>
      </div>
      <p className="muted">
        Plan a holiday period or create a routine of your own. Your normal
        timetable stays saved. Paused classes do not create attendance entries.
      </p>
      {!steps.some((s) => planOf(s) === "holiday") && (
        <button
          className="btn soft"
          onClick={() => {
            setSteps([
              ...steps,
              ...[
                ["09:00", "Slow breakfast", "morning", "food"],
                ["10:30", "A little reading or a hobby", "college", "book"],
                ["16:30", "Fresh air and a walk", "college", "leaf"],
                ["20:30", "Plan tomorrow, then unwind", "evening", "moon"],
              ].map(([time, title, block, icon]) => ({
                id: uid(),
                plan: "holiday",
                time,
                title,
                block,
                icon,
                dur: "30 min",
                days: null,
              })),
            ]);
            notify("Holiday starter added. Edit it to make it yours.");
          }}
        >
          ☀ Add a gentle holiday starter
        </button>
      )}
      <div className="studio-columns">
        <form onSubmit={applyPeriod}>
          <h3>Plan holidays or a different week</h3>
          <label className="field">
            Schedule
            <select
              className="input"
              value={chosen}
              onChange={(e) => setChosen(e.target.value)}
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <div className="row2">
            <label className="field">
              From
              <input
                className="input"
                type="date"
                required
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label className="field">
              Through (inclusive)
              <input
                className="input"
                type="date"
                required
                min={start}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
          </div>
          <button className="btn primary">Apply to dates</button>
          <p className="card-note">
            Resumes your normal schedule after the end date. A daily selection
            can override this period.
          </p>
        </form>
        <form onSubmit={saveSchedule}>
          <h3>{editing ? "Edit schedule" : "Create a new schedule"}</h3>
          <label className="field">
            Schedule name
            <input
              className="input"
              required
              maxLength={48}
              value={name}
              placeholder="Winter break, internship, exam week…"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {!editing && (
            <label className="field">
              Start from
              <select
                className="input"
                value={copy}
                onChange={(e) => setCopy(e.target.value)}
              >
                <option value="blank">Blank schedule</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="schedule-check">
            <input
              type="checkbox"
              checked={pause}
              onChange={(e) => setPause(e.target.checked)}
            />
            Pause timetable classes for this schedule
          </label>
          <button className="btn primary">
            {editing ? "Save schedule" : "Create schedule"}
          </button>
          {editing && (
            <button
              className="btn soft"
              type="button"
              onClick={() => {
                setEditing(null);
                setName("");
              }}
            >
              Cancel
            </button>
          )}
          <p className="card-note">
            Select your schedule above, then use Edit routine to add, change or
            remove activities.
          </p>
        </form>
      </div>
      {error && (
        <p role="alert" className="form-err">
          {error}
        </p>
      )}
      {(profile.schedulePeriods || []).map((period) => (
        <div className="schedule-period" key={period.id}>
          <span>
            <b>
              {plans.find((p) => p.id === period.plan)?.label || "Schedule"}
            </b>
            <br />
            {fmtLong(period.start)} → {fmtLong(period.end)}
          </span>
          <button
            className="btn soft"
            onClick={() =>
              saveProfile({
                schedulePeriods: profile.schedulePeriods.filter(
                  (p) => p.id !== period.id,
                ),
              })
            }
          >
            Remove period
          </button>
        </div>
      ))}
      {!!profile.customPlans?.length && (
        <div className="custom-plan-list">
          {profile.customPlans.map((p) => (
            <button
              className="btn soft"
              key={p.id}
              onClick={() => {
                setEditing(p.id);
                setName(p.label);
                setPause(!!p.pauseClasses);
              }}
            >
              <Icon n="pencil" s={14} />
              {p.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function AssessmentSchemeEditor() {
  const [termCount, setTermCount] = useState(3);
  const { grades, setGrades, notify } = useStore();
  const g = { ...DEFAULT_GRADES, ...grades };
  const [scope, setScope] = useState("theory"),
    [rows, setRows] = useState(() =>
      schemeFor({ id: "", lab: false }, g).map((r) => ({ ...r })),
    ),
    [error, setError] = useState("");
  function selectScope(value) {
    setScope(value);
    setError("");
    const course = COURSES.find((c) => c.id === value) || {
      id: "",
      lab: value === "practical",
    };
    setRows(schemeFor(course, g).map((r) => ({ ...r })));
  }
  function preset(kind) {
    const values =
      kind === "terms"
        ? [
            ["T1", 15],
            ["T2", 25],
            ["T3", 35],
            ["TA", 25],
          ]
        : kind === "midfinal"
          ? [
              ["Midterm", 30],
              ["Final", 50],
              ["Coursework", 20],
            ]
          : [
              ["Lab work", 40],
              ["Practical exam", 40],
              ["Viva", 20],
            ];
    setRows(
      values.map(([label, weight]) => ({
        id: rows.find((r) => r.label === label)?.id || "assessment-" + uid(),
        label,
        max: weight,
        weight,
      })),
    );
  }
  function save(e) {
    e.preventDefault();
    const message = schemeErrors(rows);
    if (message) {
      setError(message);
      return;
    }
    const clean = rows.map((r) => ({
      ...r,
      label: r.label.trim(),
      max: Number(r.max),
      weight: Number(r.weight),
    }));
    const patch =
      scope === "theory"
        ? { theoryScheme: clean }
        : scope === "practical"
          ? { labScheme: clean }
          : { subjectSchemes: { ...g.subjectSchemes, [scope]: clean } };
    setGrades({ ...g, ...patch });
    setError("");
    notify("Marking scheme saved. Existing marks are preserved.");
  }
  return (
    <section className="card assessment-studio">
      <div className="card-h">
        <Icon n="award" />
        <h2>Your exams, your rules</h2>
        <span className="studio-tag">Flexible grading</span>
      </div>
      <p className="muted">
        Choose any number of terms. Maximum marks are the marks on the paper;
        weight is its contribution to the final result.
      </p>
      <label className="field">
        Edit marking scheme for
        <select
          className="input"
          value={scope}
          onChange={(e) => selectScope(e.target.value)}
        >
          <option value="theory">All theory subjects</option>
          <option value="practical">All practical subjects</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — individual scheme
            </option>
          ))}
        </select>
      </label>
      <div className="preset-bar">
        <span>Start with:</span>
        <button className="btn soft" onClick={() => preset("terms")}>
          3 terms + assessment
        </button>
        <button className="btn soft" onClick={() => preset("midfinal")}>
          Midterm + final
        </button>
        <button className="btn soft" onClick={() => preset("lab")}>
          Practical + viva
        </button>
      </div>
      {(scope === "practical" || COURSES.find((c) => c.id === scope)?.lab) && (
        <div className="practical-terms">
          <label className="field">
            Number of practical terms
            <input
              className="input"
              type="number"
              min="1"
              max="12"
              value={termCount}
              onChange={(e) => setTermCount(e.target.value)}
            />
          </label>
          <button
            className="btn soft"
            onClick={() => setRows(practicalTermScheme(termCount, rows))}
          >
            Create practical exams by term
          </button>
          <p className="card-note">
            One practical exam per term. Edit each paper's marks and weight
            below, then save.
          </p>
        </div>
      )}
      <form onSubmit={save}>
        <div className="scheme-rows">
          {rows.map((row, index) => (
            <div className="scheme-row" key={row.id}>
              <label>
                Assessment name
                <input
                  className="input"
                  required
                  value={row.label}
                  onChange={(e) =>
                    setRows(
                      rows.map((r, i) =>
                        i === index ? { ...r, label: e.target.value } : r,
                      ),
                    )
                  }
                />
              </label>
              <label>
                Out of
                <input
                  className="input"
                  type="number"
                  min="0.01"
                  step="any"
                  required
                  value={row.max}
                  onChange={(e) =>
                    setRows(
                      rows.map((r, i) =>
                        i === index ? { ...r, max: e.target.value } : r,
                      ),
                    )
                  }
                />
              </label>
              <label>
                Weight %
                <input
                  className="input"
                  type="number"
                  min="0.01"
                  max="100"
                  step="any"
                  required
                  value={row.weight}
                  onChange={(e) =>
                    setRows(
                      rows.map((r, i) =>
                        i === index ? { ...r, weight: e.target.value } : r,
                      ),
                    )
                  }
                />
              </label>
              <button
                className="icon-btn"
                type="button"
                aria-label={"Remove " + row.label}
                onClick={() => setRows(rows.filter((_, i) => i !== index))}
              >
                <Icon n="x" />
              </button>
            </div>
          ))}
        </div>
        <div className="preset-bar">
          <button
            className="btn soft"
            type="button"
            onClick={() =>
              setRows([
                ...rows,
                { id: "assessment-" + uid(), label: "", max: 100, weight: 10 },
              ])
            }
          >
            + Add assessment
          </button>
          <b>
            Total weight:{" "}
            {rows.reduce((n, r) => n + (Number(r.weight) || 0), 0)}%
          </b>
          <button className="btn primary">Save scheme</button>
        </div>
        {error && (
          <p className="form-err" role="alert">
            {error}
          </p>
        )}
      </form>
      <p className="card-note">
        Renaming keeps the assessment's marks. Removing an assessment or
        choosing a different preset excludes it from calculations but keeps its
        old marks in your data. Review existing marks when changing a maximum.
      </p>
      {!["theory", "practical"].includes(scope) &&
        g.subjectSchemes?.[scope] && (
          <button
            className="btn soft"
            onClick={() => {
              const next = { ...g.subjectSchemes };
              delete next[scope];
              setGrades({ ...g, subjectSchemes: next });
              const c = COURSES.find((c) => c.id === scope);
              setRows(schemeFor(c, { ...g, subjectSchemes: next }));
              notify("Using shared marking scheme");
            }}
          >
            Use shared scheme for this subject
          </button>
        )}
    </section>
  );
}

function SubjectAssessments({ course }) {
  const { grades, setGrades, exams, setExams, notify } = useStore();
  const g = { ...DEFAULT_GRADES, ...grades },
    marks = g.marks[course.id] || {},
    rows = schemeFor(course, g);
  const setMark = (id, value) =>
    setGrades({
      ...g,
      marks: { ...g.marks, [course.id]: { ...marks, [id]: value } },
    });
  const setMakeup = (id, patch) =>
    setMark("makeups", {
      ...marks.makeups,
      [id]: { policy: "replace", ...marks.makeups?.[id], ...patch },
    });
  return (
    <div className="subject-assessments">
      {rows.map((row) => {
        const makeup = marks.makeups?.[row.id] || {},
          score = effectiveMark(marks[row.id], makeup, Number(row.max));
        return (
          <div key={row.id} className="assessment-mark">
            <label className="field">
              <span>
                {row.label}{" "}
                <small>
                  /{row.max} · {row.weight}%
                </small>
              </span>
              <input
                className="input num"
                type="number"
                min="0"
                max={row.max}
                step="any"
                aria-label={`${course.short} ${row.label} original marks`}
                value={marks[row.id] ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setMark(
                    row.id,
                    v === ""
                      ? ""
                      : Math.max(0, Math.min(Number(row.max), Number(v))),
                  );
                }}
              />
            </label>
            <details>
              <summary>Makeup / retake</summary>
              <label className="schedule-check">
                <input
                  type="checkbox"
                  checked={!!makeup.enabled}
                  onChange={(e) =>
                    setMakeup(row.id, { enabled: e.target.checked })
                  }
                />
                Use makeup mark
              </label>
              <label className="field">
                Makeup marks (out of {row.max})
                <input
                  className="input"
                  type="number"
                  min="0"
                  max={row.max}
                  step="any"
                  value={makeup.score ?? ""}
                  onChange={(e) =>
                    setMakeup(row.id, {
                      score:
                        e.target.value === ""
                          ? ""
                          : Math.max(
                              0,
                              Math.min(Number(row.max), Number(e.target.value)),
                            ),
                    })
                  }
                />
              </label>
              <p className="card-note">
                The makeup mark replaces the original, even if it is lower.
              </p>
              <label className="field">
                Makeup exam date
                <input
                  className="input"
                  type="date"
                  value={makeup.date || ""}
                  onChange={(e) => setMakeup(row.id, { date: e.target.value })}
                />
              </label>
              <button
                className="btn soft"
                disabled={!makeup.date}
                onClick={() => {
                  const id = `makeup-${course.id}-${row.id}`;
                  const entry = {
                    id,
                    course: course.id,
                    kind: "Makeup",
                    title: `${course.short}: ${row.label} makeup`,
                    date: makeup.date,
                    time: "",
                    venue: "",
                  };
                  setExams([...exams.filter((e) => e.id !== id), entry]);
                  notify("Makeup exam added to calendar");
                }}
              >
                Add / update exam date
              </button>
            </details>
            {makeup.enabled && (
              <small className="effective-mark">
                Counting: {score == null ? "pending" : score} / {row.max} ·
                original kept
              </small>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Pure helpers shared by the interface and regression tests.
function plannerPlans(profile, builtins) {
  return [
    ...builtins.map((p) => ({ ...p, pauseClasses: p.id === "holiday" })),
    ...(profile.customPlans || []),
  ];
}
function planForDate(profile, overrides, date) {
  if (overrides[date]) return overrides[date];
  const period = [...(profile.schedulePeriods || [])]
    .reverse()
    .find((p) => p.start <= date && date <= p.end);
  return period ? period.plan : "normal";
}
function schemeFor(course, grades) {
  const custom = grades.subjectSchemes?.[course.id];
  if (custom?.length) return custom;
  if (course.lab)
    return grades.labScheme?.length
      ? grades.labScheme
      : [{ id: "pct", label: "Practical total", max: 100, weight: 100 }];
  return grades.theoryScheme?.length
    ? grades.theoryScheme
    : grades.comps.map(([id, max]) => ({
        id,
        label: id,
        max: Number(max),
        weight: Number(max),
      }));
}
function schemeErrors(rows) {
  if (!rows.length) return "Add at least one assessment.";
  if (
    rows.some(
      (r) => !r.label.trim() || !(Number(r.max) > 0) || !(Number(r.weight) > 0),
    )
  )
    return "Each assessment needs a name, positive maximum marks and positive weight.";
  if (
    new Set(rows.map((r) => r.label.trim().toLowerCase())).size !== rows.length
  )
    return "Use a different name for each assessment.";
  if (Math.abs(rows.reduce((n, r) => n + Number(r.weight), 0) - 100) > 0.01)
    return "Assessment weights must add up to 100%.";
  return "";
}
function effectiveMark(original, makeup, max) {
  const valid = (value) =>
    value !== "" && value != null && Number.isFinite(Number(value));
  const clamp = (value) => Math.max(0, Math.min(max, Number(value)));
  const base = valid(original) ? clamp(original) : null;
  if (!makeup?.enabled || !valid(makeup.score)) return base;
  const retake = clamp(makeup.score);
  return retake;
}
function practicalTermScheme(count, existing = []) {
  const n = Math.max(1, Math.min(12, Math.floor(Number(count) || 1)));
  const weight = Math.floor(10000 / n) / 100;
  return Array.from({ length: n }, (_, i) => {
    const label = `T${i + 1} Practical`;
    return {
      id:
        existing.find((r) => r.label === label)?.id ||
        `practical-term-${i + 1}`,
      label,
      max: 100,
      weight:
        i === n - 1 ? Math.round((100 - weight * (n - 1)) * 100) / 100 : weight,
    };
  });
}
function calculateAssessments(course, grades) {
  const rows = schemeFor(course, grades),
    marks = grades.marks[course.id] || {};
  let got = 0,
    max = 0,
    remMax = 0;
  for (const row of rows) {
    const score = effectiveMark(
      marks[row.id],
      marks.makeups?.[row.id],
      Number(row.max),
    );
    if (score == null) remMax += Number(row.weight);
    else {
      got += (score / Number(row.max)) * Number(row.weight);
      max += Number(row.weight);
    }
  }
  return {
    got,
    max,
    remMax,
    total: max + remMax,
    pct: max ? (got / max) * 100 : null,
  };
}

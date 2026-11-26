import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecalls } from "../hooks/useRecalls";
import "./DiscoverWatchlist.css";

const CLASS_COLORS = ["#c0392b", "#e0a030", "#5b9a7a"]; // Class 1 is the most serious
const AGENCY_COLORS = ["#2f6f8f", "#8a6fb0"];
const AXIS_TICK = { fill: "var(--text)", fontSize: 13 };

export default function Discover() {
  // Empty strings = no filters, so insights cover every recall.
  const { insights, loading, error } = useRecalls("", "", "", "");

  if (loading) {
    return <p className="dw-state" role="status">Loading recall insights…</p>;
  }
  if (error) {
    return <p className="dw-state dw-error" role="alert">{error} Refresh the page to try again.</p>;
  }

  const classData = [
    { name: "Class 1", count: insights.class1Recalls },
    { name: "Class 2", count: insights.class2Recalls },
    { name: "Class 3", count: insights.class3Recalls },
  ];

  const agencyData = [
    { name: "FDA", count: insights.fdaRecalls },
    { name: "USDA", count: insights.usdaRecalls },
  ];

  const topCategories = Object.entries(insights.categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <main className="dw-page">
      <header>
        <h1>Discover recall trends</h1>
        <p>See which foods, agencies and risk classes dominate current recalls.</p>
      </header>

      <div className="dw-stats">
        <div>
          <strong>{insights.totalRecalls}</strong>
          <span>total recalls</span>
        </div>
        <div>
          <strong>{insights.class1Recalls}</strong>
          <span>Class 1 (most serious)</span>
        </div>
        <div>
          <strong>{Object.keys(insights.categoryCounts).length}</strong>
          <span>food categories</span>
        </div>
      </div>

      {insights.totalRecalls === 0 ? (
        <p className="dw-empty">No recalls were returned, so there is nothing to chart yet.</p>
      ) : (
        <div className="dw-grid">
          <section aria-label="Recalls by classification">
            <h2>Recalls by classification</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={classData}>
                <XAxis dataKey="name" tick={AXIS_TICK} />
                <YAxis allowDecimals={false} tick={AXIS_TICK} />
                <Tooltip />
                <Bar dataKey="count" name="Recalls">
                  {classData.map((entry, i) => (
                    <Cell key={entry.name} fill={CLASS_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section aria-label="Recalls by agency">
            <h2>Recalls by agency</h2>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={agencyData} dataKey="count" nameKey="name" innerRadius={55} outerRadius={90} label>
                  {agencyData.map((entry, i) => (
                    <Cell key={entry.name} fill={AGENCY_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </section>

          <section className="dw-wide" aria-label="Top food categories">
            <h2>Top food categories</h2>
            <ResponsiveContainer width="100%" height={Math.max(220, topCategories.length * 36)}>
              <BarChart data={topCategories} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" allowDecimals={false} tick={AXIS_TICK} />
                <YAxis type="category" dataKey="name" width={150} tick={AXIS_TICK} />
                <Tooltip />
                <Bar dataKey="count" name="Recalls" fill="#2f6f8f" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      )}

      <footer className="dw-attribution">
        Data from <a href="https://dailyfoodrecalls.com">Daily Food Recalls</a>, licensed under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </footer>
    </main>
  );
}
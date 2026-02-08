"use client";

import { useState } from "react";

export default function Analyzer() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runAudit() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/site-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteUrl: url })
      });

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Hata oluştu" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Site Audit</h2>

      <input
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={runAudit} disabled={!url || loading}>
        {loading ? "Analiz ediliyor..." : "Analiz Et"}
      </button>

      {result && (
        <pre style={{ marginTop: 16 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

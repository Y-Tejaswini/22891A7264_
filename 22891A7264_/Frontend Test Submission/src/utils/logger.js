// logger middleware: sends logs to evaluation API and stores locally for display
export async function Log(stack, level, pkg, message) {
  const payload = { stack, level, package: pkg, message };
  // store to localStorage first for immediate UI feedback
  try {
    const key = 'appLogs';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ id: crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), time: new Date().toISOString(), stack, level, package: pkg, message });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch(e){}

  try {
    const res = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
    return { error: true, message: 'non-200' };
  } catch (err) {
    return { error: true, message: 'network-failed' };
  }
}

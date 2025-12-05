import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      alert("Please enter both phone/email and password.");
      return;
    }

    setLoading(true);
    // Simulate auth request - replace with real API call
    setTimeout(() => {
      try {
        localStorage.setItem("authToken", "demo-token");
      } catch (e) {
        // ignore
      }
      setLoading(false);
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow-soft">
        <h1 className="text-2xl font-bold mb-2 text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-muted-foreground">Phone or email</span>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="07xxxxxxxx or you@domain.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your password"
              required
            />
          </label>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="form-checkbox" /> Remember me
            </label>
            <a className="text-sm text-primary hover:underline" href="#">Forgot?</a>
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-95 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Get started</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

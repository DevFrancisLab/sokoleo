import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !identifier || !password) {
      alert("Please complete all fields.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      try {
        localStorage.setItem("authToken", "demo-token");
        localStorage.setItem("userName", name);
      } catch (e) {
        // ignore
      }
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow-soft">
        <h1 className="text-2xl font-bold mb-2 text-foreground">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign up to get access to market insights</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-muted-foreground">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jane Wambui"
              required
            />
          </label>

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
              placeholder="Choose a password"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Confirm password</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Repeat your password"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-95 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

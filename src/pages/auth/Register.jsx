import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebase/firebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    farmSize: "",
    cropType: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🌐 Detect Language
  const getCurrentLanguage = () => {
    const match = document.cookie.match(/googtrans=\/ta\/(\w+)/);
    return match ? match[1] : "ta";
  };

  // 📱 Format Phone
  const formatPhone = (phone) => {
    phone = phone.replace(/\D/g, "");

    if (phone.startsWith("91")) {
      return "+" + phone;
    }
    return "+91" + phone;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { name, phone, email, password, farmSize, cropType, location } = form;

    if (!name || !phone || !email || !password) {
      return setError("Please fill all required fields");
    }

    if (phone.length < 10) {
      return setError("Enter valid phone number");
    }

    try {
      setLoading(true);

      // 🔐 Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const language = getCurrentLanguage();
      const formattedPhone = formatPhone(phone);

      // ☁️ Save in Firebase
      await set(ref(database, "users/" + user.uid), {
        name,
        phone: formattedPhone,
        email,
        farmSize,
        cropType,
        location,
        language,
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🌱</h2>
        <p style={styles.subtitle}>Join Smart Agri Platform</p>

        <form onSubmit={handleRegister} style={styles.form}>
          {/* Personal Details */}
          <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} style={styles.input} />
          <input name="email" placeholder="Email Address" onChange={handleChange} style={styles.input} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          {/* Land Details */}
          <input name="farmSize" placeholder="Farm Size (in acres)" onChange={handleChange} style={styles.input} />
          <input name="cropType" placeholder="Crop Type (e.g. Paddy, Wheat)" onChange={handleChange} style={styles.input} />
          <input name="location" placeholder="Location (Village/District)" onChange={handleChange} style={styles.input} />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
  },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#43e97b",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#43e97b",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
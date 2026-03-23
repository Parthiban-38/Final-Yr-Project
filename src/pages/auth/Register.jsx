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

  // 🌐 Detect Language from Google Translate
  const getCurrentLanguage = () => {
    const match = document.cookie.match(/googtrans=\/ta\/(\w+)/);
    return match ? match[1] : "ta"; // default Tamil
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📱 Format Phone for Twilio
  const formatPhone = (phone) => {
    phone = phone.replace(/\D/g, ""); // remove non-numbers

    if (phone.startsWith("91")) {
      return "+" + phone;
    }
    return "+91" + phone;
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

      const language = getCurrentLanguage(); // 🌐 detect language
      const formattedPhone = formatPhone(phone); // 📱 format phone

      // ☁️ Save in Firebase
      await set(ref(database, "users/" + user.uid), {
        name,
        phone: formattedPhone,
        email,
        farmSize,
        cropType,
        location,
        language, // 🔥 IMPORTANT for SMS + Voice
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    marginBottom: "20px",
    color: "gray",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  footerText: {
    marginTop: "10px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};
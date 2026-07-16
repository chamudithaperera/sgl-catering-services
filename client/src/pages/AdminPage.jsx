import { useEffect, useState } from "react";
import { Camera, LayoutPanelLeft, LogOut, PackageSearch, Settings2, Sparkles } from "lucide-react";
import { api } from "../lib/api";

const initialServiceForm = {
  title: "",
  description: "",
  icon: "Sparkles",
  sortOrder: 0,
};

const initialFoodForm = {
  name: "",
  summary: "",
  priceLabel: "",
  includedItems: "",
  featured: false,
  ctaLabel: "මිල විමසන්න",
  sortOrder: 0,
};

const initialRentalForm = {
  name: "",
  description: "",
  category: "",
  imageUrl: "/assets/hero-buffet.jpg",
  priceLabel: "",
  availableQuantity: 0,
  status: "ලබාගත හැකියි",
  sortOrder: 0,
};

const initialGalleryForm = {
  title: "",
  category: "",
  imageUrl: "/assets/hero-buffet.jpg",
  featured: false,
  sortOrder: 0,
};

const tabs = [
  { key: "services", label: "සේවාවන්", icon: LayoutPanelLeft },
  { key: "foodPackages", label: "ආහාර පැකේජ", icon: Sparkles },
  { key: "rentalItems", label: "කුලී උපකරණ", icon: PackageSearch },
  { key: "galleryItems", label: "ගැලරි", icon: Camera },
];

function adminRequest(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function uploadImage(token, file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post("/admin/upload", formData, adminRequest(token));
  return response.data.url;
}

export function AdminPage() {
  const [token, setToken] = useState(() => window.localStorage.getItem("sgl-admin-token") || "");
  const [loginForm, setLoginForm] = useState({
    email: "admin@sglcateringservice.lk",
    password: "Admin@123",
  });
  const [activeTab, setActiveTab] = useState("services");
  const [dashboard, setDashboard] = useState(null);
  const [services, setServices] = useState([]);
  const [foodPackages, setFoodPackages] = useState([]);
  const [rentalItems, setRentalItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [foodForm, setFoodForm] = useState(initialFoodForm);
  const [rentalForm, setRentalForm] = useState(initialRentalForm);
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    loadAdminData(token).catch((error) => {
      console.error(error);
      setErrorMessage("Admin data ලබාගැනීමේ දෝෂයක් ඇතිවිය.");
    });
  }, [token]);

  async function loadAdminData(activeToken) {
    const requestConfig = adminRequest(activeToken);
    const [dashboardResponse, servicesResponse, foodResponse, rentalResponse, galleryResponse] = await Promise.all([
      api.get("/admin/dashboard", requestConfig),
      api.get("/admin/services", requestConfig),
      api.get("/admin/food-packages", requestConfig),
      api.get("/admin/rental-items", requestConfig),
      api.get("/admin/gallery-items", requestConfig),
    ]);

    setDashboard(dashboardResponse.data);
    setServices(servicesResponse.data);
    setFoodPackages(foodResponse.data);
    setRentalItems(rentalResponse.data);
    setGalleryItems(galleryResponse.data);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", loginForm);
      window.localStorage.setItem("sgl-admin-token", response.data.token);
      setToken(response.data.token);
      setStatusMessage("Admin dashboard එකට සාර්ථකව පිවිසුණා.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Login credentials වැරදියි.");
    } finally {
      setBusy(false);
    }
  }

  function resetForm(tabKey) {
    setEditingId(null);
    if (tabKey === "services") setServiceForm(initialServiceForm);
    if (tabKey === "foodPackages") setFoodForm(initialFoodForm);
    if (tabKey === "rentalItems") setRentalForm(initialRentalForm);
    if (tabKey === "galleryItems") setGalleryForm(initialGalleryForm);
  }

  function beginEdit(tabKey, item) {
    setActiveTab(tabKey);
    setEditingId(item.id);
    if (tabKey === "services") {
      setServiceForm(item);
    }
    if (tabKey === "foodPackages") {
      setFoodForm({
        ...item,
        includedItems: item.includedItems.join("\n"),
      });
    }
    if (tabKey === "rentalItems") {
      setRentalForm(item);
    }
    if (tabKey === "galleryItems") {
      setGalleryForm(item);
    }
  }

  async function handleSave(tabKey, event) {
    event.preventDefault();
    setBusy(true);
    setStatusMessage("");
    setErrorMessage("");

    const requestConfig = adminRequest(token);
    const endpoints = {
      services: "/admin/services",
      foodPackages: "/admin/food-packages",
      rentalItems: "/admin/rental-items",
      galleryItems: "/admin/gallery-items",
    };

    const forms = {
      services: serviceForm,
      foodPackages: {
        ...foodForm,
        includedItems: foodForm.includedItems,
      },
      rentalItems: rentalForm,
      galleryItems: galleryForm,
    };

    try {
      const endpoint = endpoints[tabKey];
      if (editingId) {
        await api.put(`${endpoint}/${editingId}`, forms[tabKey], requestConfig);
      } else {
        await api.post(endpoint, forms[tabKey], requestConfig);
      }

      await loadAdminData(token);
      resetForm(tabKey);
      setStatusMessage("දත්ත සාර්ථකව සුරකින ලදී.");
    } catch (error) {
      console.error(error);
      setErrorMessage("දත්ත සුරැකීමේදී දෝෂයක් ඇතිවිය.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(tabKey, id) {
    if (!window.confirm("මෙම item එක මකා දැමීමට අවශ්‍යද?")) {
      return;
    }

    const endpoints = {
      services: "/admin/services",
      foodPackages: "/admin/food-packages",
      rentalItems: "/admin/rental-items",
      galleryItems: "/admin/gallery-items",
    };

    try {
      await api.delete(`${endpoints[tabKey]}/${id}`, adminRequest(token));
      await loadAdminData(token);
      if (editingId === id) {
        resetForm(tabKey);
      }
      setStatusMessage("Item එක මකා දමන ලදී.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Item delete කිරීමේදී දෝෂයක් ඇතිවිය.");
    }
  }

  async function handleFileChange(tabKey, file) {
    if (!file) {
      return;
    }

    try {
      setBusy(true);
      const imageUrl = await uploadImage(token, file);
      if (tabKey === "rentalItems") {
        setRentalForm((current) => ({ ...current, imageUrl }));
      }
      if (tabKey === "galleryItems") {
        setGalleryForm((current) => ({ ...current, imageUrl }));
      }
      setStatusMessage("Image upload සාර්ථකයි.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Image upload කිරීමේදී දෝෂයක් ඇතිවිය.");
    } finally {
      setBusy(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("sgl-admin-token");
    setToken("");
    setDashboard(null);
    setStatusMessage("");
    setErrorMessage("");
  }

  if (!token) {
    return (
      <div className="login-shell">
        <form className="login-card" onSubmit={handleLogin}>
          <p>Local Admin Access</p>
          <h1>SGL Content Dashboard</h1>
          <p>සේවාවන්, ආහාර පැකේජ, කුලී උපකරණ සහ gallery content update කිරීම සඳහා.</p>
          <div className="form-stack">
            <label className="field">
              <span>Email හෝ username</span>
              <input
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                value={loginForm.email}
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                type="password"
                value={loginForm.password}
              />
            </label>
            {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
            <button className="primary-button" disabled={busy} type="submit">
              <Settings2 size={18} />
              {busy ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="site-container">
        <div className="admin-topbar">
          <div>
            <p>Admin Dashboard</p>
            <h1>SGL Catering Services</h1>
          </div>
          <div className="section-actions">
            <a className="ghost-button" href="/" rel="noreferrer">
              Public Website
            </a>
            <button className="danger-button" onClick={handleLogout} type="button">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {statusMessage ? <div className="status-message">{statusMessage}</div> : null}
        {errorMessage ? <div className="error-message">{errorMessage}</div> : null}

        <div className="admin-layout">
          <aside className="admin-panel admin-sidebar">
            <div>
              <h2>Sections</h2>
              <p>ඔබට අවශ්‍ය content area එක තෝරන්න.</p>
            </div>
            <div className="sidebar-nav">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    className={activeTab === tab.key ? "active" : ""}
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setStatusMessage("");
                      setErrorMessage("");
                    }}
                    type="button"
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="admin-content">
            <section className="admin-panel">
              <div className="admin-section-head">
                <div>
                  <h2>Dashboard Summary</h2>
                  <p>Current seeded content counts.</p>
                </div>
              </div>
              {dashboard ? (
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <strong>{dashboard.services}</strong>
                    <span>සේවා</span>
                  </div>
                  <div className="dashboard-card">
                    <strong>{dashboard.foodPackages}</strong>
                    <span>ආහාර පැකේජ</span>
                  </div>
                  <div className="dashboard-card">
                    <strong>{dashboard.rentalItems}</strong>
                    <span>කුලී උපකරණ</span>
                  </div>
                  <div className="dashboard-card">
                    <strong>{dashboard.galleryItems}</strong>
                    <span>ගැලරි images</span>
                  </div>
                </div>
              ) : null}
            </section>

            {activeTab === "services" ? (
              <section className="admin-card-grid">
                <form className="form-card" onSubmit={(event) => handleSave("services", event)}>
                  <h2>{editingId ? "සේවාව සංස්කරණය කරන්න" : "නව සේවාවක් එකතු කරන්න"}</h2>
                  <div className="form-stack">
                    <label className="field">
                      <span>සේවා නම</span>
                      <input
                        onChange={(event) => setServiceForm((current) => ({ ...current, title: event.target.value }))}
                        value={serviceForm.title}
                      />
                    </label>
                    <label className="field">
                      <span>විස්තරය</span>
                      <textarea
                        onChange={(event) =>
                          setServiceForm((current) => ({ ...current, description: event.target.value }))
                        }
                        value={serviceForm.description}
                      />
                    </label>
                    <div className="field-grid">
                      <label className="field">
                        <span>Icon key</span>
                        <input
                          onChange={(event) => setServiceForm((current) => ({ ...current, icon: event.target.value }))}
                          value={serviceForm.icon}
                        />
                      </label>
                      <label className="field">
                        <span>Sort order</span>
                        <input
                          onChange={(event) =>
                            setServiceForm((current) => ({ ...current, sortOrder: event.target.value }))
                          }
                          type="number"
                          value={serviceForm.sortOrder}
                        />
                      </label>
                    </div>
                    <div className="section-actions">
                      <button className="primary-button" disabled={busy} type="submit">
                        {editingId ? "Update" : "Save"}
                      </button>
                      <button className="ghost-button" onClick={() => resetForm("services")} type="button">
                        Reset
                      </button>
                    </div>
                  </div>
                </form>

                <div className="admin-panel">
                  <h2>Existing Services</h2>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>නම</th>
                        <th>Icon</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                          </td>
                          <td>{item.icon}</td>
                          <td>
                            <div className="table-actions">
                              <button className="ghost-button" onClick={() => beginEdit("services", item)} type="button">
                                Edit
                              </button>
                              <button
                                className="danger-button"
                                onClick={() => handleDelete("services", item.id)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {activeTab === "foodPackages" ? (
              <section className="admin-card-grid">
                <form className="form-card" onSubmit={(event) => handleSave("foodPackages", event)}>
                  <h2>{editingId ? "පැකේජය සංස්කරණය කරන්න" : "නව ආහාර පැකේජයක් එකතු කරන්න"}</h2>
                  <div className="form-stack">
                    <label className="field">
                      <span>පැකේජ නම</span>
                      <input
                        onChange={(event) => setFoodForm((current) => ({ ...current, name: event.target.value }))}
                        value={foodForm.name}
                      />
                    </label>
                    <label className="field">
                      <span>සාරාංශය</span>
                      <textarea
                        onChange={(event) => setFoodForm((current) => ({ ...current, summary: event.target.value }))}
                        value={foodForm.summary}
                      />
                    </label>
                    <div className="field-grid">
                      <label className="field">
                        <span>මිල label</span>
                        <input
                          onChange={(event) => setFoodForm((current) => ({ ...current, priceLabel: event.target.value }))}
                          value={foodForm.priceLabel}
                        />
                      </label>
                      <label className="field">
                        <span>CTA label</span>
                        <input
                          onChange={(event) => setFoodForm((current) => ({ ...current, ctaLabel: event.target.value }))}
                          value={foodForm.ctaLabel}
                        />
                      </label>
                    </div>
                    <label className="field">
                      <span>Included items (line by line)</span>
                      <textarea
                        onChange={(event) =>
                          setFoodForm((current) => ({ ...current, includedItems: event.target.value }))
                        }
                        value={foodForm.includedItems}
                      />
                    </label>
                    <div className="field-grid">
                      <label className="field">
                        <span>Featured</span>
                        <select
                          onChange={(event) =>
                            setFoodForm((current) => ({ ...current, featured: event.target.value === "true" }))
                          }
                          value={String(foodForm.featured)}
                        >
                          <option value="false">නැහැ</option>
                          <option value="true">ඔව්</option>
                        </select>
                      </label>
                      <label className="field">
                        <span>Sort order</span>
                        <input
                          onChange={(event) => setFoodForm((current) => ({ ...current, sortOrder: event.target.value }))}
                          type="number"
                          value={foodForm.sortOrder}
                        />
                      </label>
                    </div>
                    <div className="section-actions">
                      <button className="primary-button" disabled={busy} type="submit">
                        {editingId ? "Update" : "Save"}
                      </button>
                      <button className="ghost-button" onClick={() => resetForm("foodPackages")} type="button">
                        Reset
                      </button>
                    </div>
                  </div>
                </form>

                <div className="admin-panel">
                  <h2>Existing Food Packages</h2>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>පැකේජය</th>
                        <th>මිල</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodPackages.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.name}</strong>
                            <p>{item.summary}</p>
                          </td>
                          <td>{item.priceLabel}</td>
                          <td>
                            <div className="table-actions">
                              <button className="ghost-button" onClick={() => beginEdit("foodPackages", item)} type="button">
                                Edit
                              </button>
                              <button
                                className="danger-button"
                                onClick={() => handleDelete("foodPackages", item.id)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {activeTab === "rentalItems" ? (
              <section className="admin-card-grid">
                <form className="form-card" onSubmit={(event) => handleSave("rentalItems", event)}>
                  <h2>{editingId ? "කුලී උපකරණය සංස්කරණය කරන්න" : "නව කුලී උපකරණයක් එකතු කරන්න"}</h2>
                  <div className="form-stack">
                    <label className="field">
                      <span>නම</span>
                      <input
                        onChange={(event) => setRentalForm((current) => ({ ...current, name: event.target.value }))}
                        value={rentalForm.name}
                      />
                    </label>
                    <label className="field">
                      <span>විස්තරය</span>
                      <textarea
                        onChange={(event) =>
                          setRentalForm((current) => ({ ...current, description: event.target.value }))
                        }
                        value={rentalForm.description}
                      />
                    </label>
                    <div className="field-grid">
                      <label className="field">
                        <span>Category</span>
                        <input
                          onChange={(event) => setRentalForm((current) => ({ ...current, category: event.target.value }))}
                          value={rentalForm.category}
                        />
                      </label>
                      <label className="field">
                        <span>මිල label</span>
                        <input
                          onChange={(event) =>
                            setRentalForm((current) => ({ ...current, priceLabel: event.target.value }))
                          }
                          value={rentalForm.priceLabel}
                        />
                      </label>
                    </div>
                    <div className="field-grid">
                      <label className="field">
                        <span>Image URL</span>
                        <input
                          onChange={(event) => setRentalForm((current) => ({ ...current, imageUrl: event.target.value }))}
                          value={rentalForm.imageUrl}
                        />
                      </label>
                      <label className="field">
                        <span>Image upload</span>
                        <input onChange={(event) => handleFileChange("rentalItems", event.target.files?.[0])} type="file" />
                      </label>
                    </div>
                    <div className="field-grid">
                      <label className="field">
                        <span>ප්‍රමාණය</span>
                        <input
                          onChange={(event) =>
                            setRentalForm((current) => ({ ...current, availableQuantity: event.target.value }))
                          }
                          type="number"
                          value={rentalForm.availableQuantity}
                        />
                      </label>
                      <label className="field">
                        <span>Status</span>
                        <select
                          onChange={(event) => setRentalForm((current) => ({ ...current, status: event.target.value }))}
                          value={rentalForm.status}
                        >
                          <option value="ලබාගත හැකියි">ලබාගත හැකියි</option>
                          <option value="ලබාගත නොහැකියි">ලබාගත නොහැකියි</option>
                        </select>
                      </label>
                    </div>
                    <label className="field">
                      <span>Sort order</span>
                      <input
                        onChange={(event) => setRentalForm((current) => ({ ...current, sortOrder: event.target.value }))}
                        type="number"
                        value={rentalForm.sortOrder}
                      />
                    </label>
                    <div className="section-actions">
                      <button className="primary-button" disabled={busy} type="submit">
                        {editingId ? "Update" : "Save"}
                      </button>
                      <button className="ghost-button" onClick={() => resetForm("rentalItems")} type="button">
                        Reset
                      </button>
                    </div>
                  </div>
                </form>

                <div className="admin-panel">
                  <h2>Existing Rental Items</h2>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>මිල</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentalItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.name}</strong>
                            <p>{item.description}</p>
                          </td>
                          <td>{item.priceLabel}</td>
                          <td>
                            <div className="table-actions">
                              <button className="ghost-button" onClick={() => beginEdit("rentalItems", item)} type="button">
                                Edit
                              </button>
                              <button
                                className="danger-button"
                                onClick={() => handleDelete("rentalItems", item.id)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {activeTab === "galleryItems" ? (
              <section className="admin-card-grid">
                <form className="form-card" onSubmit={(event) => handleSave("galleryItems", event)}>
                  <h2>{editingId ? "Gallery item සංස්කරණය කරන්න" : "නව gallery item එකක් එකතු කරන්න"}</h2>
                  <div className="form-stack">
                    <label className="field">
                      <span>Title</span>
                      <input
                        onChange={(event) => setGalleryForm((current) => ({ ...current, title: event.target.value }))}
                        value={galleryForm.title}
                      />
                    </label>
                    <label className="field">
                      <span>Category</span>
                      <input
                        onChange={(event) => setGalleryForm((current) => ({ ...current, category: event.target.value }))}
                        value={galleryForm.category}
                      />
                    </label>
                    <div className="field-grid">
                      <label className="field">
                        <span>Image URL</span>
                        <input
                          onChange={(event) => setGalleryForm((current) => ({ ...current, imageUrl: event.target.value }))}
                          value={galleryForm.imageUrl}
                        />
                      </label>
                      <label className="field">
                        <span>Image upload</span>
                        <input onChange={(event) => handleFileChange("galleryItems", event.target.files?.[0])} type="file" />
                      </label>
                    </div>
                    <div className="field-grid">
                      <label className="field">
                        <span>Featured</span>
                        <select
                          onChange={(event) =>
                            setGalleryForm((current) => ({ ...current, featured: event.target.value === "true" }))
                          }
                          value={String(galleryForm.featured)}
                        >
                          <option value="false">නැහැ</option>
                          <option value="true">ඔව්</option>
                        </select>
                      </label>
                      <label className="field">
                        <span>Sort order</span>
                        <input
                          onChange={(event) =>
                            setGalleryForm((current) => ({ ...current, sortOrder: event.target.value }))
                          }
                          type="number"
                          value={galleryForm.sortOrder}
                        />
                      </label>
                    </div>
                    <div className="section-actions">
                      <button className="primary-button" disabled={busy} type="submit">
                        {editingId ? "Update" : "Save"}
                      </button>
                      <button className="ghost-button" onClick={() => resetForm("galleryItems")} type="button">
                        Reset
                      </button>
                    </div>
                  </div>
                </form>

                <div className="admin-panel">
                  <h2>Existing Gallery Items</h2>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {galleryItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.title}</strong>
                            <p>{item.imageUrl}</p>
                          </td>
                          <td>{item.category}</td>
                          <td>
                            <div className="table-actions">
                              <button className="ghost-button" onClick={() => beginEdit("galleryItems", item)} type="button">
                                Edit
                              </button>
                              <button
                                className="danger-button"
                                onClick={() => handleDelete("galleryItems", item.id)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

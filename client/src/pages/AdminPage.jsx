import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  Bell,
  Boxes,
  Camera,
  CheckCircle2,
  ClipboardList,
  GalleryHorizontalEnd,
  Grid2X2,
  Home,
  ImageUp,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  PackageCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { api } from "../lib/api";

const siteConfigForm = {
  companyName: "",
  heroBadge: "",
  heroTitleLineOne: "",
  heroTitleLineTwo: "",
  heroDescription: "",
  aboutHeading: "",
  aboutIntro: "",
  aboutBody: "",
  contactHeading: "",
  contactDescription: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  businessHours: "",
  mapUrl: "",
  facebookUrl: "",
  instagramUrl: "",
};

const resourceConfigs = [
  {
    key: "siteConfig",
    label: "Site Settings",
    eyebrow: "Contact details, hero copy, about copy, and social links",
    endpoint: "/admin/site-config",
    icon: Settings2,
    singleton: true,
    form: siteConfigForm,
    fields: [
      { name: "companyName", label: "Company name" },
      { name: "heroBadge", label: "Hero badge" },
      { name: "heroTitleLineOne", label: "Hero title line 1" },
      { name: "heroTitleLineTwo", label: "Hero title line 2" },
      { name: "heroDescription", label: "Hero description", type: "textarea" },
      { name: "aboutHeading", label: "About heading" },
      { name: "aboutIntro", label: "About intro", type: "textarea" },
      { name: "aboutBody", label: "About body", type: "textarea" },
      { name: "contactHeading", label: "Contact heading" },
      { name: "contactDescription", label: "Contact description", type: "textarea" },
      { name: "phone", label: "Phone" },
      { name: "whatsapp", label: "WhatsApp" },
      { name: "email", label: "Email", type: "email" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "businessHours", label: "Business hours" },
      { name: "mapUrl", label: "Map URL" },
      { name: "facebookUrl", label: "Facebook URL" },
      { name: "instagramUrl", label: "Instagram URL" },
    ],
    columns: [
      { name: "companyName", label: "Company" },
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
    ],
  },
  {
    key: "benefits",
    label: "Benefits",
    eyebrow: "Homepage trust and value cards",
    endpoint: "/admin/benefits",
    icon: ShieldCheck,
    form: { title: "", description: "", icon: "ShieldCheck", sortOrder: 0 },
    fields: [
      { name: "title", label: "Title" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Lucide icon key" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "title", label: "Title" },
      { name: "icon", label: "Icon" },
      { name: "sortOrder", label: "Order" },
    ],
  },
  {
    key: "services",
    label: "Services",
    eyebrow: "Website service cards and offer categories",
    endpoint: "/admin/services",
    icon: Grid2X2,
    form: { title: "", description: "", icon: "Sparkles", sortOrder: 0 },
    fields: [
      { name: "title", label: "Service name" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "icon", label: "Lucide icon key" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "title", label: "Service" },
      { name: "icon", label: "Icon" },
      { name: "sortOrder", label: "Order" },
    ],
  },
  {
    key: "foodPackages",
    label: "Food Packages",
    eyebrow: "Catering package names, items, CTAs, and pricing labels",
    endpoint: "/admin/food-packages",
    icon: Utensils,
    form: {
      name: "",
      summary: "",
      priceLabel: "",
      includedItems: "",
      featured: false,
      ctaLabel: "Ask price",
      sortOrder: 0,
    },
    fields: [
      { name: "name", label: "Package name" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "priceLabel", label: "Price label" },
      { name: "includedItems", label: "Included items", type: "lines" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "ctaLabel", label: "CTA label" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "name", label: "Package" },
      { name: "priceLabel", label: "Price" },
      { name: "featured", label: "Featured" },
    ],
  },
  {
    key: "rentalItems",
    label: "Rental Items",
    eyebrow: "Equipment inventory, categories, quantities, and images",
    endpoint: "/admin/rental-items",
    icon: Boxes,
    form: {
      name: "",
      description: "",
      category: "",
      imageUrl: "/assets/sgl-images/hero-buffet.jpg",
      priceLabel: "",
      availableQuantity: 0,
      status: "Available",
      sortOrder: 0,
    },
    fields: [
      { name: "name", label: "Item name" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "category", label: "Category" },
      { name: "imageUrl", label: "Image URL", type: "image" },
      { name: "priceLabel", label: "Price label" },
      { name: "availableQuantity", label: "Available quantity", type: "number" },
      { name: "status", label: "Status" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "name", label: "Item" },
      { name: "category", label: "Category" },
      { name: "priceLabel", label: "Price" },
      { name: "availableQuantity", label: "Qty" },
    ],
  },
  {
    key: "rentalPrices",
    label: "Pricing",
    eyebrow: "Quick price list rows for rental equipment",
    endpoint: "/admin/rental-prices",
    icon: BadgeDollarSign,
    form: { item: "", priceLabel: "", sortOrder: 0 },
    fields: [
      { name: "item", label: "Item" },
      { name: "priceLabel", label: "Price label" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "item", label: "Item" },
      { name: "priceLabel", label: "Price" },
      { name: "sortOrder", label: "Order" },
    ],
  },
  {
    key: "rentalPackages",
    label: "Rental Packages",
    eyebrow: "Bundle offers for event equipment rental",
    endpoint: "/admin/rental-packages",
    icon: PackageCheck,
    form: { name: "", summary: "", items: "", ctaLabel: "Ask price", sortOrder: 0 },
    fields: [
      { name: "name", label: "Package name" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "items", label: "Included items", type: "lines" },
      { name: "ctaLabel", label: "CTA label" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "name", label: "Package" },
      { name: "items", label: "Items" },
      { name: "sortOrder", label: "Order" },
    ],
  },
  {
    key: "galleryItems",
    label: "Gallery",
    eyebrow: "Gallery images, categories, and featured placement",
    endpoint: "/admin/gallery-items",
    icon: Camera,
    form: {
      title: "",
      category: "",
      imageUrl: "/assets/sgl-images/hero-buffet.jpg",
      featured: false,
      sortOrder: 0,
    },
    fields: [
      { name: "title", label: "Title" },
      { name: "category", label: "Category" },
      { name: "imageUrl", label: "Image URL", type: "image" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "title", label: "Title" },
      { name: "category", label: "Category" },
      { name: "featured", label: "Featured" },
    ],
  },
  {
    key: "reviews",
    label: "Reviews",
    eyebrow: "Customer testimonials and ratings",
    endpoint: "/admin/reviews",
    icon: Star,
    form: { customerName: "", eventType: "", rating: 5, quote: "", sortOrder: 0 },
    fields: [
      { name: "customerName", label: "Customer name" },
      { name: "eventType", label: "Event type" },
      { name: "rating", label: "Rating", type: "number", min: 1, max: 5 },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "customerName", label: "Customer" },
      { name: "eventType", label: "Event" },
      { name: "rating", label: "Rating" },
    ],
  },
  {
    key: "contactMessages",
    label: "Messages",
    eyebrow: "Messages submitted from the website contact form",
    endpoint: "/admin/contact-messages",
    icon: MessageSquareText,
    readOnly: true,
    form: {},
    fields: [],
    columns: [
      { name: "customerName", label: "Name" },
      { name: "phone", label: "Phone" },
      { name: "eventType", label: "Event" },
      { name: "message", label: "Message" },
      { name: "serviceNeeded", label: "Service" },
      { name: "guestCount", label: "Guests" },
      { name: "location", label: "Location" },
      { name: "createdAt", label: "Received" },
    ],
  },
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  ...resourceConfigs.filter((config) => config.key === "contactMessages"),
  ...resourceConfigs.filter((config) => config.key !== "contactMessages"),
];

function buildInitialForms() {
  return resourceConfigs.reduce((forms, config) => {
    forms[config.key] = { ...config.form };
    return forms;
  }, {});
}

function buildInitialRecords() {
  return resourceConfigs.reduce((records, config) => {
    records[config.key] = [];
    return records;
  }, {});
}

function adminRequest(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function normalizeForForm(config, item) {
  return config.fields.reduce((form, field) => {
    const value = item?.[field.name] ?? config.form[field.name] ?? "";
    form[field.name] = field.type === "lines" && Array.isArray(value) ? value.join("\n") : value;
    return form;
  }, {});
}

function normalizePayload(config, form) {
  return config.fields.reduce((payload, field) => {
    payload[field.name] = form[field.name];
    return payload;
  }, {});
}

function formatCell(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && value.includes("T") && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toLocaleString();
  }
  return value ?? "-";
}

async function uploadImage(token, file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post("/admin/upload", formData, adminRequest(token));
  return response.data.url;
}

export function AdminPage() {
  const [token, setToken] = useState(() => window.localStorage.getItem("sgl-admin-token") || "");
  const [loginForm, setLoginForm] = useState({ email: "sgladmin", password: "" });
  const [activeKey, setActiveKey] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [records, setRecords] = useState(buildInitialRecords);
  const [forms, setForms] = useState(buildInitialForms);
  const [editingIds, setEditingIds] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const activeConfig = useMemo(() => resourceConfigs.find((config) => config.key === activeKey), [activeKey]);
  const totalRecords = useMemo(
    () => Object.values(dashboard || {}).reduce((total, value) => total + Number(value || 0), 0),
    [dashboard],
  );

  const loadAdminData = useCallback(async (activeToken) => {
    const requestConfig = adminRequest(activeToken);
    const [dashboardResponse, ...resourceResponses] = await Promise.all([
      api.get("/admin/dashboard", requestConfig),
      ...resourceConfigs.map((config) => api.get(config.endpoint, requestConfig)),
    ]);

    const nextRecords = {};
    const nextForms = {};

    resourceConfigs.forEach((config, index) => {
      const data = resourceResponses[index].data;
      const rows = config.singleton ? (data ? [data] : []) : data;
      nextRecords[config.key] = rows;
      nextForms[config.key] = config.singleton && data ? normalizeForForm(config, data) : { ...config.form };
    });

    setDashboard(dashboardResponse.data);
    setRecords(nextRecords);
    setForms((current) => ({ ...current, ...nextForms }));
  }, []);

  useEffect(() => {
    if (!token) return;
    loadAdminData(token).catch((error) => {
      console.error(error);
      setErrorMessage("Could not load admin content. Please try again.");
    });
  }, [loadAdminData, token]);

  useEffect(() => {
    if (!token) return undefined;

    const intervalId = window.setInterval(() => {
      loadAdminData(token).catch((error) => {
        console.error(error);
      });
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, [loadAdminData, token]);

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", loginForm);
      window.localStorage.setItem("sgl-admin-token", response.data.token);
      setToken(response.data.token);
      setStatusMessage("Welcome back. Admin access is active.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please check your username and password.");
    } finally {
      setBusy(false);
    }
  }

  function selectSection(key) {
    setActiveKey(key);
    setMobileSidebarOpen(false);
    setStatusMessage("");
    setErrorMessage("");
  }

  function resetForm(config) {
    setEditingIds((current) => ({ ...current, [config.key]: null }));
    setForms((current) => ({ ...current, [config.key]: { ...config.form } }));
  }

  function beginEdit(config, item) {
    setActiveKey(config.key);
    setEditingIds((current) => ({ ...current, [config.key]: item.id }));
    setForms((current) => ({ ...current, [config.key]: normalizeForForm(config, item) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateField(config, field, value) {
    setForms((current) => ({
      ...current,
      [config.key]: {
        ...current[config.key],
        [field.name]: field.type === "boolean" ? value === "true" : value,
      },
    }));
  }

  async function handleSave(config, event) {
    event.preventDefault();
    setBusy(true);
    setStatusMessage("");
    setErrorMessage("");

    try {
      const payload = normalizePayload(config, forms[config.key]);
      if (config.singleton) {
        await api.put(config.endpoint, payload, adminRequest(token));
      } else if (editingIds[config.key]) {
        await api.put(`${config.endpoint}/${editingIds[config.key]}`, payload, adminRequest(token));
      } else {
        await api.post(config.endpoint, payload, adminRequest(token));
      }

      await loadAdminData(token);
      if (!config.singleton) resetForm(config);
      setStatusMessage(`${config.label} saved successfully.`);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Could not save ${config.label.toLowerCase()}. Check required fields and try again.`);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(config, item) {
    if (!window.confirm(`Delete "${item.name || item.title || item.customerName || item.item}"?`)) return;

    try {
      await api.delete(`${config.endpoint}/${item.id}`, adminRequest(token));
      await loadAdminData(token);
      if (editingIds[config.key] === item.id) resetForm(config);
      setStatusMessage(`${config.label} item deleted.`);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Could not delete ${config.label.toLowerCase()} item.`);
    }
  }

  async function handleFileChange(config, field, file) {
    if (!file) return;

    try {
      setBusy(true);
      const imageUrl = await uploadImage(token, file);
      updateField(config, field, imageUrl);
      setStatusMessage("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Image upload failed.");
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

  function renderField(config, field) {
    const value = forms[config.key]?.[field.name] ?? "";

    if (field.type === "textarea" || field.type === "lines") {
      return (
        <textarea
          onChange={(event) => updateField(config, field, event.target.value)}
          placeholder={field.type === "lines" ? "One item per line" : ""}
          value={value}
        />
      );
    }

    if (field.type === "boolean") {
      return (
        <select onChange={(event) => updateField(config, field, event.target.value)} value={String(value)}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      );
    }

    return (
      <>
        <input
          max={field.max}
          min={field.min}
          onChange={(event) => updateField(config, field, event.target.value)}
          type={field.type === "number" || field.type === "email" ? field.type : "text"}
          value={value}
        />
        {field.type === "image" ? (
          <div className="sgla-image-tools">
            <label>
              <ImageUp size={16} />
              <span>Upload</span>
              <input onChange={(event) => handleFileChange(config, field, event.target.files?.[0])} type="file" />
            </label>
            {value ? <img alt="" src={value} /> : null}
          </div>
        ) : null}
      </>
    );
  }

  if (!token) {
    return (
      <main className="sgla-login-page">
        <section className="sgla-login-card">
          <div className="sgla-login-brand">
            <span>
              <ShieldCheck size={22} />
            </span>
            <div>
              <strong>SGL Admin</strong>
              <p>Secure content control</p>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="sgla-login-copy">
              <p>Admin Panel</p>
              <h1>Sign in to manage the website</h1>
            </div>
            <label className="sgla-field">
              <span>Username</span>
              <input
                autoComplete="username"
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                value={loginForm.email}
              />
            </label>
            <label className="sgla-field">
              <span>Password</span>
              <input
                autoComplete="current-password"
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                type="password"
                value={loginForm.password}
              />
            </label>
            {errorMessage ? <div className="sgla-alert sgla-alert-error">{errorMessage}</div> : null}
            <button className="sgla-primary-button" disabled={busy} type="submit">
              <Save size={18} />
              {busy ? "Checking..." : "Login"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={`sgla-admin ${sidebarCollapsed ? "is-collapsed" : ""}`}>
      <button
        aria-label="Open admin navigation"
        className="sgla-mobile-menu"
        onClick={() => setMobileSidebarOpen(true)}
        type="button"
      >
        <Menu size={20} />
      </button>
      <aside className={`sgla-sidebar ${mobileSidebarOpen ? "is-open" : ""}`}>
        <div className="sgla-brand-row">
          <span className="sgla-brand-mark">
            <Sparkles size={20} />
          </span>
          <div className="sgla-sidebar-text">
            <strong>SGL Admin</strong>
            <p>Website management</p>
          </div>
          <button aria-label="Close menu" className="sgla-sidebar-close" onClick={() => setMobileSidebarOpen(false)} type="button">
            <X size={18} />
          </button>
        </div>

        <nav className="sgla-nav" aria-label="Admin sections">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                aria-label={item.label}
                className={activeKey === item.key ? "is-active" : ""}
                key={item.key}
                onClick={() => selectSection(item.key)}
                title={sidebarCollapsed ? item.label : undefined}
                type="button"
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.key === "contactMessages" && dashboard?.contactMessages ? <b>{dashboard.contactMessages}</b> : null}
              </button>
            );
          })}
        </nav>

        <div className="sgla-sidebar-footer">
          <button
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setSidebarCollapsed((current) => !current)}
            type="button"
          >
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            <span>{sidebarCollapsed ? "Expand" : "Collapse"}</span>
          </button>
          <button onClick={handleLogout} type="button">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <section className="sgla-workspace">
        <header className="sgla-topbar">
          <div>
            <p>{activeConfig?.eyebrow || "Control room for editable website content"}</p>
            <h1>{activeConfig?.label || "Dashboard"}</h1>
          </div>
          <div className="sgla-topbar-actions">
            <a href="/" target="_blank" rel="noreferrer">
              <Home size={17} />
              <span>Public site</span>
            </a>
            <button type="button">
              <Bell size={17} />
              <span>{dashboard?.contactMessages || 0}</span>
            </button>
          </div>
        </header>

        {statusMessage ? (
          <div className="sgla-alert sgla-alert-success">
            <CheckCircle2 size={18} />
            {statusMessage}
          </div>
        ) : null}
        {errorMessage ? (
          <div className="sgla-alert sgla-alert-error">
            <X size={18} />
            {errorMessage}
          </div>
        ) : null}

        {activeKey === "dashboard" ? (
          <section className="sgla-dashboard">
            <div className="sgla-stat-grid">
              <article>
                <LayoutDashboard size={22} />
                <span>Total records</span>
                <strong>{totalRecords}</strong>
              </article>
              <article>
                <Utensils size={22} />
                <span>Food packages</span>
                <strong>{dashboard?.foodPackages ?? "-"}</strong>
              </article>
              <article>
                <Boxes size={22} />
                <span>Rental inventory</span>
                <strong>{dashboard?.rentalItems ?? "-"}</strong>
              </article>
              <article>
                <MessageSquareText size={22} />
                <span>New messages</span>
                <strong>{dashboard?.contactMessages ?? "-"}</strong>
              </article>
            </div>
            <div className="sgla-dashboard-grid">
              <section className="sgla-panel">
                <div className="sgla-panel-head">
                  <div>
                    <p>Editable Content</p>
                    <h2>Website sections</h2>
                  </div>
                  <ClipboardList size={20} />
                </div>
                <div className="sgla-section-list">
                  {resourceConfigs
                    .filter((config) => !config.readOnly)
                    .map((config) => {
                      const Icon = config.icon;
                      return (
                        <button key={config.key} onClick={() => selectSection(config.key)} type="button">
                          <Icon size={18} />
                          <span>{config.label}</span>
                          <b>{config.singleton ? "Edit" : dashboard?.[config.key] ?? records[config.key]?.length ?? 0}</b>
                        </button>
                      );
                    })}
                </div>
              </section>
              <section className="sgla-panel">
                <div className="sgla-panel-head">
                  <div>
                    <p>Latest Messages</p>
                    <h2>Messages</h2>
                  </div>
                  <MessageSquareText size={20} />
                </div>
                <div className="sgla-message-list">
                  {(records.contactMessages || []).slice(0, 5).map((message) => (
                    <button key={message.id} onClick={() => selectSection("contactMessages")} type="button">
                      <strong>{message.customerName}</strong>
                      <span>{message.phone}</span>
                      <p>{message.message}</p>
                    </button>
                  ))}
                  {!records.contactMessages?.length ? <p className="sgla-muted">No messages yet.</p> : null}
                </div>
              </section>
            </div>
          </section>
        ) : null}

        {activeConfig ? (
          <section className="sgla-crud-grid">
            {!activeConfig.readOnly ? (
              <form className="sgla-panel sgla-form-panel" onSubmit={(event) => handleSave(activeConfig, event)}>
                <div className="sgla-panel-head">
                  <div>
                    <p>{editingIds[activeConfig.key] || activeConfig.singleton ? "Update record" : "Create record"}</p>
                    <h2>{activeConfig.label}</h2>
                  </div>
                  {editingIds[activeConfig.key] ? <Pencil size={20} /> : <Plus size={20} />}
                </div>
                <div className="sgla-form-grid">
                  {activeConfig.fields.map((field) => (
                    <label
                      className={`sgla-field ${field.type === "textarea" || field.type === "lines" ? "is-wide" : ""}`}
                      key={field.name}
                    >
                      <span>{field.label}</span>
                      {renderField(activeConfig, field)}
                    </label>
                  ))}
                </div>
                <div className="sgla-form-actions">
                  <button className="sgla-primary-button" disabled={busy} type="submit">
                    <Save size={17} />
                    {busy ? "Saving..." : activeConfig.singleton ? "Save settings" : editingIds[activeConfig.key] ? "Update" : "Create"}
                  </button>
                  {!activeConfig.singleton ? (
                    <button className="sgla-light-button" onClick={() => resetForm(activeConfig)} type="button">
                      Reset
                    </button>
                  ) : null}
                </div>
              </form>
            ) : null}

            <section className="sgla-panel sgla-table-panel">
              <div className="sgla-panel-head">
                <div>
                  <p>{activeConfig.readOnly ? "Read and clear" : "Manage records"}</p>
                  <h2>{activeConfig.readOnly ? "Website messages" : `Existing ${activeConfig.label}`}</h2>
                </div>
                {activeConfig.readOnly ? (
                  <button className="sgla-light-button" onClick={() => loadAdminData(token)} type="button">
                    Refresh
                  </button>
                ) : (
                  <GalleryHorizontalEnd size={20} />
                )}
              </div>
              <div className="sgla-table-wrap">
                <table className="sgla-table">
                  <thead>
                    <tr>
                      {activeConfig.columns.map((column) => (
                        <th key={column.name}>{column.label}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(records[activeConfig.key] || []).map((item) => (
                      <tr key={item.id || activeConfig.key}>
                        {activeConfig.columns.map((column) => (
                          <td className={column.name === "message" ? "sgla-message-cell" : ""} key={column.name}>
                            {column.name === "title" || column.name === "name" || column.name === "customerName" ? (
                              <strong>{formatCell(item[column.name])}</strong>
                            ) : (
                              formatCell(item[column.name])
                            )}
                          </td>
                        ))}
                        <td>
                          <div className="sgla-table-actions">
                            {!activeConfig.readOnly && !activeConfig.singleton ? (
                              <button onClick={() => beginEdit(activeConfig, item)} title="Edit" type="button">
                                <Pencil size={16} />
                              </button>
                            ) : null}
                            {!activeConfig.singleton ? (
                              <button onClick={() => handleDelete(activeConfig, item)} title="Delete" type="button">
                                <Trash2 size={16} />
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!records[activeConfig.key]?.length ? (
                      <tr>
                        <td colSpan={activeConfig.columns.length + 1}>
                          <div className="sgla-empty">
                            <PackageCheck size={20} />
                            <span>{activeConfig.key === "contactMessages" ? "No messages found." : "No records found."}</span>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        ) : null}
      </section>
    </main>
  );
}

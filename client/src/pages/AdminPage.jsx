import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Boxes,
  Camera,
  CheckCircle2,
  ClipboardList,
  GalleryHorizontalEnd,
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
    label: "Contact Details",
    eyebrow: "Phone, WhatsApp, email, address, hours, map, and social links",
    endpoint: "/admin/site-config",
    icon: Settings2,
    singleton: true,
    form: siteConfigForm,
    fields: [
      { name: "phone", label: "Phone" },
      { name: "whatsapp", label: "WhatsApp" },
      { name: "email", label: "Email", type: "email" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "businessHours", label: "Business hours" },
      { name: "mapUrl", label: "Map URL", type: "textarea" },
      { name: "facebookUrl", label: "Facebook URL" },
      { name: "instagramUrl", label: "Instagram URL" },
    ],
    columns: [
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
    ],
  },
  {
    key: "foodPackages",
    label: "Menus",
    eyebrow: "Food menus shown directly on the catering page",
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
      { name: "name", label: "Menu name" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "priceLabel", label: "Price label" },
      { name: "includedItems", label: "Included items", type: "lines" },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "ctaLabel", label: "CTA label" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "name", label: "Menu" },
      { name: "priceLabel", label: "Price" },
      { name: "featured", label: "Featured" },
    ],
  },
  {
    key: "rentalItems",
    label: "Items",
    eyebrow: "Equipment inventory, categories, prices, and images",
    endpoint: "/admin/rental-items",
    icon: Boxes,
    form: {
      name: "",
      category: "",
      imageUrl: "",
      priceLabel: "",
      sortOrder: 0,
    },
    fields: [
      { name: "name", label: "Item name" },
      { name: "category", label: "Category" },
      { name: "imageUrl", label: "Image URL", type: "image" },
      { name: "priceLabel", label: "Price label" },
      { name: "sortOrder", label: "Sort order", type: "number" },
    ],
    columns: [
      { name: "name", label: "Item" },
      { name: "category", label: "Category" },
      { name: "priceLabel", label: "Price" },
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
      { name: "isRead", label: "Status" },
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

const groupedSections = {
  catering: {
    label: "Catering",
    eyebrow: "Manage food menus",
    icon: Utensils,
    tabs: [{ key: "foodPackages", label: "Menus" }],
  },
  rental: {
    label: "Rental",
    eyebrow: "Manage rental inventory items",
    icon: Boxes,
    tabs: [{ key: "rentalItems", label: "Items" }],
  },
};

const popupCrudKeys = ["foodPackages", "rentalItems", "galleryItems", "reviews"];
const sortableKeys = popupCrudKeys;

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  ...resourceConfigs.filter((config) => config.key === "contactMessages"),
  ...resourceConfigs.filter((config) => config.key === "siteConfig"),
  { key: "catering", label: "Catering", icon: Utensils },
  { key: "rental", label: "Rental", icon: Boxes },
  ...resourceConfigs.filter((config) => ["galleryItems", "reviews"].includes(config.key)),
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

function isUnauthorizedError(error) {
  return error?.response?.status === 401;
}

function normalizeForForm(config, item) {
  return Object.keys(config.form).reduce((form, fieldName) => {
    const field = config.fields.find((candidate) => candidate.name === fieldName);
    const value = item?.[fieldName] ?? config.form[fieldName] ?? "";
    form[fieldName] = (field?.type === "lines" || field?.type === "bundleItems") && Array.isArray(value) ? value.join("\n") : value;
    return form;
  }, {});
}

function normalizePayload(config, form) {
  return Object.keys(config.form).reduce((payload, fieldName) => {
    payload[fieldName] = form[fieldName];
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

function renderCell(item, column) {
  if (column.name === "isRead") {
    return <span className={`sgla-status-chip ${item.isRead ? "is-read" : "is-unread"}`}>{item.isRead ? "Read" : "Unread"}</span>;
  }

  const value = formatCell(item[column.name]);

  if (column.name === "title" || column.name === "name" || column.name === "customerName") {
    return <strong>{value}</strong>;
  }

  return value;
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not load image"));
    };
    image.src = objectUrl;
  });
}

async function optimizeImageBeforeUpload(file) {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }

  const image = await loadImageFromFile(file);
  const largestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = largestSide > 1600 ? 1600 / largestSide : 1;
  const width = Math.round(image.naturalWidth * scale);
  const height = Math.round(image.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return file;
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.72));

  if (!blob || blob.size >= file.size) {
    return file;
  }

  const fileName = `${file.name.replace(/\.[^.]+$/, "")}.jpg`;

  return new File([blob], fileName, {
    lastModified: Date.now(),
    type: "image/jpeg",
  });
}

async function uploadImage(token, file) {
  const uploadFile = await optimizeImageBeforeUpload(file);
  const formData = new FormData();
  formData.append("image", uploadFile);
  const response = await api.post("/admin/upload", formData, adminRequest(token));
  return response.data.url;
}

export function AdminPage() {
  const [token, setToken] = useState(() => window.localStorage.getItem("sgl-admin-token") || "");
  const [loginForm, setLoginForm] = useState({ email: "sgladmin", password: "" });
  const [activeKey, setActiveKey] = useState("dashboard");
  const [activeGroupTabs, setActiveGroupTabs] = useState({
    catering: "foodPackages",
    rental: "rentalItems",
  });
  const [crudModalKey, setCrudModalKey] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [bundleDraft, setBundleDraft] = useState({ itemId: "", count: 1, price: "" });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [records, setRecords] = useState(buildInitialRecords);
  const [forms, setForms] = useState(buildInitialForms);
  const [editingIds, setEditingIds] = useState({});
  const [contactEditing, setContactEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const dragStateRef = useRef({ completed: false, originalRows: [] });
  const dirtyFormsRef = useRef({});
  const editingIdsRef = useRef({});
  const crudModalKeyRef = useRef("");
  const contactEditingRef = useRef(false);

  const activeResourceKey = groupedSections[activeKey]?.tabs.find((tab) => tab.key === activeGroupTabs[activeKey])?.key || activeKey;
  const activeGroup = groupedSections[activeKey];
  const activeConfig = useMemo(() => resourceConfigs.find((config) => config.key === activeResourceKey), [activeResourceKey]);
  const crudModalConfig = useMemo(() => resourceConfigs.find((config) => config.key === crudModalKey), [crudModalKey]);
  const usesPopupCrud = Boolean(activeConfig && popupCrudKeys.includes(activeConfig.key));
  const activeTitle = activeGroup?.label || activeConfig?.label || "Dashboard";
  const activeEyebrow = activeGroup?.eyebrow || activeConfig?.eyebrow || "Control room for editable website content";
  const totalRecords = useMemo(
    () =>
      Object.entries(dashboard || {})
        .filter(([key]) => !["unreadMessages", "benefits", "services", "rentalPrices"].includes(key))
        .reduce((total, [, value]) => total + Number(value || 0), 0),
    [dashboard],
  );

  const loadAdminData = useCallback(async (activeToken, { preserveActiveForms = false } = {}) => {
    const requestConfig = adminRequest(activeToken);
    const dashboardResponse = await api.get("/admin/dashboard", requestConfig);
    const resourceResponses = await Promise.all(resourceConfigs.map((config) => api.get(config.endpoint, requestConfig)));

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
    setForms((current) => {
      const mergedForms = { ...current };

      resourceConfigs.forEach((config) => {
        const formIsActive =
          dirtyFormsRef.current[config.key] ||
          Boolean(editingIdsRef.current[config.key]) ||
          crudModalKeyRef.current === config.key ||
          (config.key === "siteConfig" && contactEditingRef.current);

        mergedForms[config.key] = preserveActiveForms && formIsActive ? current[config.key] : nextForms[config.key];
      });

      return mergedForms;
    });
  }, []);

  useEffect(() => {
    editingIdsRef.current = editingIds;
    crudModalKeyRef.current = crudModalKey;
    contactEditingRef.current = contactEditing;
  }, [contactEditing, crudModalKey, editingIds]);

  useEffect(() => {
    if (!token) return;
    loadAdminData(token).catch((error) => {
      console.error(error);
      if (isUnauthorizedError(error)) {
        window.localStorage.removeItem("sgl-admin-token");
        setToken("");
        setDashboard(null);
        setStatusMessage("");
        setErrorMessage("Session expired. Please login again.");
        return;
      }
      setErrorMessage("Could not load admin content. Please try again.");
    });
  }, [loadAdminData, token]);

  useEffect(() => {
    if (!token) return undefined;

    const intervalId = window.setInterval(() => {
      loadAdminData(token, { preserveActiveForms: true }).catch((error) => {
        console.error(error);
        if (isUnauthorizedError(error)) {
          window.localStorage.removeItem("sgl-admin-token");
          setToken("");
          setDashboard(null);
          setStatusMessage("");
          setErrorMessage("Session expired. Please login again.");
        }
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
    dirtyFormsRef.current[config.key] = false;
    setEditingIds((current) => ({ ...current, [config.key]: null }));
    setForms((current) => ({ ...current, [config.key]: { ...config.form } }));
  }

  function openCreateModal(config) {
    resetForm(config);
    setBundleDraft({ itemId: "", count: 1, price: "" });
    setCrudModalKey(config.key);
    setStatusMessage("");
    setErrorMessage("");
  }

  function closeCrudModal() {
    if (crudModalConfig) {
      resetForm(crudModalConfig);
    }
    setCrudModalKey("");
    setBundleDraft({ itemId: "", count: 1, price: "" });
  }

  function beginEdit(config, item) {
    if (config.key === "foodPackages") {
      setActiveKey("catering");
      setActiveGroupTabs((current) => ({ ...current, catering: config.key }));
    } else if (config.key === "rentalItems") {
      setActiveKey("rental");
      setActiveGroupTabs((current) => ({ ...current, rental: config.key }));
    } else {
      setActiveKey(config.key);
    }
    dirtyFormsRef.current[config.key] = false;
    setEditingIds((current) => ({ ...current, [config.key]: item.id }));
    setForms((current) => ({ ...current, [config.key]: normalizeForForm(config, item) }));
    if (popupCrudKeys.includes(config.key)) {
      setCrudModalKey(config.key);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateField(config, field, value) {
    dirtyFormsRef.current[config.key] = true;
    setForms((current) => ({
      ...current,
      [config.key]: {
        ...current[config.key],
        [field.name]: field.type === "boolean" ? value === "true" : value,
      },
    }));
  }

  function addBundleItem(config, field) {
    const selectedItem = records.rentalItems.find((item) => String(item.id) === String(bundleDraft.itemId));

    if (!selectedItem) {
      setErrorMessage("Select a rental item before adding it to the bundle.");
      return;
    }

    const line = `${selectedItem.name} x ${bundleDraft.count || 1}${bundleDraft.price ? ` - ${bundleDraft.price}` : ""}`;
    const currentValue = forms[config.key]?.[field.name] || "";
    updateField(config, field, [currentValue, line].filter(Boolean).join("\n"));
    setBundleDraft({ itemId: "", count: 1, price: "" });
    setErrorMessage("");
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

      dirtyFormsRef.current[config.key] = false;
      await loadAdminData(token);
      if (!config.singleton) resetForm(config);
      if (config.key === "siteConfig") {
        setContactEditing(false);
      }
      if (crudModalKey === config.key) {
        setCrudModalKey("");
      }
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

  async function handleToggleMessageRead(item) {
    try {
      await api.patch(
        `/admin/contact-messages/${item.id}/read`,
        { isRead: !item.isRead },
        adminRequest(token),
      );
      await loadAdminData(token);
      setStatusMessage(`Message marked as ${item.isRead ? "unread" : "read"}.`);
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not update message status.");
    }
  }

  function reorderRows(currentRows, sourceId, targetId) {
    const sourceIndex = currentRows.findIndex((item) => item.id === sourceId);
    const targetIndex = currentRows.findIndex((item) => item.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return currentRows;

    const nextRows = [...currentRows];
    const [movedItem] = nextRows.splice(sourceIndex, 1);
    nextRows.splice(targetIndex, 0, movedItem);
    return nextRows.map((item, index) => ({ ...item, sortOrder: index + 1 }));
  }

  function handleDragStart(config, item) {
    if (!sortableKeys.includes(config.key)) return;

    dragStateRef.current = {
      completed: false,
      originalRows: records[config.key] || [],
    };
    setDraggedItem({ resource: config.key, id: item.id });
  }

  function handleDragPreview(config, targetId) {
    if (!sortableKeys.includes(config.key) || draggedItem?.resource !== config.key || draggedItem.id === targetId) return;

    setRecords((current) => {
      const currentRows = current[config.key] || [];
      const reorderedRows = reorderRows(currentRows, draggedItem.id, targetId);

      if (reorderedRows === currentRows) return current;
      return { ...current, [config.key]: reorderedRows };
    });
  }

  async function saveReorder(config) {
    if (!sortableKeys.includes(config.key) || draggedItem?.resource !== config.key) return;

    dragStateRef.current.completed = true;
    const reorderedRows = records[config.key] || [];

    setDraggedItem(null);

    try {
      await api.patch(
        "/admin/reorder",
        {
          resource: config.key,
          orderedIds: reorderedRows.map((item) => item.id),
        },
        adminRequest(token),
      );
      setStatusMessage(`${config.label} order updated.`);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Could not update ${config.label.toLowerCase()} order.`);
      await loadAdminData(token);
    }
  }

  function handleDragEnd(config) {
    if (dragStateRef.current.completed) {
      dragStateRef.current = { completed: false, originalRows: [] };
      return;
    }

    if (draggedItem?.resource === config.key && dragStateRef.current.originalRows.length) {
      setRecords((current) => ({ ...current, [config.key]: dragStateRef.current.originalRows }));
    }

    setDraggedItem(null);
    dragStateRef.current = { completed: false, originalRows: [] };
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

    if (field.type === "bundleItems") {
      return (
        <div className="sgla-bundle-builder">
          <div className="sgla-bundle-picker">
            <select
              onChange={(event) => setBundleDraft((current) => ({ ...current, itemId: event.target.value }))}
              value={bundleDraft.itemId}
            >
              <option value="">Select created item</option>
              {records.rentalItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              min="1"
              onChange={(event) => setBundleDraft((current) => ({ ...current, count: event.target.value }))}
              type="number"
              value={bundleDraft.count}
            />
            <input
              onChange={(event) => setBundleDraft((current) => ({ ...current, price: event.target.value }))}
              placeholder="Item price"
              value={bundleDraft.price}
            />
            <button className="sgla-light-button" onClick={() => addBundleItem(config, field)} type="button">
              Add item
            </button>
          </div>
          <textarea
            onChange={(event) => updateField(config, field, event.target.value)}
            placeholder="Selected bundle items will appear here"
            value={value}
          />
        </div>
      );
    }

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

    if (field.type === "select") {
      const options = records[field.optionsKey] || [];
      return (
        <select onChange={(event) => updateField(config, field, event.target.value)} value={value || ""}>
          <option value="">Select {field.label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option[field.optionLabel || "name"] || option.title || option.name}
            </option>
          ))}
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
              <input accept="image/*" onChange={(event) => handleFileChange(config, field, event.target.files?.[0])} type="file" />
            </label>
            {value ? <img alt="" src={value} /> : null}
          </div>
        ) : null}
      </>
    );
  }

  function renderCrudForm(config, { isModal = false } = {}) {
    return (
      <form className={`sgla-panel sgla-form-panel${isModal ? " sgla-modal-form" : ""}`} onSubmit={(event) => handleSave(config, event)}>
        <div className="sgla-panel-head">
          <div>
            <p>{editingIds[config.key] || config.singleton ? "Update record" : "Create record"}</p>
            <h2>{config.label}</h2>
          </div>
          {isModal ? (
            <button className="sgla-icon-button" onClick={closeCrudModal} type="button" aria-label="Close popup">
              <X size={18} />
            </button>
          ) : editingIds[config.key] ? (
            <Pencil size={20} />
          ) : (
            <Plus size={20} />
          )}
        </div>
        <div className="sgla-form-grid">
          {config.fields.map((field) => (
            <label
              className={`sgla-field ${["textarea", "lines", "bundleItems"].includes(field.type) ? "is-wide" : ""}`}
              key={field.name}
            >
              <span>{field.label}</span>
              {renderField(config, field)}
            </label>
          ))}
        </div>
        <div className="sgla-form-actions">
          <button className="sgla-primary-button" disabled={busy} type="submit">
            <Save size={17} />
            {busy ? "Saving..." : config.singleton ? "Save settings" : editingIds[config.key] ? "Update" : "Create"}
          </button>
          {!config.singleton ? (
            <button className="sgla-light-button" onClick={() => (isModal ? closeCrudModal() : resetForm(config))} type="button">
              {isModal ? "Cancel" : "Reset"}
            </button>
          ) : null}
        </div>
      </form>
    );
  }

  function renderContactProfile(config) {
    const contact = forms[config.key] || {};
    const profileItems = [
      { label: "Phone", value: contact.phone },
      { label: "WhatsApp", value: contact.whatsapp },
      { label: "Email", value: contact.email },
      { label: "Address", value: contact.address },
      { label: "Business hours", value: contact.businessHours },
      { label: "Map URL", value: contact.mapUrl },
      { label: "Facebook", value: contact.facebookUrl },
      { label: "Instagram", value: contact.instagramUrl },
    ];

    if (contactEditing) {
      return renderCrudForm(config);
    }

    return (
      <section className="sgla-contact-profile">
        <div className="sgla-contact-hero">
          <div>
            <p>Contact Profile</p>
            <h2>SGL Catering Services</h2>
            <span>{contact.email || "No email added"}</span>
          </div>
          <button className="sgla-primary-button" onClick={() => setContactEditing(true)} type="button">
            <Pencil size={17} />
            Edit details
          </button>
        </div>
        <div className="sgla-contact-grid">
          {profileItems.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value || "-"}</strong>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderGalleryCards(config) {
    return (
      <div className="sgla-gallery-grid">
        {(records[config.key] || []).map((item) => (
          <article
            className={`sgla-gallery-card ${draggedItem?.resource === config.key && draggedItem.id === item.id ? "is-dragging" : ""}`}
            draggable
            key={item.id}
            onDragEnd={() => handleDragEnd(config)}
            onDragOver={(event) => {
              event.preventDefault();
              handleDragPreview(config, item.id);
            }}
            onDragStart={() => handleDragStart(config, item)}
            onDrop={(event) => {
              event.preventDefault();
              saveReorder(config);
            }}
          >
            <div className="sgla-gallery-media">
              <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" />
              <span className={`sgla-status-chip ${item.featured ? "is-unread" : "is-read"}`}>
                {item.featured ? "Featured" : "Normal"}
              </span>
            </div>
            <div className="sgla-gallery-body">
              <div>
                <p>{item.category}</p>
                <h3>{item.title}</h3>
                <span>{item.imageUrl}</span>
              </div>
              <div className="sgla-table-actions">
                <button className="sgla-drag-handle" title="Drag to reorder" type="button">
                  <img alt="" src="/assets/admin-move-icon.png" />
                </button>
                <button onClick={() => beginEdit(config, item)} title="Edit" type="button">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(config, item)} title="Delete" type="button">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
        {!records[config.key]?.length ? (
          <div className="sgla-empty sgla-gallery-empty">
            <PackageCheck size={20} />
            <span>No gallery images found.</span>
          </div>
        ) : null}
      </div>
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
          <form autoComplete="off" className="sgla-login-form" onSubmit={handleLogin}>
            <div className="sgla-login-copy">
              <p>Admin Panel</p>
              <h1>Sign in to manage the website</h1>
            </div>
            <label className="sgla-field">
              <span>Username</span>
              <input
                autoComplete="username"
                name="admin-username"
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Enter username"
                value={loginForm.email}
              />
            </label>
            <label className="sgla-field">
              <span>Password</span>
              <input
                autoComplete="new-password"
                name="admin-access-code"
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Enter password"
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
                {item.key === "contactMessages" && dashboard?.unreadMessages ? <b>{dashboard.unreadMessages}</b> : null}
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
            <p>{activeEyebrow}</p>
            <h1>{activeTitle}</h1>
          </div>
          <div className="sgla-topbar-actions">
            <a href="/" target="_blank" rel="noreferrer">
              <Home size={17} />
              <span>Public site</span>
            </a>
            <button type="button">
              <Bell size={17} />
              <span>{dashboard?.unreadMessages || 0}</span>
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
                <span>Catering menus</span>
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
                <strong>{dashboard?.unreadMessages ?? "-"}</strong>
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
                  {navItems
                    .filter((item) => !["dashboard", "contactMessages"].includes(item.key))
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button key={item.key} onClick={() => selectSection(item.key)} type="button">
                          <Icon size={18} />
                          <span>{item.label}</span>
                          <b>{item.key === "siteConfig" ? "Edit" : item.key === "catering" ? dashboard?.foodPackages ?? 0 : item.key === "rental" ? dashboard?.rentalItems ?? 0 : dashboard?.[item.key] ?? 0}</b>
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

        {activeGroup ? (
          <div className="sgla-subtabs" role="tablist" aria-label={`${activeGroup.label} tabs`}>
            {activeGroup.tabs.map((tab) => (
              <button
                className={activeGroupTabs[activeKey] === tab.key ? "is-active" : ""}
                key={tab.key}
                onClick={() => {
                  setActiveGroupTabs((current) => ({ ...current, [activeKey]: tab.key }));
                  setStatusMessage("");
                  setErrorMessage("");
                }}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : null}

        {activeConfig?.key === "siteConfig" ? renderContactProfile(activeConfig) : null}

        {activeConfig && activeConfig.key !== "siteConfig" ? (
          <section className={`sgla-crud-grid ${activeConfig.readOnly || usesPopupCrud ? "is-full" : ""}`}>
            {!activeConfig.readOnly && !usesPopupCrud ? renderCrudForm(activeConfig) : null}

            <section className="sgla-panel sgla-table-panel">
              <div className="sgla-panel-head">
                <div>
                  <p>{activeConfig.readOnly ? "Read and clear" : "Created records"}</p>
                  <h2>{activeConfig.readOnly ? "Website messages" : `Created ${activeConfig.label}`}</h2>
                </div>
                {activeConfig.readOnly ? (
                  <button className="sgla-light-button" onClick={() => loadAdminData(token)} type="button">
                    Refresh
                  </button>
                ) : usesPopupCrud ? (
                  <button className="sgla-primary-button" onClick={() => openCreateModal(activeConfig)} type="button">
                    <Plus size={17} />
                    Add new {activeConfig.label.toLowerCase()}
                  </button>
                ) : (
                  <GalleryHorizontalEnd size={20} />
                )}
              </div>
              {activeConfig.key === "galleryItems" ? (
                renderGalleryCards(activeConfig)
              ) : (
                <div className="sgla-table-wrap">
                  <table className="sgla-table">
                    <thead>
                      <tr>
                        {sortableKeys.includes(activeConfig.key) ? <th>Move</th> : null}
                        {activeConfig.columns.map((column) => (
                          <th key={column.name}>{column.label}</th>
                        ))}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(records[activeConfig.key] || []).map((item) => (
                        <tr
                          className={draggedItem?.resource === activeConfig.key && draggedItem.id === item.id ? "is-dragging" : ""}
                          draggable={sortableKeys.includes(activeConfig.key)}
                          key={item.id || activeConfig.key}
                          onDragEnd={() => handleDragEnd(activeConfig)}
                          onDragOver={(event) => {
                            if (sortableKeys.includes(activeConfig.key)) {
                              event.preventDefault();
                              handleDragPreview(activeConfig, item.id);
                            }
                          }}
                          onDragStart={() => {
                            if (sortableKeys.includes(activeConfig.key)) {
                              handleDragStart(activeConfig, item);
                            }
                          }}
                          onDrop={(event) => {
                            event.preventDefault();
                            saveReorder(activeConfig);
                          }}
                        >
                          {sortableKeys.includes(activeConfig.key) ? (
                            <td>
                              <button className="sgla-drag-handle" title="Drag this row to reorder" type="button">
                                <img alt="" src="/assets/admin-move-icon.png" />
                              </button>
                            </td>
                          ) : null}
                          {activeConfig.columns.map((column) => (
                            <td className={column.name === "message" ? "sgla-message-cell" : ""} key={column.name}>
                              {renderCell(item, column)}
                            </td>
                          ))}
                          <td>
                            <div className="sgla-table-actions">
                              {activeConfig.key === "contactMessages" ? (
                                <button
                                  className="sgla-text-action"
                                  onClick={() => handleToggleMessageRead(item)}
                                  title={item.isRead ? "Mark unread" : "Mark read"}
                                  type="button"
                                >
                                  {item.isRead ? "Unread" : "Read"}
                                </button>
                              ) : null}
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
                          <td colSpan={activeConfig.columns.length + 1 + (sortableKeys.includes(activeConfig.key) ? 1 : 0)}>
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
              )}
            </section>
          </section>
        ) : null}
      </section>
      {crudModalConfig ? (
        <div className="sgla-modal-backdrop" role="presentation">
          <div className="sgla-modal-shell" role="dialog" aria-modal="true" aria-label={`${crudModalConfig.label} popup`}>
            {renderCrudForm(crudModalConfig, { isModal: true })}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default AdminPage;

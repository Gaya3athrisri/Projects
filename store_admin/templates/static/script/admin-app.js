/* ============================================================
   Threadline Admin — Alpine.js Application
   ============================================================ */

function adminApp() {
  return {

    /* ---------- auth state ---------- */
    authed: false,
    authView: 'login',
    showPw: false,
    loginError: false,
    login: { email: '', password: '', remember: false, errors: {} },
    forgotEmail: '', forgotError: '', forgotSent: false,
    reset: { pw1: '', pw2: '', errors: {} }, resetDone: false,

    /* ---------- shell state ---------- */
    sidebarCollapsed: false,
    openGroups: ['products', 'orders'],
    page: 'dashboard',
    unreadCount: 3,

    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { key: 'products', label: 'Products', icon: '👕', children: [
        { key: 'products-list', label: 'All products' },
        { key: 'products-add', label: 'Add product' },
      ]},
      { key: 'orders', label: 'Orders', icon: '📦', children: [
        { key: 'orders-undispatched', label: 'Undispatched' },
        { key: 'orders-dispatched', label: 'Dispatched' },
      ]},
      { key: 'dispatch', label: 'Dispatch', icon: '🚚' },
      { key: 'customers', label: 'Customers', icon: '👤' },
      { key: 'categories', label: 'Categories', icon: '🏷️' },
      { key: 'variants', label: 'Variants', icon: '🎨' },
      { key: 'payments', label: 'Payments', icon: '💳' },
      { key: 'invoices', label: 'Invoices', icon: '🧾' },
      { key: 'reports', label: 'Reports', icon: '📊' },
      { key: 'notifications', label: 'Notifications', icon: '🔔' },
      { key: 'components', label: 'Components', icon: '⚙️' },
      { key: 'settings', label: 'Settings', icon: '⚙️' },
    ],

    pageTitles: {
      'dashboard': 'Dashboard', 'products-list': 'Products', 'products-add': 'Add product', 'products-edit': 'Edit product',
      'orders-undispatched': 'Undispatched orders', 'orders-dispatched': 'Dispatched orders', 'dispatch': 'Dispatch',
      'customers': 'Customers', 'categories': 'Categories', 'variants': 'Variants', 'payments': 'Payments',
      'invoices': 'Invoices', 'reports': 'Reports', 'notifications': 'Notifications', 'components': 'Component library', 'settings': 'Settings',
    },

    pageTitle() { return this.pageTitles[this.page] || 'Dashboard'; },
    isActiveNav(item) {
      if (item.children) return item.children.some(c => c.key === this.page);
      return this.page === item.key;
    },
    toggleNavGroup(key) {
      if (this.openGroups.includes(key)) this.openGroups = this.openGroups.filter(k => k !== key);
      else this.openGroups.push(key);
    },
    navigate(key) {
      this.page = key;
      const parent = this.navItems.find(i => i.children && i.children.some(c => c.key === key));
      if (parent && !this.openGroups.includes(parent.key)) this.openGroups.push(parent.key);
    },

    /* ---------- data: notifications ---------- */
    notifications: [
      { id: 1, type: 'order', text: 'New order #TL-5821 placed by Ananya Rao for ₹2,340.', time: '4 minutes ago' },
      { id: 2, type: 'stock', text: 'Denim Jacket (M, Indigo) has only 3 units left in stock.', time: '38 minutes ago' },
      { id: 3, type: 'order', text: 'Order #TL-5798 was dispatched via BlueDart.', time: '1 hour ago' },
      { id: 4, type: 'system', text: 'Weekly sales report for last week is ready to download.', time: 'Yesterday' },
      { id: 5, type: 'stock', text: 'Linen Wrap Shirt (S, Sand) is out of stock.', time: 'Yesterday' },
    ],

    /* ---------- data: stock alerts ---------- */
    stockAlerts: [
      { emoji: '🧥', name: 'Denim Jacket — M / Indigo', left: 3 },
      { emoji: '👗', name: 'Linen Wrap Shirt — S / Sand', left: 0 },
      { emoji: '👖', name: 'Tapered Chino — L / Olive', left: 6 },
      { emoji: '🧣', name: 'Wool Scarf — One size', left: 4 },
    ],

    /* ---------- data: products ---------- */
    categories: ['Shirts', 'Dresses', 'Outerwear', 'Trousers', 'Knitwear', 'Accessories'],
    colorOptions: [
      { name: 'Charcoal', hex: '#2C2C2A', light: false }, { name: 'Rose', hex: '#D4537E', light: false },
      { name: 'Sand', hex: '#E3D5B8', light: true }, { name: 'Ivory', hex: '#FAF8F5', light: true },
      { name: 'Olive', hex: '#6B7251', light: false }, { name: 'Indigo', hex: '#2E3A59', light: false },
    ],
    productSearch: '',
    products: [
      { id: 1, name: 'Linen Wrap Shirt', sku: 'TL-SHRT-001', category: 'Shirts', price: 1499, stock: 0, status: 'Active', emoji: '👔', sizes: ['S','M','L'], colors: ['Sand','Ivory'], images: ['🧵'] },
      { id: 2, name: 'Denim Jacket', sku: 'TL-JCKT-014', category: 'Outerwear', price: 3299, stock: 18, status: 'Active', emoji: '🧥', sizes: ['M','L','XL'], colors: ['Indigo'], images: ['🧵','🧵'] },
      { id: 3, name: 'Tapered Chino', sku: 'TL-TRSR-022', category: 'Trousers', price: 1899, stock: 42, status: 'Active', emoji: '👖', sizes: ['S','M','L','XL'], colors: ['Olive','Charcoal'], images: ['🧵'] },
      { id: 4, name: 'Silk Slip Dress', sku: 'TL-DRSS-007', category: 'Dresses', price: 2799, stock: 9, status: 'Draft', emoji: '👗', sizes: ['XS','S','M'], colors: ['Rose','Ivory'], images: [] },
      { id: 5, name: 'Merino Knit Sweater', sku: 'TL-KNIT-031', category: 'Knitwear', price: 2299, stock: 27, status: 'Active', emoji: '🧶', sizes: ['M','L'], colors: ['Charcoal','Olive'], images: ['🧵'] },
      { id: 6, name: 'Wool Scarf', sku: 'TL-ACCS-009', category: 'Accessories', price: 899, stock: 4, status: 'Active', emoji: '🧣', sizes: [], colors: ['Indigo','Sand'], images: [] },
      { id: 7, name: 'Cropped Blazer', sku: 'TL-JCKT-019', category: 'Outerwear', price: 3699, stock: 0, status: 'Archived', emoji: '🧥', sizes: ['S','M'], colors: ['Charcoal'], images: [] },
      { id: 8, name: 'Cotton Poplin Shirt', sku: 'TL-SHRT-005', category: 'Shirts', price: 1299, stock: 63, status: 'Active', emoji: '👔', sizes: ['S','M','L','XL'], colors: ['Ivory','Sand'], images: ['🧵'] },
    ],
    get filteredProducts() {
      const q = this.productSearch.trim().toLowerCase();
      if (!q) return this.products;
      return this.products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    },

    productForm: { id: null, name: '', sku: '', category: '', price: null, stock: null, status: 'Active', sizes: [], colors: [], images: [], errors: {} },
    resetProductForm() { this.productForm = { id: null, name: '', sku: '', category: '', price: null, stock: null, status: 'Active', sizes: [], colors: [], images: [], errors: {} }; },
    editProduct(p) { this.productForm = JSON.parse(JSON.stringify(p)); this.productForm.errors = {}; this.page = 'products-edit'; },
    toggleArrayItem(arr, item) {
      const i = arr.indexOf(item);
      if (i > -1) arr.splice(i, 1); else arr.push(item);
    },
    validateProductField(field) {
      const f = this.productForm;
      if (field === 'name') f.errors.name = f.name.trim() ? '' : 'Product name is required.';
      if (field === 'sku') f.errors.sku = f.sku.trim() ? '' : 'SKU is required.';
      if (field === 'price') f.errors.price = (f.price > 0) ? '' : 'Enter a price greater than zero.';
      if (field === 'stock') f.errors.stock = (f.stock !== null && f.stock >= 0) ? '' : 'Enter a stock quantity of zero or more.';
    },
    saveProduct() {
      ['name','sku','price','stock'].forEach(f => this.validateProductField(f));
      const hasErrors = Object.values(this.productForm.errors).some(e => e);
      if (hasErrors) { this.showToast('error', 'Check the form', 'Some required fields need attention.'); return; }
      if (this.page === 'products-add') {
        const newP = { ...this.productForm, id: Date.now(), emoji: '🧵' };
        delete newP.errors;
        this.products.unshift(newP);
        this.showToast('success', 'Product added', `${newP.name} was added to your catalog.`);
      } else {
        const idx = this.products.findIndex(p => p.id === this.productForm.id);
        const updated = { ...this.productForm }; delete updated.errors;
        if (idx > -1) this.products[idx] = { ...this.products[idx], ...updated };
        this.showToast('success', 'Changes saved', `${updated.name} was updated.`);
      }
      this.resetProductForm();
      this.page = 'products-list';
    },

    deleteModalOpen: false, productToDelete: null,
    confirmDelete(p) { this.productToDelete = p; this.deleteModalOpen = true; },
    deleteProduct() {
      this.products = this.products.filter(p => p.id !== this.productToDelete.id);
      this.showToast('success', 'Product deleted', `${this.productToDelete.name} was removed.`);
      this.deleteModalOpen = false;
      this.productToDelete = null;
    },

    /* ---------- data: orders ---------- */
    orderFilter: 'All', orderSearch: '', dispatchedSearch: '',
    recentOrders: [
      { id: 'TL-5821', customer: 'Ananya Rao', items: 2, amount: 2340, status: 'Pending' },
      { id: 'TL-5820', customer: 'Vikram Suresh', items: 1, amount: 1499, status: 'Dispatched' },
      { id: 'TL-5819', customer: 'Meera Pillai', items: 3, amount: 4897, status: 'Processing' },
      { id: 'TL-5818', customer: 'Karthik Nair', items: 1, amount: 899, status: 'Dispatched' },
      { id: 'TL-5817', customer: 'Divya Shankar', items: 4, amount: 6120, status: 'Cancelled' },
    ],
    undispatchedOrders: [
      { id: 'TL-5821', customer: 'Ananya Rao', date: '26 Jun 2026', amount: 2340, status: 'Pending' },
      { id: 'TL-5819', customer: 'Meera Pillai', date: '26 Jun 2026', amount: 4897, status: 'Processing' },
      { id: 'TL-5812', customer: 'Rohan Iyer', date: '25 Jun 2026', amount: 1899, status: 'Pending' },
      { id: 'TL-5803', customer: 'Sneha Kapoor', date: '24 Jun 2026', amount: 3299, status: 'Processing' },
      { id: 'TL-5798', customer: 'Arjun Menon', date: '23 Jun 2026', amount: 1299, status: 'Pending' },
    ],
    dispatchedOrders: [
      { id: 'TL-5820', customer: 'Vikram Suresh', date: '26 Jun 2026', courier: 'BlueDart', amount: 1499, status: 'Dispatched' },
      { id: 'TL-5818', customer: 'Karthik Nair', date: '25 Jun 2026', courier: 'Delhivery', amount: 899, status: 'Dispatched' },
      { id: 'TL-5810', customer: 'Lakshmi Venkat', date: '24 Jun 2026', courier: 'BlueDart', amount: 2799, status: 'Dispatched' },
      { id: 'TL-5805', customer: 'Aditya Kulkarni', date: '23 Jun 2026', courier: 'DTDC', amount: 1899, status: 'Dispatched' },
    ],
    get filteredUndispatched() {
      let list = this.undispatchedOrders;
      if (this.orderFilter !== 'All') list = list.filter(o => o.status === this.orderFilter);
      const q = this.orderSearch.trim().toLowerCase();
      if (q) list = list.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q));
      return list;
    },
    get filteredDispatched() {
      const q = this.dispatchedSearch.trim().toLowerCase();
      if (!q) return this.dispatchedOrders;
      return this.dispatchedOrders.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q));
    },
    markDispatched(o) {
      this.undispatchedOrders = this.undispatchedOrders.filter(x => x.id !== o.id);
      this.dispatchedOrders.unshift({ ...o, courier: 'BlueDart', status: 'Dispatched' });
      this.showToast('success', 'Order dispatched', `${o.id} has been marked as dispatched.`);
    },

    statusBadgeClass(status) {
      const map = {
        'Dispatched': 'bg-emerald-50 text-emerald-700',
        'Active': 'bg-emerald-50 text-emerald-700',
        'Pending': 'bg-amber-50 text-amber-700',
        'Processing': 'bg-amber-50 text-amber-700',
        'Draft': 'bg-charcoal-50 text-charcoal-500',
        'Cancelled': 'bg-rose-50 text-rose-700',
        'Archived': 'bg-charcoal-50 text-charcoal-400',
      };
      return map[status] || 'bg-charcoal-50 text-charcoal-500';
    },

    /* ---------- reports ---------- */
    report: { from: '2026-06-01', to: '2026-06-27', type: 'Sales summary', format: 'pdf' },
    reportModalOpen: false,
    downloadReport() {
      this.reportModalOpen = false;
      this.showToast('success', 'Report ready', `Your ${this.report.format.toUpperCase()} download has started.`);
    },

    /* ---------- settings ---------- */
    settingsToggle: true,

    /* ---------- demo modal (component library) ---------- */
    demoModalOpen: false,

    /* ---------- toasts ---------- */
    toasts: [],
    toastId: 0,
    showToast(type, title, message) {
      const id = ++this.toastId;
      this.toasts.push({ id, type, title, message, visible: true });
      setTimeout(() => {
        const t = this.toasts.find(t => t.id === id);
        if (t) t.visible = false;
        setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id); }, 250);
      }, 4000);
    },
    dismissToast(id) {
      const t = this.toasts.find(t => t.id === id);
      if (t) t.visible = false;
      setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id); }, 200);
    },

    /* ---------- auth logic ---------- */
    validateLogin(field) {
      if (field === 'email') {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.login.email);
        this.login.errors.email = ok ? '' : 'Enter a valid email address.';
      }
      if (field === 'password') {
        this.login.errors.password = this.login.password.length >= 6 ? '' : 'Password must be at least 6 characters.';
      }
    },
    submitLogin() {
      this.validateLogin('email'); this.validateLogin('password');
      this.loginError = false;
      if (this.login.errors.email || this.login.errors.password) return;
      this.authed = true;
      this.page = 'dashboard';
      this.$nextTick(() => this.renderChart());
    },
    logout() {
      this.authed = false;
      this.authView = 'login';
      this.login = { email: '', password: '', remember: false, errors: {} };
    },
    validateForgot() {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.forgotEmail);
      this.forgotError = ok ? '' : 'Enter a valid email address.';
    },
    submitForgot() {
      this.validateForgot();
      if (this.forgotError) return;
      this.forgotSent = true;
    },
    validateReset() {
      this.reset.errors.pw1 = this.reset.pw1.length >= 6 ? '' : 'Password must be at least 6 characters.';
      this.reset.errors.pw2 = (this.reset.pw2 === this.reset.pw1 && this.reset.pw2.length > 0) ? '' : 'Passwords do not match.';
    },
    submitReset() {
      this.validateReset();
      if (this.reset.errors.pw1 || this.reset.errors.pw2) return;
      this.resetDone = true;
    },

    /* ---------- chart ---------- */
    chartInstance: null,
    renderChart() {
      const el = document.getElementById('weeklyOrdersChart');
      if (!el) return;
      if (this.chartInstance) this.chartInstance.destroy();
      this.chartInstance = new Chart(el, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Orders',
            data: [38, 52, 44, 61, 58, 73, 49],
            backgroundColor: '#D4537E',
            hoverBackgroundColor: '#B83D67',
            borderRadius: 6,
            maxBarThickness: 36,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { backgroundColor: '#2C2C2A', padding: 10, cornerRadius: 8, titleFont: { family: 'Inter' }, bodyFont: { family: 'Inter' } } },
          scales: {
            x: { grid: { display: false }, ticks: { color: '#6E6B66', font: { family: 'Inter', size: 12 } } },
            y: { beginAtZero: true, grid: { color: '#F4F4F3' }, ticks: { color: '#6E6B66', font: { family: 'Inter', size: 12 } } }
          }
        }
      });
    },

    init() {
      this.$watch('authed', (val) => { if (val) this.$nextTick(() => this.renderChart()); });
    },
  }
}

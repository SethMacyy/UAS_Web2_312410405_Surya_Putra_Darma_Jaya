const Dashboard = {
    template: `
    <div class="min-h-screen bg-gray-100">
        <!-- Navbar -->
        <nav class="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
            <h1 class="text-xl font-bold">📚 E-Library Admin</h1>
            <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition">
                Logout
            </button>
        </nav>

        <!-- Sidebar + Content -->
        <div class="flex">
            <!-- Sidebar -->
            <div class="w-64 bg-white shadow-md min-h-screen p-4">
                <ul class="space-y-2">
                    <li>
                        <router-link to="/dashboard" class="block px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium">
                            🏠 Dashboard
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/kategori" class="block px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium">
                            📂 Kategori
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/buku" class="block px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium">
                            📖 Buku
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Main Content -->
            <div class="flex-1 p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Selamat Datang di Dashboard Admin</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                        <div class="bg-blue-100 p-4 rounded-full text-3xl">📂</div>
                        <div>
                            <p class="text-gray-500 text-sm">Total Kategori</p>
                            <p class="text-3xl font-bold text-blue-600">{{ totalKategori }}</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                        <div class="bg-green-100 p-4 rounded-full text-3xl">📖</div>
                        <div>
                            <p class="text-gray-500 text-sm">Total Buku</p>
                            <p class="text-3xl font-bold text-green-600">{{ totalBuku }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return { totalKategori: 0, totalBuku: 0 }
    },
    async mounted() {
        const k = await axios.get('/api/kategori');
        const b = await axios.get('/api/buku');
        this.totalKategori = k.data.data.length;
        this.totalBuku = b.data.data.length;
    },
    methods: {
        logout() {
            axios.post('/api/logout');
            localStorage.clear();
            router.push('/login');
        }
    }
};
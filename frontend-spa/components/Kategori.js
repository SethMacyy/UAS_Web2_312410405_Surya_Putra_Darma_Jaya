const Kategori = {
    template: `
    <div class="min-h-screen bg-gray-100">
        <!-- Navbar -->
        <nav class="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
            <h1 class="text-xl font-bold">📚 E-Library Admin</h1>
            <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition">
                Logout
            </button>
        </nav>

        <div class="flex">
            <!-- Sidebar -->
            <div class="w-64 bg-white shadow-md min-h-screen p-4">
                <ul class="space-y-2">
                    <li><router-link to="/dashboard" class="block px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium">🏠 Dashboard</router-link></li>
                    <li><router-link to="/kategori" class="block px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium">📂 Kategori</router-link></li>
                    <li><router-link to="/buku" class="block px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 font-medium">📖 Buku</router-link></li>
                </ul>
            </div>

            <!-- Content -->
            <div class="flex-1 p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">📂 Manajemen Kategori</h2>
                    <button @click="openModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                        + Tambah Kategori
                    </button>
                </div>

                <!-- Tabel -->
                <div class="bg-white rounded-2xl shadow overflow-hidden">
                    <table class="w-full text-sm">
                        <thead class="bg-blue-600 text-white">
                            <tr>
                                <th class="px-4 py-3 text-left">No</th>
                                <th class="px-4 py-3 text-left">Nama Genre</th>
                                <th class="px-4 py-3 text-left">Deskripsi</th>
                                <th class="px-4 py-3 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in kategori" :key="item.id" class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">{{ i + 1 }}</td>
                                <td class="px-4 py-3 font-medium">{{ item.nama_genre }}</td>
                                <td class="px-4 py-3 text-gray-500">{{ item.deskripsi }}</td>
                                <td class="px-4 py-3 space-x-2">
                                    <button @click="openModal(item)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs">Edit</button>
                                    <button @click="hapus(item.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs">Hapus</button>
                                </td>
                            </tr>
                            <tr v-if="kategori.length === 0">
                                <td colspan="4" class="text-center py-6 text-gray-400">Belum ada data kategori</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                <h3 class="text-lg font-bold mb-4">{{ editMode ? 'Edit Kategori' : 'Tambah Kategori' }}</h3>
                <div class="mb-3">
                    <label class="block text-gray-700 mb-1">Nama Genre</label>
                    <input v-model="form.nama_genre" type="text" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Deskripsi</label>
                    <textarea v-model="form.deskripsi" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                </div>
                <div class="flex justify-end gap-2">
                    <button @click="showModal = false" class="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">Batal</button>
                    <button @click="simpan" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            kategori: [],
            showModal: false,
            editMode: false,
            form: { id: null, nama_genre: '', deskripsi: '' }
        }
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            const res = await axios.get('/api/kategori');
            this.kategori = res.data.data;
        },
        openModal(item = null) {
            this.editMode = !!item;
            this.form = item ? { ...item } : { id: null, nama_genre: '', deskripsi: '' };
            this.showModal = true;
        },
        async simpan() {
            if (this.editMode) {
                await axios.put(`/api/kategori/${this.form.id}`, this.form);
            } else {
                await axios.post('/api/kategori', this.form);
            }
            this.showModal = false;
            await this.loadData();
        },
        async hapus(id) {
            if (confirm('Yakin ingin menghapus?')) {
                await axios.delete(`/api/kategori/${id}`);
                await this.loadData();
            }
        },
        logout() {
            axios.post('/api/logout');
            localStorage.clear();
            router.push('/login');
        }
    }
};
const Login = {
    template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 relative overflow-hidden">
        
        <!-- Background decorations -->
        <div class="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div class="absolute top-1/2 left-1/4 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>

        <div class="relative z-10 w-full max-w-md px-4">
            <!-- Logo/Icon -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl mb-4 border border-white border-opacity-20">
                    <span class="text-4xl">📚</span>
                </div>
                <h1 class="text-4xl font-extrabold text-white tracking-tight">E-Library</h1>
                <p class="text-blue-200 mt-2 text-sm">Sistem Informasi Rental Buku Digital</p>
            </div>

            <!-- Card -->
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white border-opacity-20">
                <h2 class="text-xl font-bold text-white mb-6 text-center">Masuk ke Akun Anda</h2>

                <div v-if="error" class="bg-red-500 bg-opacity-20 border border-red-400 text-red-200 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
                    <span>⚠️</span> {{ error }}
                </div>

                <div class="mb-5">
                    <label class="block text-blue-200 text-sm font-medium mb-2">👤 Username</label>
                    <input v-model="username" type="text" placeholder="Masukkan username"
                        class="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"/>
                </div>

                <div class="mb-7">
                    <label class="block text-blue-200 text-sm font-medium mb-2">🔒 Password</label>
                    <input v-model="password" type="password" placeholder="Masukkan password"
                        class="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"/>
                </div>

                <button @click="login" :disabled="loading"
                    class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="loading">⏳ Memproses...</span>
                    <span v-else>🚀 Masuk Sekarang</span>
                </button>

                <p class="text-center text-blue-300 text-xs mt-6">© 2025 E-Library · Surya Putra Darma Jaya</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return { username: '', password: '', error: '', loading: false }
    },
    methods: {
        async login() {
            this.loading = true;
            this.error = '';
            try {
                const res = await axios.post('/api/login', {
                    username: this.username,
                    password: this.password
                });
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('isLoggedIn', true);
                router.push('/dashboard');
            } catch(e) {
                this.error = 'Username atau password salah!';
            } finally {
                this.loading = false;
            }
        }
    }
};
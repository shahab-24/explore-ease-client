interface ImportMetaEnv {
        readonly VITE_API_URL: string;
        readonly VITE_CLOUDINARY_CLOUD_NAME: string;
        readonly VITE_CLOUDINARY_PRESET: string;
        readonly VITE_API_URL: string;
        readonly VITE_STRIPE_PUBLIC_KEY: string;
}

interface ImportMeta {
        readonly env : ImportMetaEnv
}
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

async function enableMocking () {
    const { worker } = await import("./mockServer/browser.ts");

    return worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
            url: '/React-Register-Form/mockServiceWorker.js',
            options: {
                scope: '/React-Register-Form/',
            },
        },
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <>
            <App />
        </>,
    )
});

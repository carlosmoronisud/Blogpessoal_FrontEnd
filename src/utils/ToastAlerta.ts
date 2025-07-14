import { toast } from 'react-toastify';

export function ToastAlerta(mensagem: string, tipo: string) {
    const defaultOptions = {
        position: 'top-right' as const, 
        autoClose: 2500, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
    };

    switch (tipo) {
        case 'sucesso':
            toast.success(`🎉 ${mensagem}`, { 
                ...defaultOptions,
                
                style: {
                    backgroundColor: 'oklch(60% 0.118 184.704)', 
                    color: 'oklch(100% 0 0)', 
                },
                
            });
            break;

        case 'erro':
            toast.error(`😢 ${mensagem}`, { 
                ...defaultOptions,
                
                style: {
                    backgroundColor: 'oklch(57.7% 0.245 27.325)', 
                    color: 'oklch(100% 0 0)', 
                },
                
            });
            break;

        case 'info':
        default: 
            toast.info(`💡 ${mensagem}`, { 
                ...defaultOptions,
                
                style: {
                    backgroundColor: 'oklch(40% 0.15 260)', 
                    color: 'oklch(100% 0 0)', 
                },
        
            });
            break;
    }
}

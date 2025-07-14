import { toast } from 'react-toastify';

export function ToastAlerta(mensagem: string, tipo: string) {
    // Opções padrão para todos os tipos de alerta
    const defaultOptions = {
        position: 'top-right' as const, // Posição no canto superior direito
        autoClose: 2500, // Fecha automaticamente após 2.5 segundos
        hideProgressBar: false, // Mostra a barra de progresso
        closeOnClick: true, // Fecha ao clicar
        pauseOnHover: true, // Pausa o autoClose ao passar o mouse
        draggable: true, // Permite arrastar o toast
        progress: undefined, // Sem progresso personalizado
        // theme: 'colored', // Removido para usar estilos personalizados via 'style'
    };

    switch (tipo) {
        case 'sucesso':
            toast.success(mensagem, {
                ...defaultOptions,
                // Estilização personalizada para sucesso (verde do Pocoyo)
                style: {
                    backgroundColor: 'oklch(60% 0.118 184.704)', // Cor similar ao var(--chart-2) (verde)
                    color: 'oklch(100% 0 0)', // Texto branco
                },
                icon: '🎉', // Ícone de confete para sucesso
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                ...defaultOptions,
                // Estilização personalizada para erro (vermelho destrutivo)
                style: {
                    backgroundColor: 'oklch(57.7% 0.245 27.325)', // Cor do var(--destructive) (vermelho)
                    color: 'oklch(100% 0 0)', // Texto branco
                },
                icon: '😢', // Ícone de rosto triste para erro
            });
            break;

        case 'info':
        default: // 'default' também tratará como 'info'
            toast.info(mensagem, {
                ...defaultOptions,
                // Estilização personalizada para informação (azul do Pocoyo)
                style: {
                    backgroundColor: 'oklch(40% 0.15 260)', // Cor do var(--primary) (azul)
                    color: 'oklch(100% 0 0)', // Texto branco
                },
                icon: '💡', // Ícone de lâmpada para informação
            });
            break;
    }
}

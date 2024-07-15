import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
    base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2', // recebe as classes do Tailwind que vão ser iguais entre todos os botões
    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        },

        // definindo tamanhos
        size:{
            defautl:'py-2',
            full:"w-full h-11"
        },
    }, // tudo o que for diferente entre os botões



    // caso não passe nenhuma propriedade
    defaultVariants: {
        variant: 'primary',
        size: 'defautl'
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    children: ReactNode
}

/* 

    extends ComponentProps<'button'>
        Função do React que torna possível acessar todas a propriedades de um elemento HTML
        No caso acima, as propriedade de um 'button'

*/

export function Button({ children, variant, size, ...props }: ButtonProps) {
    return (
        <button {...props} className={buttonVariants({ variant, size })}>
            {children}
        </button>
    )
}